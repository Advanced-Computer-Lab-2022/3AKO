import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Form from "react-bootstrap/Form";
import ReactCountryFlag from "react-country-flag";
import NavDropdown from 'react-bootstrap/NavDropdown';
import style from "../stylesheets/navbar.module.css";



import iso2ToCountry from "../data/iso2ToCountry.json";
import iso2ToCurrency from "../data/iso2ToCurrency.json";
const CountryModal = (props) => {
  const handleExchangeRate = props.handleExchangeRate;

  const [loading, setLoading] = useState(false);

  const [country, setCountry] = useState("");

  const handleChoose = (e) => {
    e.preventDefault();
    console.log(e.target.id)
    setCountry(e.target.id);
  };
  useEffect(() => {
    const getCountry = async () => {
      setLoading(true);

      const res = await axios.get("/utils/country");
      if (res.data)
        setCountry(res.data);

      setLoading(false);
    };
    getCountry();
  }, []);

  useEffect(() => {
    const getExchangeRate = async () => {
      const res = await axios.get("/utils/exchangeFromUSD", {
        params: { country: country },
      });
      if (res.data && country)
        await handleExchangeRate(res.data, iso2ToCurrency[country]);

    };
    getExchangeRate();
  }, [country]);

  if (loading) return <div>loading...</div>;
  const entries = Object.entries(iso2ToCountry);
  entries.sort((a, b) => a[1].toUpperCase().localeCompare(b[1].toUpperCase()));
  return (
    <div>
      <NavDropdown
        title={<ReactCountryFlag
          countryCode={country}
          svg
          style={{ width: "2em", height: "2em" }}
          title={country}
          value={country}
        />}
        className={style.countryDropdown}>
        <div className={style.countryDropdownMenu}>
          {entries.map(([key, value]) => (
            <NavDropdown.Item id={key} key={key} onClick={handleChoose} className={style.dropdownItem}>{value}</NavDropdown.Item>
          ))}
        </div>

      </NavDropdown>




      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please select your country</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Select aria-label="Default select example" className="mb-3">

            </Form.Select>
            <Button variant="primary" className="w-100" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal> */}
    </div>
  );
};
export { CountryModal };

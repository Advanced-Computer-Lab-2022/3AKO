import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Form from "react-bootstrap/Form";
import ReactCountryFlag from "react-country-flag";

import iso2ToCountry from "../data/iso2ToCountry.json";
import iso2ToCurrency from "../data/iso2ToCurrency.json";
const CountryModal = (props) => {
  const handleExchangeRate = props.handleExchangeRate;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);

  const [country, setCountry] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setCountry(e.target.children[0].value);
    handleClose();
  };
  useEffect(() => {
    const getCountry = async () => {
      setLoading(true);
      
      const res = await axios.get("/utils/country");
      if(res.data)
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
      <button
        onClick={handleShow}
        style={{
          background: "#ccc",
          color: "black",
          border: "1px solid #888",
          borderRadius: "10px",
        }}
      >
        <ReactCountryFlag
          countryCode={country}
          svg
          style={{
            width: "2em",
            height: "2em",
            marginRight: "0.5rem",
          }}
          title={country}
        />
        {country}
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please select your country</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Select aria-label="Default select example" className="mb-3">
              {entries.map(([key, value]) => (
                <option value={key}>{value}</option>
              ))}
            </Form.Select>
            <Button variant="primary" className="w-100" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export { CountryModal };

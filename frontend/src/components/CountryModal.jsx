import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const CountryModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");
  useEffect(() => {
    const getCountry = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/utils/country");
      setCountry(res.data);
      setLoading(false);
    };
    getCountry();
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {loading ? "loading..." : country}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CountryModal;

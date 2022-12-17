import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useUserContext } from './hooks/useUserContext';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import { LoremIpsum } from "react-lorem-ipsum";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddCourse = () => {
  const [outline, setOutline] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [hours, setHours] = useState(0)
  const { user, loading } = useUserContext()
  const history = useHistory()
  const [allValues, setAllValues] = useState({
    title: '',
    subject: '',
    summary: '',
    previewVideo: '',
    price: 0,
    totalHours: 0,
    imageURL: '',
  });
  const [extraValues, setExtravalues] = useState({
    outlines: [],
    subtitles: []
  })
  // for the contract
  const [show, setShow] = useState(false);
  const [consent, setConsent] = useState(false);
  const [checked, setChecked] = useState(false);
  //

  const handelExtraValues = e => {
    if (e.target.value === '') {
      alert('you need to fill in a value')
      return
    }
    if (e.target.name === 'subtitles') {
      setExtravalues({
        ...extraValues,
        [e.target.name]: [...extraValues[[e.target.name]], { title: e.target.value, totalHours: hours }]
      })
    }
    else {
      setExtravalues({
        ...extraValues,
        [e.target.name]: [...extraValues[[e.target.name]], e.target.value]
      })

    }
    console.log(extraValues);
  }

  const handleChange = (e) => {
    console.log(extraValues);
    setAllValues({
      ...allValues,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    var valid = true;
    (Object.values(allValues)).every(item => {
      if (!item) {
        toast.error('You need to fill all the neccessery data marked with *', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        valid = false;
      }
    })
    if (!valid) return false
    const reg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = allValues.previewVideo.match(reg)
    if (!(match && match[1].length === 11)) {
      toast.error('Invalid youtube link', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      valid = false
    }
    if (!valid) return false
    return true
  }

  const handleOpen = () => {
    if (!validate())
      return
    setShow(true)

  };

  const handleAdd = e => {
    if (!validate())
      return
    handleConsent()
    const courseData = { ...allValues, ...extraValues }
    try {
      axios({ method: "post", url: `http://localhost:5000/instructor/createCourse/`, withCredentials: true, data: courseData })
        .then((response) => {
          console.log(response.data);
          setShow(false)
          toast.success('Course Created Successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error) => {
          console.log(error);
        })
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleConsent = () => {
    try {
      axios({ method: "patch", url: `http://localhost:5000/instructor/setContractState/`, withCredentials: true, data: { state: true } })
        .then((response) => {
          console.log(response.data.consent);
        })
        .catch((error) => {
          console.log(error.message);
        })
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    axios({ method: "get", url: `http://localhost:5000/instructor/getContractState/`, withCredentials: true })
      .then((response) => {
        setConsent(response.data.consent)
        console.log(response.data.consent)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [consent])

  useEffect(() => {
    if (loading) return
    else {
      if (user) {
        if (user.type !== 'instructor') {
          history.push('/')
        }
      }
      else {
        if (!loading) {
          history.push('/login')
        }
      }
    }
  }, [loading])

  return (
    <div className="addcourse">

      <p>* Course title</p>
      <input type="text" placeholder='Title ie. Introduction to ...' id="title" name="title" onChange={handleChange} value={allValues.title} />
      <p>* Subject</p>
      <input type="text" placeholder='Subject ie. Computer Science' id="subject" name="subject" onChange={handleChange} value={allValues.subject} />
      <p>* Summary</p>
      <input type="text" placeholder='Summary of the course' id="summary" name="summary" onChange={handleChange} value={allValues.summary} />
      <p>* Preview video link</p>
      <input type="text" placeholder='Preview video link' id="previewVideo" name="previewVideo" onChange={handleChange} value={allValues.previewVideo} />
      <p>* Course fees</p>
      <input type="number" placeholder='Course fees per month in US dollars' id="price" name="price" onChange={handleChange} value={allValues.price} />
      <p>* Course hours</p>
      <input type="number" placeholder='Total course hours' id="totalHours" name="totalHours" onChange={handleChange} value={allValues.totalHours} />
      <p>* Image link</p>
      <input type="text" placeholder='Add a course image link' id="imageURL" name="imageURL" onChange={handleChange} value={allValues.imageURL} />

      <ol>Outlines: {extraValues.outlines.map(x => <li>{x}</li>)}</ol>
      <input type="text" placeholder='Add outline' id="outline" name="outline" onChange={e => setOutline(e.target.value)} value={outline} />
      <button onClick={handelExtraValues} name="outlines" value={outline}>Add outline</button>

      <ol>Subtitles: {extraValues.subtitles.map(x => <li>{x.title + "  " + x.totalHours + " hours"}</li>)}</ol>
      <input type="text" placeholder='Add subtitle title' id="subtitle" name="subtitle" onChange={e => setSubtitle(e.target.value)} value={subtitle} />
      <input type="number" placeholder='Add subtitle total hours' id="subtitle-hours" name="subtitle-hours" onChange={e => setHours(e.target.value)} value={hours} />
      <button onClick={handelExtraValues} name="subtitles" value={subtitle}>Add subtitle</button>

      <Button variant="primary" onClick={consent ? handleAdd : handleOpen}>
        Create Course
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Contract</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoremIpsum p={3} random={false} />
        </Modal.Body>
        <Modal.Footer>
          <FormControlLabel control={<Checkbox onChange={() => setChecked(!checked)} value={checked} defaultChecked={checked} />} label="I agree to the contract" />
          <Button variant="primary" onClick={handleAdd} disabled={!checked}>Save</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default AddCourse;
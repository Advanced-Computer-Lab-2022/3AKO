import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useUserContext } from './hooks/useUserContext';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";

// import Button from 'react-bootstrap/Button';
import { LoremIpsum } from "react-lorem-ipsum";
import { ToastContainer, toast } from 'react-toastify';
import { TextField, Card, CardMedia, CardContent, Typography, Button } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css';

const AddCourse = () => {


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
  const [outlines, setOutlines] = useState([''])
  // for the contract
  const [show, setShow] = useState(false);
  const [consent, setConsent] = useState(false);
  const [checked, setChecked] = useState(false);
  //


  const handleChange = (e) => {
    console.log(allValues)
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

  const handleOpen = (e) => {
    e.preventDefault()
    if (!validate())
      return
    setShow(true)

  };

  const handleAdd = (e) => {
    e.preventDefault()
    if (!validate())
      return
    handleConsent()
    const courseData = { ...allValues, outlines }
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

          history.push(`/instructor/incompleteCourse/${response.data}`)///////////////////////
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
        }
      }
      else {
        if (!loading) {
          history.push('/login')
        }
      }
    }
  }, [loading])

  const handleOutlineChange = (value, index) => {
    let arr = [...outlines]
    arr[index] = value
    setOutlines(arr)

  }
  const addOutLine = (event) => {
    event.preventDefault();
    let arr = [...outlines]
    arr.push("")
    setOutlines(arr)
    console.log(arr);
    console.log(outlines.length)
  }

  return (
    <div >
      <h3 style={{ textAlign: 'center', marginTop: '90px', fontFamily: 'poppins' }}>Create New Course</h3>
      <div className='addcourse'>
        <form action="" className='createCourseForm' onSubmit={consent ? handleAdd : handleOpen} >
          <TextField required
            label='Course Title' placeholder='Title...'
            id="title" name="title"
            onChange={handleChange} value={allValues.title}
          />
          <TextField required
            label='subject' placeholder='subject...'
            id="subject" name="subject"
            onChange={handleChange} value={allValues.subject}
          />
          <TextField required
            label='Summary'
            id="summary" name="summary"
            onChange={handleChange} value={allValues.summary}
            multiline

          />
          <TextField required
            label='Preview Video' placeholder='URL'
            id="previewVideo" name="previewVideo"
            onChange={handleChange} value={allValues.previewVideo}
            type='url'
          />
          <TextField required
            label='Course Fees'
            id="price" name="price"
            min="0" max="300"
            onChange={handleChange} value={allValues.price}
            type='number'
          />
          <TextField required
            label='Image Link'
            id="imageURL" name="imageURL"
            onChange={handleChange} value={allValues.imageURL}
            type='url'
          />

          <h4>Outlines:</h4>
          {outlines && outlines.map((outline, index) =>

            <TextField required value={outline} label={'Outline'}
              onChange={(e) => { handleOutlineChange(e.target.value, index) }} />
          )}
          <Button style={{ margin: 'auto' }} variant='outlined' onClick={addOutLine}>Add outline</Button>

          <Button variant="contained"
            type='submit'
            style={{ display: 'block' }}>
            Create Course
          </Button>
        </form>
        <div>
          <Card sx={{ maxWidth: 345, minWidth: 345 }}>
            <CardMedia
              component="img"
              alt="Course Image"
              height="140"
              image={allValues.imageURL}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {allValues.title == '' ? <div style={{ color: 'gray' }}>Title..</div> : allValues.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <div className='card-body'>
                  <p className='fw-bold'>Taught by: <span className='fw-normal'>{user?user.name: ''}</span></p>

                  <div className='price'>Price : {allValues.price == 0 ? 'Free' : allValues.price + '$'}</div>
                </div>
              </Typography>
            </CardContent>

          </Card>
          <p className='mt-3'>Preview Video :</p>
          <iframe width="345" height="194" src={"https://www.youtube.com/embed/" + allValues.previewVideo.substring(allValues.previewVideo.length - 11)} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>


      </div>


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
    </div >
  );
}

export default AddCourse;
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Overlay from "react-overlay-component";
import { Checkbox, FormControlLabel } from '@mui/material';

const AddCourse = () => {
  const [outline, setOutline] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [hours, setHours] = useState(0)

  const { instructorId } = useParams()
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

  const [isOpen, setOverlay] = useState(false);

  const closeOverlay = () => setOverlay(false);

  const configs = {
    animate: true,
    // clickDismiss: false,
    // escapeDismiss: false,
    // focusOutline: false,
  };

  const [consent, setConsent] = useState(false);

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

  const openOverlay = () => {
    var valid = true;
    (Object.values(allValues)).every(item => {
      if (!item) {
        alert("You need to fill all the neccessery data marked with *")
        valid = false;
      }
    })
    if (!valid) return
    const reg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = allValues.previewVideo.match(reg)
    if (!(match && match[1].length === 11)) {
      alert("The entered link is invalid")
      valid = false
    }
    if (!valid) return
    setOverlay(true);


  };

  const handleSubmit = e => {
    const courseData = { ...allValues, ...extraValues }
    try {
      axios.post(`http://localhost:5000/instructor/createCourse/${instructorId}`, courseData)
        .then((response) => {
          console.log(response.data);
          alert("course added successfully")
        })
        .catch((error) => {
          console.log(error);
        })
    }
    catch (err) {
      console.log(err);
    }
  }
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

      <button onClick={openOverlay}>Add course</button>

      <form onSubmit={handleSubmit}>
        <Overlay configs={configs} isOpen={isOpen} closeOverlay={closeOverlay}>
          <h3>Contract</h3>
          <p>contract content</p>
          <FormControlLabel control={<Checkbox onChange={() => setConsent(!consent)} />} label="I agree" />

          <button type="submit" disabled={!consent}>Save</button>
        </Overlay>
      </form>
      <div>


      </div>
    </div>
  );
}

export default AddCourse;
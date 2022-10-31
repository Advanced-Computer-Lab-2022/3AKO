import axios from 'axios';
import {useState} from 'react';
import { useParams } from 'react-router-dom';

const AddCourse = () => {
    const [outline,setOutline]= useState('')
    const [subtitle,setSubtitle]= useState('')

    const {instructorId}=useParams()
    const [allValues, setAllValues] = useState({
        title:'',
        subject: '',
        summary: '',
        previewVideo: '',
        price: 0,
        totalHours: 0,
        imageURL : '',
     });
     const [extraValues,setExtravalues]=useState({
        outlines:[],
        subtitles:[]
     })
     const handelExtraValues = e => {
        if(e.target.value==''){
            alert('you need to fill in a value')
            return
        }
        setExtravalues({
            ...extraValues,
            [e.target.name]: [...extraValues[[e.target.name]],e.target.value]
        })
        console.log(extraValues);
     }

     const handleChange = (e) => { 
        console.log(extraValues);
        setAllValues({
          ...allValues,
          [e.target.name]: e.target.value,
        });
      };

      const handleSubmit = event => {
        const valid=true;
        (Object.values(allValues)).every(item => {
            if(!item){
                alert("You need to fill all the neccessery data marked with *")
                return false
            }
        })
        if(!valid) return

        const courseData = {...allValues,...extraValues}
        try{
            axios.post(`http://localhost:5000/instructor/addCourse/${instructorId}`,courseData)
              .then((response) => {
                console.log(response.data);
                alert("course added succefully")
              })
              .catch((error) => {
                console.log(error);
              })
        }
        catch(err){
            console.log(err);
        }

      };
    return ( 
        <div className="addcourse">
        
            <p>* Course title</p>
            <input type="text" placeholder='Title ie. Introduction to ...' id="title" name="title" onChange={handleChange} value={allValues.title}/>
            <p>* Subject</p>
            <input type="text" placeholder='Subject ie. Computer Science' id="subject" name="subject" onChange={handleChange} value={allValues.subject}/>
            <p>* Summary</p>
            <input type="text" placeholder='Summary of the course' id="summary" name="summary" onChange={handleChange} value={allValues.summary}/>
            <p>* Preview video link</p>
            <input type="text" placeholder='Preview video link' id="previewVideo" name="previewVideo" onChange={handleChange} value={allValues.previewVideo}/>
            <p>* Course fees</p>
            <input type="number" placeholder='Course fees per month in US dollars' id="price" name="price" onChange={handleChange} value={allValues.price}/>
            <p>* Course hours</p>
            <input type="number" placeholder='Total course hours' id="totalHours" name="totalHours" onChange={handleChange} value={allValues.totalHours}/>
            <p>* Image link</p>
            <input type="text" placeholder='Add a course image link' id="imageURL" name="imageURL" onChange={handleChange} value={allValues.imageURL}/>
            
            <ol>Outlines: {extraValues.outlines.map(x => <li>{x}</li>)}</ol>
            <input type="text" placeholder='Add outline' id="outline" name="outline" onChange={e => setOutline(e.target.value)} value={outline}/>
            <button onClick={handelExtraValues} name="outlines" value={outline}>Add outline</button>
            
            <ol>Subtitles: {extraValues.subtitles.map(x => <li>{x}</li>)}</ol>
            <input type="text" placeholder='Add subtitle title' id="subtitle" name="subtitle" onChange={e => setSubtitle(e.target.value)} value={subtitle}/>
            <button onClick={handelExtraValues} name="subtitles" value={subtitle}>Add subtitle</button>
            
            <form onSubmit={handleSubmit}>
                <button type="submit">Add course</button>
            </form>
        </div>
     );
}
 
export default AddCourse;
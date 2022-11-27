import { useState , useEffect } from "react";
import axios from "axios";



const Lol = () => {
const [courseName, setCourseName] = useState("");
useEffect(()=>{
  const getInfo =async ()  =>{
    const response = await fetch('http://localhost:5000/course/getCourseInfo/63597c112a1e7de9acb58e05')
    const json =await response.json()
    setCourseName(json)
   }
   getInfo()

},[])
 
   
  return (
    <div className="7ambola">
     <div> 
     <h1> {courseName.title} </h1> 
     <h1> {courseName.outline} </h1> 
     <h1> {courseName.summary} </h1> 
     <h1> {courseName.subject} </h1> 
     {console.log(courseName)}
     </div></div>
    // <div>
    //   <h1>
    //     hello world
    //   </h1>
    // </div>
  );
}

export default Lol;

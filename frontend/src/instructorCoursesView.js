import { useEffect } from "react";
import { useState } from "react";


const InstructorCourses = () => {
    var [count,setcount] = useState(1)


const handleClick = ()=>{
    setcount(++count);
}
// useEffect( ()=> {
// fetch('http:localhost:5000/instructor/viewMyCourses/63597146bdb0ff27cdf8e2f3')
//     .then( res => {
//         return res.json();
//     })
//     .then( data => {
//         console.log({"data":"lol"});
//         setHello({"data":"lol"});
//     });

// },[count]);
    return ( 
    <div className="instructor-courses">
        <title>show courses</title>
        <button onClick={handleClick}>show instructor courses</button>
        <h2> {count}</h2>
    </div> );
}
 
export default InstructorCourses;
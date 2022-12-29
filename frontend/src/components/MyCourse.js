import { height } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import Rate from './rate'
import "../stylesheets/mycoursesTrainee.css"
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Button, Divider } from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';
const BorderLinearProgress = styled(LinearProgress)(({ theme, graduated }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: !graduated ? '#E00018' : '#3bce6c',
    },
}));


const MyCourse = ({ course }) => {
    var x = document.getElementsByClassName("gradDivider")
    for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("css-9mgopn-MuiDivider-root")
    }
    const [downloading, setDownloading] = useState(false);
    const downloadCertificate = () => {
        setDownloading(true)
        axios({
            method: "get",
            url: `http://localhost:5000/trainee/downloadCertificate/${course.courseId}`,
            withCredentials: true, responseType: 'arraybuffer'
        }).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]
                , { type: "application/pdf" }))
            let link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Certficate.pdf');
            document.body.appendChild(link);
            link.click();
            setDownloading(false)
        }).catch((error) => {
            console.log(error);
            setDownloading(false)
        })
    }

    return (
        <div style={{ width: "80%", margin: "auto" }}>
            <Link className='mycourses-cardLink' to={`/trainee/CourseSubtitles/${course.courseId}`}>

                <div className="my-4 mycourse-card" style={{ borderRadius: "10px" }} >
                    <div style={{ display: 'flex', felxDirection: "row", height: "150px" }}>
                        <img src="https://www.educationafter12th.com/wp-content/uploads/2016/11/digital-marketing-seo-course-detail-syllabus.jpg" alt="" style={{ borderRadius: " 10px 0 0 10px" }} />
                        <div className='p-4' style={{ width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center", columnGap: "10px" }}>
                            <h3 style={{ width: "100%" }}>{course.title}</h3>
                            <BorderLinearProgress graduated={course.progress >= 1} variant="determinate" value={course.progress * 100} style={{ width: "70%" }} />
                            <span>{Math.floor(course.progress * 100)}%</span>
                            <Button style={{ position: "absolute", marginLeft: "43%" }} variant="contained" endIcon={<ArrowRightAltIcon />}>
                                Course Home
                            </Button>
                        </div>
                    </div>
                    {course.progress >= 1 &&
                        < div >
                            <Divider className='gradDivider' />
                            <div className='px-5' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className='h4 p-4'><SchoolOutlinedIcon style={{ marginRight: '10px', color: '#E00018' }} /> Graduated</span>
                                <Link disabled={true} className='certiface-Link'> <Button disabled={downloading} id='123' onClick={(e) => { downloadCertificate(e.target) }} variant="contained" endIcon={<DownloadIcon />}>
                                    Download Certificate
                                </Button></Link>

                            </div>
                        </div>}
                </div>

            </Link >
            {/* <Rate traineeId={traineeId.id} type='course' id={course.courseId} /> */}
        </div >
    );
}

export default MyCourse;
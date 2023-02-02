import { height } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import "../stylesheets/mycoursesTrainee.css"
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Button, Divider } from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material'
import axios from 'axios';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useUserContext } from "../hooks/useUserContext";
import { DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog } from '@mui/material'
import { Alert, Backdrop, AlertTitle, TextField } from '@mui/material'
import { FormControl, FormControlLabel, RadioGroup, FormLabel, Radio, Snackbar } from '@mui/material'
import Rate from './rate'
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
    const [img, setImg] = useState('')
    useEffect(() => {
        axios({
            method: "post",
            url: `http://localhost:5000/trainee//getCourseImage/`,
            withCredentials: true,
            data: { courseId: course.courseId },
        })
            .then((res) => {
                console.log(res.data);
                setImg(res.data.imageURL)
            })
            .catch((error) => {
            });
    }, [])
    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }
    const { user, loading } = useUserContext()
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
    const [backdropOpen, setBackdropOpen] = useState(false)
    const [requested, setRequsted] = useState(false)

    const RequestRefund = () => {
        DialogCloseHandle()
        axios({
            method: "post",
            url: `http://localhost:5000/individualTrainee/requestRefund/`,
            withCredentials: true,
            data: {
                courseId: course.courseId
            }

        }).then(async (res) => {
            if (res.data.message == 'fail')
                setRequsted(false)
            else
                setRequsted(true)
            setBackdropOpen(true)
            await timeout(2500);
            setBackdropOpen(false)

        }).catch((error) => {
            console.log(error);
            setDownloading(false)
        })
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [DialogOpen, setDialogOpen] = useState(false);

    const handleRefundOpen = () => {
        handleClose();
        setDialogOpen(true);
    };
    const handleReportOpen = () => {
        handleClose();
        setReportOpen(true)


    }

    const DialogCloseHandle = () => {
        setDialogOpen(false);
    };


    const [reportOpen, setReportOpen] = useState(false)
    const [reportType, setReportType] = useState('')

    const sendReport = () => {
        setDialogOpen(false);
        const title = document.getElementById('reportTitle').value
        const body = document.getElementById('reportBody').value

        axios({
            method: "post",
            url: `http://localhost:5000/trainee/addComplaint/`,
            withCredentials: true,
            data: {
                title,
                body,
                reportedCourse: course.courseId,
                reportType
            }

        }).then(async (res) => {
            setReportOpen(false)
            setReportSnackbar(true)
        }).catch((error) => {
            console.log(error);

        })

    }

    const [reportSnackbar, setReportSnackbar] = useState(false)

    return (
        <div>

            <div style={{ width: "80%", margin: "auto" }}>
                <Link className='mycourses-cardLink' to={`/trainee/CourseSubtitles/${course.courseId}`}>

                    <div className="my-4 mycourse-card" style={{ borderRadius: "10px" }} >
                        <Link className='options-Link' >

                            <MoreVertIcon onClick={handleClick} style={{ position: 'absolute', marginLeft: '73%', marginTop: "10px" }} />

                        </Link>


                        <div style={{ display: 'flex', felxDirection: "row", height: "150px" }}>
                            <img src={img} alt="" style={{ borderRadius: " 10px 0 0 10px" }} />
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
                                    <Link className='certiface-Link'> <Button disabled={downloading} id='123' onClick={(e) => { downloadCertificate(e.target) }} variant="contained" endIcon={<DownloadIcon />}>
                                        Download Certificate
                                    </Button></Link>

                                </div>
                            </div>}

                    </div>

                </Link >
                {/* <Rate type='course' id={course.courseId} /> */}

            </div >

            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {user.type == 'individual trainee' &&
                    <div>
                        <MenuItem onClick={handleRefundOpen} disabled={course.progress > .5}><AttachMoneyIcon />Refund this course</MenuItem>
                        <Divider></Divider>
                    </div>
                }
                <MenuItem onClick={handleReportOpen} style={{ color: '#B33A3A' }}> <ErrorOutlineIcon />Report a problem</MenuItem>
            </Menu>
            <Dialog
                open={DialogOpen}
                onClose={DialogCloseHandle}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Request to refund  <strong>{course.title}</strong> ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Once you request to refund this course you will wait until the adminstration take action to this request.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={DialogCloseHandle}>Cancel</Button>

                    <Button onClick={RequestRefund} autoFocus>
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdropOpen}
                onClick={() => { setBackdropOpen(false) }}
            >
                {requested ?
                    <Alert severity="success">
                        <AlertTitle>Success </AlertTitle>
                        <strong>Your refund request was sent successfully</strong>
                    </Alert>
                    :
                    <Alert severity="warning">
                        <AlertTitle>Already Requested </AlertTitle>
                        <strong>You already requested to refund this course!</strong>
                    </Alert>
                }
            </Backdrop>


            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '40%', maxHeight: 600 } }}
                maxWidth="m"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                // TransitionProps={{ onEntering: handleEntering }}
                open={reportOpen}

            >
                <DialogTitle>Report Problem</DialogTitle>
                <DialogContent dividers>
                    <FormControl className='mb-3'>
                        <FormLabel id="demo-radio-buttons-group-label">Problem Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            onChange={(e) => { setReportType(e.target.value) }}
                        >
                            <FormControlLabel value="technical" control={<Radio />} label="Technical" />
                            <FormControlLabel value="financial" control={<Radio />} label="Financial" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                    <TextField className='mb-4' style={{ width: "100%" }} id="reportTitle" placeholder='Title' label='Title' variant="outlined" />
                    <TextField style={{ width: "100%" }} id="reportBody" placeholder='What is your problem?' label='Problem' variant="outlined" multiline minRows={7} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => { setReportOpen(false) }}>
                        Cancel
                    </Button>
                    <Button onClick={sendReport}>Confirm</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={reportSnackbar} autoHideDuration={6000} onClose={() => { setReportSnackbar(false) }}>
                <Alert onClose={() => { setReportSnackbar(false) }} severity="info" sx={{ width: '100%' }}>
                    Report Sent!  <Link to={'/reports'}>View your reports</Link>
                </Alert>
            </Snackbar>



        </div>
    );
}

export default MyCourse;
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Accordion, AccordionSummary, Typography, AccordionDetails, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Reports = () => {
    const [reports, setReports] = useState(null)
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const getComplaints = () => {
            axios({
                method: "get",
                url: `http://localhost:5000/user/getComplaints/`,
                withCredentials: true,
            }).then(async (response) => {
                setReports(response.data)
            }).catch((error) => {
                console.log(error);

            })
        }
        getComplaints()
    }, [reload])







    const Report = ({ report }) => {
        const [reportId, setReportId] = useState(null);
        const [dialogOpen, setDialogOpen] = useState(false)
        const addFollowUp = () => {
            const follow = document.getElementById('followUp').value
            axios({
                method: "post",
                url: `http://localhost:5000/user/addFollowUp/`,
                withCredentials: true,
                data: {
                    complaintId: reportId,
                    followUp: follow
                }

            }).then(async (res) => {
                setDialogOpen(false)
                setReload(!reload);


            }).catch((error) => {
                console.log(error);

            })

        }
        const openPOP = (complaintId) => {
            setDialogOpen(true);
            setReportId(complaintId)
        }
        return (
            <div>
                <Accordion style={{ margin: "10px 0" }}>
                    <AccordionSummary

                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', margin: '0 20px' }}>
                            <Typography>{report.title}</Typography>
                            <Typography style={report.status == 'resolved' ? { color: '#4BB543' } : { color: '#FFCC00' }}>{report.status == 'unseen' ? 'pending' : report.status}</Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {report.body}
                        </Typography>
                        <ul>
                            {report.followUps && report.followUps.map((followUp) => (
                                <li>{followUp}</li>
                            ))}
                        </ul>
                        <Button onClick={(e) => { openPOP(report._id) }}>Add Follow up</Button>
                    </AccordionDetails>
                </Accordion>

                <Dialog

                    open={dialogOpen}
                    onClose={() => { setDialogOpen(false) }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ width: "600px" }}>
                        {"Add follow up to thsis report"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField style={{ margin: '15px 0', width: "100%" }} multiline id="followUp" placeholder='what is your problem' label='Follow up' variant="outlined" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setDialogOpen(false) }}>Cancel</Button>
                        <Button onClick={addFollowUp}>
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>

            </div >
        );
    }



    return (
        <div>
            <div style={{ width: "80%", margin: 'auto', marginTop: '120px' }}>
                <h3>Reports</h3>
                <div style={{ border: '1px solid gray', padding: '40px', borderRadius: '10px' }}>
                    {reports && reports.map((report) => (
                        <Report report={report} key={report._id} />
                    ))}
                </div>
            </div >

        </div>
    );
}

export default Reports;
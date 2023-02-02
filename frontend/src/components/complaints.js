import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from '@mui/material';




export default function DataGridDemo() {

    const columns = [
        {
            field: 'username',
            headerName: 'Username',
            width: 150,

        },
        {
            field: 'courseTitle',
            headerName: 'Course title',
            width: 300,

        },
        {
            field: 'title',
            headerName: 'Report title',
            width: 200,
        },
        {
            field: 'reportType',
            headerName: 'Report type',
            width: 100,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
        },

        {
            field: 'Accept Request',
            headerName: 'Accept',
            width: 130,
            type: 'actions',
            renderCell: params => <Button variant='contained' onClick={() => { viewReport(params) }}>View Report</Button>
        },

    ];
    const answer = (answer) => {
        axios({
            method: "patch",
            url: `http://localhost:5000/admin/${answer}`,
            data: {
                complaintId: complaintId,
            },
            withCredentials: true,
        })
            .then((res) => {
                fetchComplaints();
                setDialogOpen(false)
            })
            .catch((error) => {
            });
    }
    const [dialogTitle, setDialogTitle] = useState('')
    const [dialogBody, setDialogBody] = useState('')
    const [complaintId, setComplaintId] = useState('')
    const [followups, setFollowUps] = useState([]);

    const viewReport = (params) => {
        setDialogOpen(true)
        setDialogTitle(params.row.title)
        setDialogBody(params.row.body)
        setComplaintId(params.row._id)
        setFollowUps(params.row.followUps)

    }

    const [complaints, setComplaints] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const fetchComplaints = async () => {
        await axios({
            method: "get",
            url: "http://localhost:5000/admin/getPendingComplaints",
            withCredentials: true,
        })
            .then((res) => {
                setComplaints(res.data);
                console.log(res.data);
            })
            .catch((error) => {
            });
    };
    useEffect(() => {
        fetchComplaints();
    }, []);

    return (
        <div>
            <Box sx={{ height: 400, width: '80%', margin: 'auto' }}>
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={complaints}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    // disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: false }}
                />
            </Box>
            <Dialog
                open={dialogOpen}
                onClose={() => { setDialogOpen(false) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogBody}
                    </DialogContentText>
                    <ul>
                        {followups && followups.map((followup) => (
                            <li>{followup}</li>
                        ))}
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='warning' onClick={() => answer('markComplaintPending')}>Mark as pending</Button>
                    <Button variant='contained' color='success' onClick={() => { answer('resolveCompalint') }} autoFocus>
                        Resolve
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
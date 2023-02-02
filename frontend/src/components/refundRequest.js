import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';




export default function DataGridDemo() {

    const columns = [
        {
            field: 'traineeUserName',
            headerName: 'Trainee Username',
            width: 150,

        },
        {
            field: 'courseTitle',
            headerName: 'Course title',
            width: 300,

        },
        {
            field: 'progress',
            headerName: 'Progress',
            width: 100,
            renderCell: params => <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant='determinate' value={params.row.progress * 100} color='info' />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="caption" component="div" color="text.secondary">
                        {`${Math.round(params.row.progress * 100)}%`}
                    </Typography>
                </Box>
            </Box>


        },
        {
            field: 'Accept Request',
            headerName: 'Accept',
            width: 130,
            type: 'actions',
            renderCell: params => <Button variant='contained' color='success' onClick={() => { answer(params, 'accept') }}>Accept</Button>
        },
        {
            field: 'Reject Refund',
            headerName: 'Reject',
            width: 130,
            type: 'actions',
            renderCell: params => <Button variant='contained' color='error' onClick={() => { answer(params, 'reject') }}>Reject</Button>
        },
    ];
    const answer = (params, answer) => {
        console.log(params.row);
        axios({
            method: "patch",
            url: "http://localhost:5000/admin/answerRefundRequest",
            data: {
                requestId: params.row._id,
                response: answer,
            },
            withCredentials: true,
        })
            .then((res) => {
                fetchRefundRequests();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const [refundRequests, setRefundRequests] = useState([]);
    const fetchRefundRequests = async () => {
        await axios({
            method: "get",
            url: "http://localhost:5000/admin/getRefundRequests",
            withCredentials: true,
        })
            .then((res) => {
                setRefundRequests(res.data);

            })
            .catch((error) => {
                alert("invalid request");
            });
    };
    useEffect(() => {
        fetchRefundRequests();
    }, []);

    return (
        <Box sx={{ height: 400, width: '80%', margin: 'auto' }}>
            <DataGrid
                getRowId={(row) => row._id}
                rows={refundRequests}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: false }}
            />
        </Box>
    );
}
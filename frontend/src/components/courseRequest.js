import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';


export default function DataGridDemo() {

    const columns = [
        {
            field: 'corporateUserName',
            headerName: 'Trainee Username',
            width: 150,

        },
        {
            field: 'courseTitle',
            headerName: 'Course title',
            width: 300,

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
            url: "http://localhost:5000/admin/answerRequest",
            data: {
                requestId: params.row._id,
                response: answer,
            },
            withCredentials: true,
        })
            .then((res) => {
                fetchCoursesRequests()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const [coursesRequests, setCoursesRequests] = useState([]);
    const fetchCoursesRequests = async () => {
        await axios({
            method: "get",
            url: "http://localhost:5000/admin/getCourseRequests",
            withCredentials: true,
        })
            .then((res) => {
                setCoursesRequests(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                alert("invalid request");
            });
    };
    useEffect(() => {
        fetchCoursesRequests();
    }, []);
    return (
        <Box sx={{ height: 400, width: '80%', margin: 'auto' }}>
            <DataGrid
                getRowId={(row) => row._id}
                rows={coursesRequests}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: false }}
            />
        </Box>
    );
}
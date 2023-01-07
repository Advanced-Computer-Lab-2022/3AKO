import axios from "axios";
import { useEffect, useState } from "react";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Earnings = () => {
    const [earnings, setEarnings] = useState([])
    useEffect(() => {
        axios({
            method: 'get', url: `http://localhost:5000/instructor/getEarnings`,
            withCredentials: true
        })
            .then((response) => {
                setEarnings(response.data)
                console.log(response.data);
            });

    }, [])

    return (
        <div>
            <h2 style={{ marginTop: '100px', width: '100%', textAlign: 'center' }}>Earnings </h2>
            <TableContainer component={Paper} style={{ width: '70%', margin: 'auto' }}>
                <Table sx={{ minWidth: 650 }} size='large' aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Start Date</TableCell>
                            <TableCell align="center">Earnings&nbsp;($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {earnings.map((earning) => (
                            <TableRow
                                key={earning._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {earning.startDate.substring(0, 10)}
                                </TableCell>
                                {/* <TableCell align="right"></TableCell> */}
                                <TableCell align="center">{earning.sum}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}

export default Earnings;
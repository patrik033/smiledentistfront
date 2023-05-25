/* eslint-disable react-hooks/exhaustive-deps */
import AdminNavigation from "../../../Navigation/AdminNavigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import RenderBookedTime from "./RenderBookedTime";
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


function AdminUserBookings() {
    const [orders, setOrders] = useState(null);
    const [isSet, setSet] = useState(false);
    const [data, dataSet] = useState(null);
    const [isData, setData] = useState(false);
    const [dataUpdated, dataUpdatedSet] = useState(false);

    const [valueStart, setValueStart] = useState(new Date());
    const [isStartSet, startSet] = useState(false);
    const [isEndSet, endSet] = useState(false);
    const [valueEnd, setValueEnd] = useState(new Date());
    const [isBothSet, setBoth] = useState(false);

    useEffect(() => {
        const storage = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${storage}` },
        };

        axios.get(`https://localhost:6001/api/Booking`, config)
            .then(response => {
                setOrders(response.data);
                setSet(true);
            });

        if (dataUpdated) {
            dataUpdatedSet(false)
        }
    }, [dataUpdated]);

    useEffect(() => {

        if (isBothSet) {

            const storage = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${storage}` },
            };

            axios.get(`https://localhost:6001/api/Booking?fields=${valueStart}&endValue=${valueEnd}`, config)
                .then(response => {
                    setOrders(response.data);
                    setSet(true);
                });
        }

        if (dataUpdated) {
            dataUpdatedSet(false)
        }
        if (isBothSet) {
            setBoth(false);
        }
    }, [isBothSet])

    const updateData = (items) => {
        if (items === true) {
            dataUpdatedSet(true);
        }
    }

    const redirectToNewPage = (event) => {
        dataSet(event);
        setData(true);
    }


    const handleChangeStart = (newValue) => {
        setValueStart(newValue);
        startSet(true)
    };

    const handleChangeEnd = (newValue) => {
        setValueEnd(newValue);
        endSet(true);
    };

    const handleFilterChange = () => {
        if (isStartSet && isEndSet) {
            // console.log("both set");
            setBoth(true);
        }
    }

    return (
        <div>
            <AdminNavigation />
            {isSet &&
                <div>
                    <Container fluid>
                        <Container className="me-auto">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Row className="mb-4 mt-4">
                                    <h1>Start Tid:</h1>
                                    <MobileDatePicker
                                        label="Date mobile"
                                        inputFormat="DD/MM/YYYY"
                                        value={valueStart}
                                        onChange={handleChangeStart}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Row>
                                <Row>
                                    <h1>Slut Tid:</h1>
                                    <MobileDatePicker
                                        label="Date mobile"
                                        inputFormat="DD/MM/YYYY"
                                        value={valueEnd}
                                        onChange={handleChangeEnd}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Row>
                            </LocalizationProvider>
                            <Button
                                className="me-auto mt-2 mb-2"
                                onClick={handleFilterChange}
                            >Filtrera Data</Button>
                        </Container>


                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Namn</th>
                                    <th>Email</th>
                                    <th>Användar Id</th>
                                    <th>Bokad Tid</th>
                                    <th>Ta bort Besök</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, i) =>
                                    <tr key={i}>
                                        <td>{order.id}</td>
                                        <td>{order.name}</td>
                                        <td>{order.email}</td>
                                        <td>{order.userId}</td>
                                        <td>{order.scheduledTime}</td>
                                        <td><Button variant="primary" onClick={e => redirectToNewPage(order)}>Ta bort</Button></td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        {isData &&
                            <RenderBookedTime
                                updated={updateData}
                                show={isData}
                                onHide={() => setData(false)}
                                data={data}
                            />
                        }
                    </Container>
                </div>
            }
        </div>
    )
}


export default AdminUserBookings;

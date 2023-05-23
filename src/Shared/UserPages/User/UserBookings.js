/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import RenderUserBookedTime from "./RenderUserBookedTime";

function UserBookings(props) {
    const userData = props.user;

    const [currentUSerData, setCurrentUserData] = useState(null);
    const [isSet, setData] = useState(false);
    const [isModalDataSet, setModalData] = useState(false);
    const [deleteData, setDeleteData] = useState(null);
    const [dataUpdated, dataUpdatedSet] = useState(false);

    
    useEffect(() => {
        const storage = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${storage}` },
        };

        axios.get(`https://localhost:6001/api/Booking/Users/${userData.userId}`, config)
            .then(response => {
                setCurrentUserData(response.data);
                setData(true);
            });

        if (dataUpdated) {
            dataUpdatedSet(false)
        }
    }, [dataUpdated]);
    
    useEffect(() => {
        const storage = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${storage}` },
        };

        axios.get(`https://localhost:6001/api/Booking/Users/${userData.userId}`, config)
            .then(response => {
                setCurrentUserData(response.data);
                setData(true);
            });
    }, []);


    const redirectToNewPage = (order) => {
        setDeleteData(order);
        setModalData(true);
    }

    const updateData = (items) => {
        if (items === true) {
            dataUpdatedSet(true);
        }
    }
    return (
        <div>
            {isSet &&
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>User Id</th>
                            <th>Scheduled Time</th>
                            <th>Delete Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUSerData.map((order, i) =>
                            <tr key={i}>
                                <td>{order.id}</td>
                                <td>{order.name}</td>
                                <td>{order.email}</td>
                                <td>{order.userId}</td>
                                <td>{order.scheduledTime}</td>
                                <td><Button variant="primary" onClick={e => redirectToNewPage(order)} >Delete</Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>


            }

            {isModalDataSet &&
                <RenderUserBookedTime
                    updated={updateData}
                    show={isModalDataSet}
                    onHide={() => setModalData(false)}
                    data={deleteData}
                />
            }
        </div>
    )
}

export default UserBookings;
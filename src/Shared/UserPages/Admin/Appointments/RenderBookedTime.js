/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { Modal, Button } from "react-bootstrap"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

function RenderBookedTime(props) {

    const [isToken, setToken] = useState(null);
    const [dataItem, setDataItem] = useState(null);
    const [nav, setNav] = useState(false);
    const [token, tokenValid] = useState(false);
    const [post, setPost] = useState(null);
    const [waiter, setWaiter] = useState(false);
    const navigate = useNavigate();
    const baseUrl = "https://localhost:6001/api/Booking";
    useEffect(() => {

        if (token) {
            sendDataToApi(dataItem);
        }
    }, [token]);

    const updatedData = (info) => {
        if (info === true) {
            props.updated(info);
        }
    }

    const sendDataToApi = (dataItem) => {
        const config = {
            headers: { Authorization: `Bearer ${isToken}` },
        };

        axios.delete(`${baseUrl}/${dataItem}`, config).then(response => {
            if (response.status === 200) {
                updatedData(true);
            }
        });
         props.onHide();
    }

    const deleteBookedTime = () => {
        if (token === false) {
            const storage = localStorage.getItem("token");
            setDataItem(props.data.id)
            setToken(storage);
            tokenValid(true);
        }
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Är du säker du vill ta bort:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Id: {props.data.id} </h4>
                <h4>Namn: {props.data.name}</h4>
                <h4>Email: {props.data.email}</h4>
                <h4>Bokad Tid: {props.data.scheduledTime}</h4>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "left" }}>
                <Button className="me-2 ml-auto " size="lg" variant="danger" onClick={deleteBookedTime}>Ja</Button>
                <Button size="lg" variant="secondary" onClick={props.onHide}>Nej</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RenderBookedTime
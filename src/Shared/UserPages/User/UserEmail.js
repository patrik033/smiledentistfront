/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import UserNavigation from "../../Navigation/UserNavigation";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import jwtDecode from "jwt-decode";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserMenu from "./UserMenu";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function UserEmail(props) {

    const [user, setUser] = useState(null);
    const[jwtToken,setToken] = useState(null);
    const[isUpdated,setUpdated] = useState(false)
    const [isUserEmail, userVarified] = useState(false);
    const[isMailSet,setEmailState] = useState(false);
    const [newEmail,setNewEmail] = useState(null);
    const baseUrl = "https://localhost:6001/api/Auth/updateEmail";
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token)
        const tokenDecrypted = jwtDecode(token)
        setUser(tokenDecrypted);
        userVarified(true);
    }, []);

    useEffect(() => {
        if (isMailSet) {
            const config = {
                headers: { Authorization: `Bearer ${jwtToken}` },
            };
           
            const data = {
                NewEmail: newEmail,
                UserId: user.id,
            }

            axios.post(baseUrl,data,config).then((response) => {
                if(response.status === 200){
                    if(response.data.result){
                        localStorage.removeItem("token");
                        localStorage.setItem("token",response.data.result);
                    }
                    setUpdated(true);
                }
            });
        }
    }, [isMailSet]);

    useEffect(() => {
        if(isUpdated){
            navigate("/loggedinuser");
        }
    },[isUpdated])

    const newEmailHandler = (event) => {

        setNewEmail(event);
    }
    
    const submitHandler = (event) => {
        event.preventDefault();
        setEmailState(true);
    }

    return (
        <div>
            <UserNavigation />
            <Row>
                <Col lg={3} md={3} xl={3} xxl={3} >
                    <UserMenu />
                </Col>
                <Col lg={"auto"}>
                    {isUserEmail &&
                        <Container className="mt-3">
                            <Form onSubmit={(event) => submitHandler(event)}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Old Email</Form.Label>
                                    <Form.Control type="email" disabled value={user.email} />
                                    <Form.Text className="text-muted">
                                        Vi delar inte din data
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Ny Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter new email" onChange={(event) => newEmailHandler(event.target.value)}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Container>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default UserEmail;
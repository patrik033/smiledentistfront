/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Form, Row, Container, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Navigation from "../Shared/Navigation/Navigation";
import { Input } from "@mui/material";
import { useLocation } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";

function UpdatePassword() {




    const location = useLocation();
    const tokenRetrieved = new URLSearchParams(useLocation().search).get("activationToken");
    const emailRetrieved = new URLSearchParams(useLocation().search).get("email");

    const [isPasswordUpdated, setUpdatedPassword] = useState(false);
    const [isAllSet, setAll] = useState(false)
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setConfirmPassword] = useState(null);

    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);
    const [isPasswordExpired, setPasswordExpired] = useState(false);



    useEffect(() => {
        if (tokenRetrieved != null || emailRetrieved != null) {
            setToken(tokenRetrieved);
            setEmail(emailRetrieved);
        }
    }, [tokenRetrieved && emailRetrieved]);


    useEffect(() => {
        if (isAllSet) {
            axios.get(`https://localhost:6001/api/Auth/confirmpasswordreset?email=${email}&password=${password}&activationToken=${token}`)
                .then(response => {
                    // console.log(response)
                    if (response.status === 200) {
                        console.log("Hej")
                        setUpdatedPassword(true);
                    }
                }).catch(function (error) {

                    if (error.response) {
                        const status = error.response.status;
                        if (status === 401) {
                            console.log(status)
                            setPasswordExpired(true);
                        }
                        else {
                            // console.log(error);
                        }
                    }
                });
        }
    }, [isAllSet])

    const passwordHandler = (event) => {
        setPassword(event)
    }

    const confirmPasswordHandler = (event) => {
        setConfirmPassword(event)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (passwordConfirm != null && password != null) {
            setAll(true);
        }
    }

    return (
        <div>
            <Navigation/>
            {!isPasswordUpdated && !isPasswordExpired &&
                <Form onSubmit={submitHandler} >
                    <Container>
                        <h2>
                            Uppdatera Lösenord
                        </h2>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Lösenord</Form.Label>
                            <Row className="align-items-center">
                                <Col lg={4} md={4} sm="auto" xs="auto">
                                    <Form.Control type="password" placeholder="Nytt Lösenord" onChange={(event) => passwordHandler(event.target.value)} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Bekräfta Nytt Lösenord</Form.Label>
                            <Row className="align-items-center">
                                <Col lg={4} md={4} sm="auto" xs="auto">
                                    <Form.Control type="password" placeholder="Bekräfta Nytt Lösenord" onChange={(event) => confirmPasswordHandler(event.target.value)} />
                                </Col>
                            </Row>

                        </Form.Group>
                        <Row>
                            <Col className='mb-3' md={{ span: 2 }}>
                                <Input variant="primary" type="submit" />
                            </Col>
                        </Row>
                    </Container>
                </Form>
            }
            
            {isPasswordUpdated &&
                <div>
                    <div style={{
                        justifySelf: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                    }}>
                        <Alert className="mt-5" key="info" variant="info">
                            Lösenordet har uppdaterats
                            <Alert.Link className="ms-3" href="/login">Använd länken för att logga in</Alert.Link>
                        </Alert>
                    </div>
                </div>
            }

            {isPasswordExpired &&
                <div>
                    <Alert className="mt-5" key="info" variant="info">
                        Lösenordslänken har löpt ut
                        <Alert.Link className="ms-3" href="/login">Använd länken för att skapa en ny från login sidan</Alert.Link>
                    </Alert>
                </div>
            }
        </div>
    )
}

export default UpdatePassword;
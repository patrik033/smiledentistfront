/* eslint-disable no-unused-vars */
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';



function LoginPage() {
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors }
    } = useForm();

    const [myPassword, setPassword] = useState(null);
    const [myData, setData] = useState(null);
    const [user, setUser] = useState(null);
    const [correctState, setCorrectState] = useState(false);
    const baseUrl = "https://localhost:6001/api/Auth/login";
    const [customError, setCustomError] = useState(null);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        setData(JSON.stringify(data));
        sendValidation();
    }

    const userPassword = (input) => {
        setPassword(input.target.value);
    }

    const userName = (input) => {
        setUser(input.target.value);
    }

    const sendValidation = () => {
        if (myPassword != null || user != null) {
            const data = { password: myPassword, userName: user }
            const config = { headers: { "Content-Type": "application/json" } };
            axios.post(baseUrl, data, config
            )
                .then((response) => {
                    if (response.data.result.token != null) {
                        localStorage.clear();
                        localStorage.setItem("token", response.data.result.token);
                        navigate("/");
                    }
                })
                .catch((error) => {

                    const status = error.response.status;
                    if (status === 403) {
                        setCustomError("Please validate your email")
                    }
                    console.log(error.response.status)

                    if (status === 401) {
                        setCustomError("Username or password was incorrect")
                    }
                })
        }
    }

    const resendVerification = () => {
        if (user) {

            const data = { email: user }
            const email = user;

            axios.post("https://localhost:6001/api/Auth/resend", data
            )
                .then((response) => {
                    const status = response.data.statusCode;
                    if (status === 200) {
                        console.log("success");
                    }
                    else {
                        //console.log("Something weird happened");
                    }
                })
                .catch((error) => {
                    const status = error.data.statusCode;
                    console.log(status);
                })
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Container >
                    {customError &&
                        <div className='danger'>
                            <Alert variant={"danger"}>
                                {customError}
                            </Alert>
                        </div>
                    }
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Row className="align-items-center">
                            <Col sm={{ span: 8 }}>
                                <Form.Control className='w-75' {...register("userName", { required: "Email Address is required" })} aria-invalid={errors.mail} onChange={userName} type="email" placeholder="Enter email" />
                                {errors.userName?.type === "pattern" && <p>Använd inga specialtecken</p>}

                            </Col>
                        </Row>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Row className="align-items-center">
                            <Col sm={{ span: 8 }}>
                                <Form.Control className='w-75' {...register("password", { required: true, minLength: 8, maxLength: 50 })} onChange={userPassword} type="password" placeholder="Password" />
                                {errors.password?.type === "required" && <p>Det här fältet är obligatoriskt</p>}
                                {errors.password?.type === "minLength" && <p>Det här fältet kräver minst 8 tecken</p>}
                                {errors.password?.type === "maxLength" && <p>Det här fältet klarar max 50 tecken</p>}

                            </Col >
                        </Row>

                    </Form.Group>


                    <Row>
                        <Col className='mb-2' sm={{ span: 8 }}>
                            <Button className='w-75' variant="primary" minLength={{}} type='submit'>Skicka</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mb-2' sm={{ span: 8 }}>
                            <Button className='w-75' as={Link} to="/Register">Registrera?</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mb-2' sm={{ span: 8 }}>
                            <Button className='w-75' as={Link} to="/resetpassword">Glömt lösenord?</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mb-2' sm={{ span: 8 }}>
                            <Button className='w-75' onClick={resendVerification}>Skicka Ny Email Verifiering</Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </div>
    )
}
export default LoginPage;
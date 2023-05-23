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

            console.log(user);
            console.log(data);
            axios.post("https://localhost:6001/api/Auth/resend", data
            )
                .then((response) => {
                    const status = response.data.status;
                    if (status === 200) {
                        console.log("success");
                    }
                    else {
                        console.log("Something weird happened");
                    }})
                .catch((error) => {
                    const status = error.data.status;
                    console.log(status);
                })
        }
    }


    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Container>
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
                            <Col lg={4} md={4} sm="auto" xs="auto">
                                <Form.Control {...register("userName", { required: "Email Address is required" })} aria-invalid={errors.mail} onChange={userName} type="email" placeholder="Enter email" />
                                {errors.userName?.type === "pattern" && <p>Please don't use any special signs</p>}

                            </Col>
                        </Row>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Row className="align-items-center">
                            <Col lg={4} md={4} sm="auto" xs="auto">
                                <Form.Control {...register("password", { required: true, minLength: 8, maxLength: 50 })} onChange={userPassword} type="password" placeholder="Password" />
                                {errors.password?.type === "required" && <p>This field is required</p>}
                                {errors.password?.type === "minLength" && <p>This field requires minimum 8 characters</p>}
                                {errors.password?.type === "maxLength" && <p>This field requires max 50 characters</p>}

                            </Col >
                        </Row>
                    </Form.Group>

                    <Col className='mb-3' md={{ span: 1 }}>
                        <Button variant="primary" type='submit'>
                            Skicka
                        </Button>
                    </Col>
                    <Col className='mb-3' md={{ span: 1 }}>
                        <Button as={Link} to="/Register">Registrera?</Button>
                    </Col>

                    <Col className='mb-3' md={{ span: 1 }}>
                        <Button as={Link} to="/resetpassword">Glömt ditt lösenord?</Button>
                    </Col>

                    <Col md={{ span: 3 }}>
                        <Button onClick={resendVerification}>Skicka Ny Mail Verifiering</Button>
                    </Col>
                </Container>
            </Form>
        </div>
    )
}
export default LoginPage;
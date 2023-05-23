/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { Col, Form, Row, Container, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Navigation from "../Shared/Navigation/Navigation";
import { Input } from "@mui/material";
import * as yup from 'yup';
import { useForm } from "react-hook-form"
import Alert from 'react-bootstrap/Alert';
import Footer from "../Shared/Footer/Footer";

function ResetPassword() {


    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors }
    } = useForm();


    const [saveEmail, setEmail] = useState(null);
    const [isEmailSaved, setEmailSaved] = useState(false);
    const baseUrl = "https://localhost:6001/api/Auth/resetpassword";
    const [isMailSent, mailSent] = useState(false);
    let schema = yup.object().shape({
        email: yup.string().email("Not a valid email address").isValid(),
    });


    const onSubmit = (data) => {
        postData(data);
    }
    const postData = (data) => {
        setEmail(data)
        setEmailSaved(true);
    }

    const responseHandler = (event) => {
        if(event.statusCode === 200){
            console.log(event);
            mailSent(true);
        }
    }

    const errorHandler = (event) => {
        console.log(event);
    }
    useEffect(() => {
        if (isEmailSaved) {
            // console.log(saveEmail.email)
            const data = {
                email: saveEmail.email
            }



            fetch(baseUrl, {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
                .then(response => response.json())
                .then(json => responseHandler(json))
                .catch(err => errorHandler(err));
        }
    }, [saveEmail]);




    return (
        <div>
            <div>
                <Navigation />
            </div>
            <div>
                {!isMailSent &&
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Container>
                            <h2>
                                Reset Password
                            </h2>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Row className="align-items-center">
                                    <Col lg={4} md={4} sm="auto" xs="auto">
                                        <Form.Control {...register("email", { required: true, email: true })} aria-invalid={errors.mail} type="email" placeholder="Enter email" />
                                        {errors.email?.type === "email"}
                                    </Col>
                                </Row>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Row>
                                <Col className='mb-3' md={{ span: 2 }}>
                                    <Input variant="primary" type="submit" />
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                }
                {isMailSent &&
                <div>
                     <Alert className="mt-5" key="info" variant="info">
                        Ett mail har skickats med en länk för att återställa ditt lösenord.
                    </Alert>
                </div>
                }
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default ResetPassword;
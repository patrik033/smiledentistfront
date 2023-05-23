/* eslint-disable no-unused-vars */
import { Col, Form, Row, Container, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Footer from "../Shared/Footer/Footer";
import Navigation from "../Shared/Navigation/Navigation";
import { useForm } from "react-hook-form"
import { Input } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();
    const [nav, setNav] = useState(false);
    const baseUrl = "https://localhost:6001/api/Auth/register";
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors }
    } = useForm();
    const onSubmit = (data) => {

        alert(JSON.stringify(data));
        postData(data);
    }

    useEffect(() => {
        if (nav) {
            navigate("/emailsent");
        }
    });


    const postData = (data) => {
        axios.post(baseUrl, data)
            .then((response) => {
                if (response.status === 200) {
                    setNav(true);
                }
            })
    }


    const formSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is mendatory')
            .min(8, 'Password must be at 8 char long'),
        confirmPassword: Yup.string()
            .required('Password is mendatory')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })

    const formOptions = { resolver: yupResolver(formSchema) };

    return (
        <div>
            <Navigation />
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Container>
                        <h2>
                            Register
                        </h2>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Name</Form.Label>
                            <Row className="align-items-center">
                                <Col lg={4} md={4} sm="auto" xs="auto">
                                    <Form.Control {...register("name", { required: true, minLength: 3, maxLength: 50 })} type="text" placeholder="First Name" />
                                    {errors.name?.type === "required" && <p>This field is required</p>}
                                    {errors.name?.type === "minLength" && <p>This field must be longer than 3 characters</p>}
                                    {errors.name?.type === "maxLength" && <p>This fild must be shorter than 50 characters</p>}
                                </Col >
                            </Row>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Row className="align-items-center">
                                <Col lg={4} md={4} sm="auto" xs="auto">
                                    <Form.Control {...register("userName", { required: "Email Address is required" })} aria-invalid={errors.mail} type="email" placeholder="Enter email" />

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
                                    <Form.Control {...register("password", { required: true, minLength: 8 })} type="password" placeholder="Password"
                                        className={`form-control ${errors.password ? "is-invalid" : ""}`} />
                                    <div className="invalid-feedback">{errors.password?.message}</div>
                                    {errors.password?.type === "required" && <p>This field is required</p>}
                                    {errors.password?.type === "minLength" && <p>This field must be longer than 8 characters</p>}
                                </Col >
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Repeat Password</Form.Label>
                            <Row className="align-items-center">
                                <Col lg={4} md={4} sm="auto" xs="auto">
                                    <Form.Control name="confirmPassword" {...register("confirmPassword", {
                                        required: true, minLength: 8, validate: (value) => {
                                            const { password } = getValues();
                                            return password === value || "Passwords should match!";
                                        }
                                    })}
                                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                        type="password" placeholder="Repeat Password" />
                                    {errors.confirmPassword?.type === "required" && <p>This field is required</p>}
                                    {errors.confirmPassword?.type === "minLength" && <p>This field must be longer than 8 characters</p>}
                                    <div className="invalid-feedback">{errors.repeatPassword?.message}</div>
                                </Col >
                            </Row>
                        </Form.Group>
                        <Row>
                            <Col className='mb-3' md={{ span: 2 }}>
                                <Input variant="primary" type="submit" />
                            </Col>

                        </Row>

                    </Container>

                </Form>
            </Container>
            <Footer />
        </div>
    )
}

export default Register;
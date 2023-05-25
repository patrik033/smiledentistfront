/* eslint-disable react-hooks/exhaustive-deps */
import UserNavigation from "../../Navigation/UserNavigation";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import jwtDecode from "jwt-decode";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserMenu from "./UserMenu";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function UserPassword() {

    const [user, setUser] = useState(null);
    const [isUpdate, setUpdated] = useState(false);
    const [isUser, userVarified] = useState(false);
    const [token, setToken] = useState(null);
    const [isShow, setShow] = useState(true);
    const [oldPassword, setOldPass] = useState(null)
    const [newPassword, setNewPassword] = useState(null);
    const [newRepeatPassword, setNewRepeatPassword] = useState(null);
    const [data, setData] = useState(null)
    const [dataConfirmed, setConfirmed] = useState(false)
    const baseUrl = "https://localhost:6001/api/Auth/updatePassword";
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token)
        const tokenDecrypted = jwtDecode(token)
        setUser(tokenDecrypted);
        userVarified(true);
    }, []);

    useEffect(() => {
        if (isUser) {

        }
    }, [isUser]);

    useEffect(() => {
        if (dataConfirmed) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            axios.post(baseUrl, data, config).then((response) => {
                if (response.status === 200) {
                    if (response.data.result) {
                        localStorage.removeItem("token");
                        localStorage.setItem("token", response.data.result);
                    }
                    setUpdated(true)
                }
            });
        }
    }, [dataConfirmed]);

    useEffect(() => {
        if (isUpdate) {
            navigate("/loggedinuser");
        }
    }, [isUpdate]);

    const clickHandler = () => {
        if (isShow) {
            setShow(false)
        }
        else {
            setShow(true)
        }
    }

    const oldPass = (event) => {
        setOldPass(event);
    }

    const newPass = (event) => {
        setNewPassword(event);
    }

    const newRepeat = (event) => {
        setNewRepeatPassword(event);
    }

    const submitData = (data) => {
        console.log(data)
        setData(data)
        setConfirmed(true);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (oldPassword && newPassword && newRepeatPassword) {
            const data = {
                OldPassword: oldPassword,
                NewPassword: newPassword,
                RepeatedPassword: newRepeatPassword,
                UserId: user.id,
            }
            submitData(data);
        }
    }

    return (
        <div>
            <UserNavigation />
            <Row>
                <Col lg={3} md={3} xl={3} xxl={3} >
                    <UserMenu />
                </Col>
                <Col lg={"auto"}>
                    {isUser &&
                        <Form onSubmit={(event) => submitHandler(event)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Gammalt Lösenord</Form.Label>
                                <Form.Control type={isShow ? "password" : "text"} placeholder="Ange ditt gamla lösenord" onChange={(event) => oldPass(event.target.value)} >

                                </Form.Control>
                                <Form.Text className="text-muted">
                                    Vi delar inte din data
                                </Form.Text>

                            </Form.Group>

                            <Form.Check
                                label={"Visa lösenord"}
                                type={"checkbox"}
                                onClick={clickHandler}
                            />
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Nytt Lösenord</Form.Label>
                                <Form.Control type="password" placeholder="Nytt Lösenord" onChange={(event) => newPass(event.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Bekräfta Nytt Lösenord</Form.Label>
                                <Form.Control type="password" placeholder="Bekräfta Nytt Lösenord" onChange={(event) => newRepeat(event.target.value)} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default UserPassword;
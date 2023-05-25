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

function UserName() {

    const baseUrl = "https://localhost:6001/api/Auth/updateName";
    const [user, setUser] = useState(null);
    const [jwtToken, setToken] = useState(null);
    const [isUser, userVarified] = useState(false);
    const [userName, setUserName] = useState(null);
    const [isNewNameSet, setNewName] = useState(false);
    const [isUserSet, userSet] = useState(false);
    const [isUpdated,setUpdated] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
        const tokenDecrypted = jwtDecode(token)
        setUser(tokenDecrypted);
        userVarified(true);
    }, []);

    useEffect(() => {
        if (isUser) {

        }
    }, [isUser]);

    useEffect(() => {
        if(isUpdated){
            navigate("/loggedinuser");
        }
    },[isUpdated]);

    useEffect(() => {
        if (isUserSet === true) {

            const config = {
                headers: { Authorization: `Bearer ${jwtToken}` },
            };

            const data = {
                NewName: userName,
                OldName: user.fullName,
                UserId: user.id,
            }

            axios.post(baseUrl, data, config).then((response) => {
                if(response.status === 200){
                    if(response.data.result){
                        localStorage.removeItem("token");
                        localStorage.setItem("token",response.data.result);
                    }
                    setUpdated(true);
                }
            });
        }
    }, [isUserSet]);

    const submitHandler = (event) => {
        event.preventDefault();
        if (isNewNameSet)
            userSet(true)
    }

    const userNameHandler = (event) => {
        event.preventDefault();
        setUserName(event.target.value)
        setNewName(true);
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
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Gammalt Namn</Form.Label>
                                <Form.Control type="text" disabled value={user.fullName} />
                                <Form.Text className="text-muted">
                                    Vi delar inte din data
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Nytt Namn</Form.Label>
                                <Form.Control type="text" placeholder="Nytt namn" onChange={(event) => userNameHandler(event)} />
                            </Form.Group>
                            <Button variant="primary" type="submit"  >
                                Submit
                            </Button>
                        </Form>
                    }
                </Col>
            </Row>
        </div>
    )
}
export default UserName;
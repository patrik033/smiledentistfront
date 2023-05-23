import UserNavigation from "../../Navigation/UserNavigation";
import UserBookings from "./UserBookings";
import Col from 'react-bootstrap/Col';
import Row from "react-bootstrap/Row"
import UserMenu from "./UserMenu";
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
function UserSection(props) {



    const [user, setUser] = useState(null);
    const [isUser, userVarified] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const tokenDecrypted = jwtDecode(token)
        setUser(tokenDecrypted);
        userVarified(true);
    }, []);

    useEffect(() => {
        if (isUser) {

        }
    }, [isUser]);



    return (
        <div>
            <UserNavigation />
            <Row>
                <Col lg={3} md={3} xl={3} xxl={3} className="">
                    <UserMenu />
                </Col>
                <Col>
                    {isUser &&
                        <div style={{margin:"10px"}}>

                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Namn</Form.Label>
                                    <Form.Control type="text" disabled value={user.fullName}  >
                                    </Form.Control>
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Användar Id</Form.Label>
                                    <Form.Control type="text" disabled value={user.id} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" disabled value={user.email} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Roll</Form.Label>
                                    <Form.Control type="text" disabled value={user.role} />
                                </Form.Group>
                            </Form>
                        </div>
                    }
                </Col>
            </Row>

            <Row>
                <Col className="me-3">
                    <h2>Dina Bokade Tider:</h2>
                    <UserBookings user={props} />
                </Col>

            </Row>
        </div>
    )
}

export default UserSection;
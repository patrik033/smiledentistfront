/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import axios from "axios";
function UsersDropdown(props) {

    const baseUrl = "https://localhost:6001/api/Booking/Users";
    const[users,setUsers] = useState(null);
    const[isValid,setValid] = useState(false)
    const[userValid,userSet] = useState(false);
    const[userName,userNameSet] = useState(null);

    const updateValue = (event) => {
        if(event.target.value != "Open this select menu"){
            userNameSet(event.target.value);
            userSet(true)
        }
    }
    
    useEffect(() => {
        
        const storage = localStorage.getItem("token");
        const config = {
            headers: {Authorization: `Bearer ${storage}`},
    
        };
        axios.get(baseUrl,config).then(response => {
            setUsers(response.data)
            setValid(true);
        });
    },[])

    useEffect(() => {
            props.userValue(userName);
    },[userName]);



    return (
        <div>
            {isValid &&
            <Container fluid>
                <Row className="justify-content-md-left">
                    <Col md="auto">
                        <Form.Select onChange={updateValue} aria-label="Default select example">
                            <option>Öppna menyn</option>
                            {users.map((someuser,i) => 
                                <option key={i} value={JSON.stringify(someuser)}>
                                    {someuser.userName}
                                </option>
                            )}
                        </Form.Select>
                    </Col>
                </Row>
            </Container>
            }
        </div>
    )
}
export default UsersDropdown;
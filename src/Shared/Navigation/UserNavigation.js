/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Navigation.css";
import { Container } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LogedInUser from "../../User/LogedInUser"

function UserNavigation(props){

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [robin,robinState] = useState(null);
    
    
    useEffect(() => {
        const userToken = localStorage.getItem("token");
        
        if (userToken) {
            setIsLoggedIn(true)
            setToken(userToken)
        }
        
    },[])

    const handleLogOut = () => {
        if (isLoggedIn) {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            navigate("/");
        }
    }

    return (
        <div>
            <div style={{ marginBottom: "12px" }}>
                <Navbar expand="sm" sticky="top" className={{}} bg="dark" variant="dark">
                    <Container>
                        <Nav activeKey={"/"} variant="pills" className="me-auto">
                            <NavLink to="/" ></NavLink>
                            <Nav.Link  className="button text-white" as={Link} to="/">Home</Nav.Link>
                        </Nav>
                    </Container>
                    
                    {isLoggedIn &&
                        <Container>
                            <div className="text-white" >
                                <LogedInUser isLogged={isLoggedIn} userToken={token}  />
                            </div>
                            <div className="d-flex ms-1" style={{ marginLeft: "auto" }}>

                                <li className="nav-item pt-1">
                                    <button
                                        className="btn btn-success btn-outlines rounded-pill text-white mx-2"
                                        style={{
                                            border: "none",
                                            height: "40px",
                                            width: "100px"
                                        }}
                                        onClick={handleLogOut}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </div>
                        </Container>
                    }
                </Navbar>
            </div>
        </div>
    );
}
export default UserNavigation;
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Navigation from "../Shared/Navigation/Navigation";
import Footer from "../Shared/Footer/Footer";
function RegisterConfirmation() {


    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);
    const [isBothSet, setBoth] = useState(false);
    const [isEmailAuthorized, authorizeEmail] = useState(false);
    const location = useLocation();
    const [isExpired, setExpired] = useState(false);

    const tokenRetrieved = new URLSearchParams(useLocation().search).get("activationToken");
    const emailRetrieved = new URLSearchParams(useLocation().search).get("email");

    useEffect(() => {
        if (tokenRetrieved != null || emailRetrieved != null) {
            setToken(tokenRetrieved);
            setEmail(emailRetrieved);
        }
    }, [tokenRetrieved && emailRetrieved]);


    useEffect(() => {
        if (email != null || token != null) {
            setBoth(true);
        }
    }, [email != null || token != null]);
    

    useEffect(() => {
        if (isBothSet) {

            axios.get(`https://localhost:6001/api/Auth?email=${email}&activationToken=${token}`)
                .then(response => {
                    // console.log(response)
                    if (response.status === 200) {
                        authorizeEmail(true);
                    }
                }).catch(function(error)  {
                    
                    if (error.response) {
                        const status = error.response.status;
                        if (status === 401) {
                            console.log(status)
                            setExpired(true);
                        }
                        else {
                            console.log(error);
                        }
                    }
                });

        }
    }, [isBothSet])

    return (
        <div>
            <Navigation />
            {isEmailAuthorized &&
                <div style={{
                    justifySelf: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                }}>
                    <Alert className="mt-5" key="info" variant="info">
                        Your mail has be validated
                        <Alert.Link className="ms-3" href="/login">Use the link to navigate to the login page</Alert.Link>. Give it a click if
                        you like.
                    </Alert>
                </div>
            }
            {!isEmailAuthorized && !isExpired &&
                <div style={{
                    justifySelf: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                }} className="mt-5">
                    Waiting for confirmation  <Spinner className="ms-3" animation="border" />
                </div>
            }
            {isExpired &&
                <div>
                    <Alert className="mt-5" key="info" variant="info">
                        Your confirmation link has expired
                        <Alert.Link className="ms-3" href="/login">Use the link to navigate to the login page for a refresh link</Alert.Link>
                    </Alert>
                </div>
            }
            <Footer/>
        </div>
    )
}

export default RegisterConfirmation;
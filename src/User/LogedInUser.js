import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
function LogedInUser(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const userToken = localStorage.getItem("token");
        if (userToken) {
            setToken(jwt_decode(userToken));
        }
    }, [])

    useEffect(() => {
        setIsLoggedIn(true);
    }, [token]);

    return (
        <>
            {isLoggedIn &&
                <div>
                    <span>
                    <Nav.Link className="button text-white" as={Link} to="/loggedinuser">Välkommen {token.email}</Nav.Link>
                    </span>
                </div>
            }
            {!isLoggedIn &&
                <div>
                </div>
            }
        </>
    )
}
export default LogedInUser;





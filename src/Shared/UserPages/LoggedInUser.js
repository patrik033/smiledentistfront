/* eslint-disable no-unused-vars */
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from 'react';
import AdminSection from "./Admin/Appointments/AdminSection";
import UserSection from './User/UserSection';

function LoggedInUser() {

    const [token, setToken] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [user, setUser] = useState(false);
    const [adminData, setAdminData] = useState(null);
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        const userToken = localStorage.getItem("token");
        if (userToken) {
            setToken(jwt_decode(userToken));
        }
    }, [])

    useEffect(() => {
        if (token != null) {
            if (token.role === "Admin") {
                setAdminData(token);
            }
            else {
                setUserData(token);
            }
        }
    }, [token]);


    return (
        <div>
            <div>
                {adminData != null &&
                    <div>
                        <AdminSection name={token.fullName} userId={token.id} email={token.email} userRole={token.role} />
                    </div>
                }
                {userData != null &&
                    <div>
                        <UserSection name={token.fullName} userId={token.id} email={token.email} userRole={token.role} />
                    </div>
                }
            </div>
        </div>
    )
}

export default LoggedInUser;
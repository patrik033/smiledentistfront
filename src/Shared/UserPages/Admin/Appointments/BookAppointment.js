import AdminNavigation from "../../../Navigation/AdminNavigation";
import UsersDropdown from "./UsersDropdown";
import React, { useState } from "react";
import AdminAppointmentBooker from "./AdminAppointmentBooker";
import { Container } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';

function BookAppointment() {

    const [user, setUser] = useState(null);

    const AppointmentValue = (userName) => {
        if (userName != null) {
            const objectSer = JSON.parse(userName);
            setUser(objectSer);
        }
    }

    return (
        <div>
            <AdminNavigation />
            <UsersDropdown userValue={AppointmentValue} />
            {user != null &&
                <Container>
                    <AdminAppointmentBooker userData={user} />
                </Container>
            }
            {user === null &&
                <div>
                    <Container fluid>
                        <Alert className="mt-4 ms-auto" variant="danger">
                            Please select a user
                        </Alert>
                    </Container>
                </div>
            }
        </div>
    )
}
export default BookAppointment;
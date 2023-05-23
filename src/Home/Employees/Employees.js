/* eslint-disable no-unused-vars */
import Footer from "../../Shared/Footer/Footer";
import StaffList from "../../Staff/StaffList";
import { Container } from "react-bootstrap";
import "./Employee.css";


function Employees() {
    return <div className="d-flex justify-content-between flex-wrap">
        <Container>
            <StaffList />
        </Container>
        <Footer />
    </div>
}
export default Employees;
import Navigation from "../Shared/Navigation/Navigation";
import Footer from "../Shared/Footer/Footer";
import StaffList from "./StaffList";
import { Container } from "react-bootstrap";
function Staff() {

    return (
        <div>
            <Navigation />
            <Container>
                <h1>Personal</h1>
            </Container>
            <Container>
                <StaffList />
            </Container>
            <Footer />
        </div>
    )
}

export default Staff;
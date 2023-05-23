import Navigation from "../Shared/Navigation/Navigation";
import Footer from "../Shared/Footer/Footer";
import StaffList from "./StaffList";
import { Container } from "react-bootstrap";
function Staff() {

    return (
        <div>
            <Navigation />
            <h1>Välkommen till personal</h1>
            <Container>
                <StaffList />
            </Container>
            <Footer />
        </div>
    )
}

export default Staff;
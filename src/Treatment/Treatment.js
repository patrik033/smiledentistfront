import Navigation from "../Shared/Navigation/Navigation";
import Footer from "../Shared/Footer/Footer";
import TreatmentList from "./TreatmentList";
import { Container } from "react-bootstrap";
function Treatment() {
    return (
        <div>
            <Navigation />
            <Container>
                <h1>
                    Behandlingar
                </h1>
            </Container>
            <Container>
                <TreatmentList />
            </Container>
            <Footer />
        </div>
    )
}

export default Treatment;
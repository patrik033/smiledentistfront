import Navigation from "../Shared/Navigation/Navigation";
import Footer from "../Shared/Footer/Footer";
import TreatmentList from "./TreatmentList";
import { Container } from "react-bootstrap";
function Treatment() {
    return (
        <div>
            <Navigation />
            <h1>
                Välkommen till behandlingar
            </h1>
            <Container>
                <TreatmentList />
            </Container>
            <Footer />
        </div>
    )
}

export default Treatment;
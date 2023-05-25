import Navigation from "../Shared/Navigation/Navigation";
import Footer from "../Shared/Footer/Footer";
import { Container } from "react-bootstrap";
import LoginPage from "./LoginPage";
function Login() {
    return (
        <div>
            <Navigation />
            <Container>
                <h1>Logga In</h1>
            </Container>
            <Container>
                <LoginPage />
            </Container>
            <Footer />
        </div>
    )
}

export default Login;
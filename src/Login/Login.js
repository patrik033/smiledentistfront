import Navigation from "../Shared/Navigation/Navigation";
import Footer from "../Shared/Footer/Footer";
import { Container } from "react-bootstrap";
import LoginPage from "./LoginPage";
function Login() {
    return (
        <div>
            <Navigation />
            <h1>Hello from Login</h1>
            <Container>
                <LoginPage/>
            </Container>
            <Footer />
        </div>
    )
}

export default Login;
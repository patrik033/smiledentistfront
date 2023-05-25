import Information from "./Information/Information";
import { Container, Row } from "react-bootstrap";
import Employees from "./Employees/Employees";
import DentalCares from "./DentalCare/DentalCares";
import AboutUs from "./AboutUs/AboutUs";
import Testimonials from "./Testimonials/Testimonials";
import FindUs from "./FindUs/FindUs";
// import Footer from "../Shared/Footer/Footer";


function Home() {


  return (
    <div>

      <Information />
      <Container>
        <Row>
          <Employees />
        </Row>
      </Container>
      <div>
        <div style={{ marginTop: "10px", marginBottom: "10px", marginLeft: "1%", marginRight: "1%" }}>
          <section id="contact-form" className="p-1 bg-dark text-white">
          </section>
        </div>
      </div>
      <Container>
        <Row>
          <DentalCares />
        </Row>
      </Container>
      <Container>
        <Row>
          <AboutUs />
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Testimonials />
        </Row>
      </Container>
      <Container fluid>
          <Row>
            <FindUs />
          </Row>
      </Container>
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
import { Container } from "react-bootstrap";


function FindUs() {
    return (
        <div>
            <div style={{ marginTop: "10px", marginBottom: "95px" }}>
                <section id="contact-form" className="p-4 bg-dark text-white">
                    <Container>
                        <h2 className="text-center">Hitta Till Oss</h2>
                    </Container>
                </section>
            </div>
            <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                <section className="p-1 bg-dark">
                    <Container>
                        <h2 className="text-center">Centrerad</h2>
                    </Container>
                </section>
            </div>
        </div>
    )
}
export default FindUs;
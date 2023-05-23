import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Column from "react-bootstrap/Col"
import React from "react";
import {
    FooterLink,
    Heading,
} from "./FooterStyle";

function Footer() {
    return (

            <div className="  text-center p-3 bg-dark text-white" style={{bottom: "0",left:"0",right:"0",position:"fixed",zIndex:"99"}} >
                <div className='mb-3'>
                    &copy;Made with   <i className="bi bi-heart-fill"></i> by Patrik
                </div>
                <Container>
                    <Row>
                        <Column>
                            <Heading>About Us</Heading>
                            <Row>
                                <FooterLink href="/treatment">Behandlingar</FooterLink>
                            </Row>
                        </Column>
                        <Column>
                            <Heading>Staff</Heading>
                            <Row>
                                <FooterLink className="me-3" href="/staff">Personal</FooterLink>
                            </Row>
                        </Column>
                        <Column>
                            <Heading>Öppettider</Heading>
                            <Row>
                                <FooterLink>
                                  07.00 - 17.00
                                </FooterLink>
                            </Row>
                            <Row>
                                <FooterLink>
                                    Måndag - Fredag
                                </FooterLink>
                            </Row>
                        </Column>
                    </Row>
                </Container>
            </div>
    );
}

export default Footer;
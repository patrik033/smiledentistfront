import React from "react";
import {
    AppBar,
    Button,
} from "@mui/material";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";


function UserMenu() {


    return (
        <div>
            <AppBar className="bg-white" position="static">
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }} >
                        <Button>
                            <Nav.Link as={Link} to="/loggedinuser" className="text-dark text-decoration-none">
                                Huvudsida
                            </Nav.Link >
                        </Button>
                        <Button>
                            <Nav.Link as={Link} to="/useremail" className="text-dark text-decoration-none" >
                                Uppdatera Mailen
                            </Nav.Link >
                        </Button>
                        <Button>
                            <Nav.Link as={Link} to="/username" className="text-dark text-decoration-none" >
                                Uppdatera Namn
                            </Nav.Link >
                        </Button>
                        <Button>
                            <Nav.Link as={Link} to="/userpassword" className="text-dark text-decoration-none" >
                                Uppdatera Lösenord
                            </Nav.Link>
                        </Button>
                    </div>
            </AppBar>
        </div>
    )
}

export default UserMenu;
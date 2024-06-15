import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import '../css/categories.css'

function categories() {
    return (
        <Navbar>
            <Container className="categories-con">
                <NavDropdown title="ALL ITEMS " className="all-cate">
                    <NavDropdown.Item href="#action/3.1">Electronic</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Camera & Accessories</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Headphones</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Fashion</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Smart Watch</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Mobiles</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Grocery</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">More</NavDropdown.Item>
                </NavDropdown>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <a href="/listoflap" className="nav-itmes">LAPTOP</a>
                        <a href="/listofmob"  className="nav-itmes">MOBILE</a>
                        <a href="/Listofheadphone" className="nav-itmes">MONITOR</a>
                        <a href="#home" className="nav-itmes">HEADPHONES</a>
                        <a href="#home" className="nav-itmes">KEYBOARD</a>
                        <a href="#home" className="nav-itmes">MOUSE</a>
                        <a href="#home" className="nav-itmes">TV</a>
                        <a href="#home" className="nav-itmes">FASHION</a>
                        <a href="#home" className="nav-itmes">COMPUTER</a>
                        <a href="#home" className="nav-itmes">SPEAKER'S</a>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default categories;

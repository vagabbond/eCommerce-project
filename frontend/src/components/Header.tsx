import { FC } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";

export const Header: FC = () => {
 return (
  <header>
   <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
    <Container>
     <LinkContainer to={"/"}>
      <Navbar.Brand>
       <img src={logo} alt="Shop" />
       Shop
      </Navbar.Brand>
     </LinkContainer>
     <Navbar.Toggle />
     <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
       <LinkContainer to="/cart">
        <Nav.Link>
         <FaShoppingCart />
         Cart
        </Nav.Link>
       </LinkContainer>
       <LinkContainer to="/login">
        <Nav.Link>
         <FaUser />
         Login
        </Nav.Link>
       </LinkContainer>
      </Nav>
     </Navbar.Collapse>
    </Container>
   </Navbar>
  </header>
 );
};

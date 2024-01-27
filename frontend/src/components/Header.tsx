import { FC } from "react";
import { Nav, Navbar, Container, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useAppSelector } from "../redux/store";
import logo from "../assets/logo.png";

export const Header: FC = () => {
 const { cartItems } = useAppSelector((state) => state.cart);
 const qtyInCart = cartItems.reduce((acc, item) => acc + item.qty, 0);
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
         Cart{" "}
         {qtyInCart > 0 ? (
          <Badge pill bg="success" style={{ marginLeft: "5px" }}>
           {qtyInCart}
          </Badge>
         ) : null}
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

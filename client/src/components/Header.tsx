import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, Container, Badge, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { useLogoutMutation } from "../redux/slice/userApiSlice";
import { logout } from "../redux/slice/authSlice";
import logo from "../assets/logo.png";
import { IError } from "../interfaces/Error";
import { toast } from "react-toastify";
import { SearchBox } from "./SearchBox";

export const Header: FC = () => {
 const { cartItems } = useAppSelector((state) => state.cart);
 const { userInfo } = useAppSelector((state) => state.auth);
 const qtyInCart = cartItems.reduce((acc, item) => acc + item.qty, 0);
 const navigate = useNavigate();
 const dispatch = useAppDispatch();
 const [logoutApiCall] = useLogoutMutation();

 const logoutHandler = async () => {
  try {
   await logoutApiCall({}).unwrap();
   dispatch(logout());
   navigate("/login");
  } catch (error) {
   const typedError = error as IError;
   toast.error(typedError.data.message);
  }
 };
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
       <SearchBox />
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
       {userInfo ? (
        <NavDropdown title={userInfo.name}>
         <LinkContainer to="/profile">
          <NavDropdown.Item>Profile</NavDropdown.Item>
         </LinkContainer>
         <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
        </NavDropdown>
       ) : (
        <LinkContainer to="/login">
         <Nav.Link>
          <FaUser />
          Login
         </Nav.Link>
        </LinkContainer>
       )}
       {userInfo && userInfo.isAdmin && (
        <NavDropdown title="Admin">
         <LinkContainer to="/admin/userlist">
          <NavDropdown.Item>Users</NavDropdown.Item>
         </LinkContainer>
         <LinkContainer to="/admin/productlist">
          <NavDropdown.Item>Products</NavDropdown.Item>
         </LinkContainer>
         <LinkContainer to="/admin/orderlist">
          <NavDropdown.Item>Orders</NavDropdown.Item>
         </LinkContainer>
        </NavDropdown>
       )}
      </Nav>
     </Navbar.Collapse>
    </Container>
   </Navbar>
  </header>
 );
};

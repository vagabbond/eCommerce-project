import { FC } from "react";

import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface IProps {
 step1?: boolean;
 step2?: boolean;
 step3?: boolean;
 step4?: boolean;
}

export const CheckoutSteps: FC<IProps> = ({ step1, step2, step3, step4 }) => {
 return (
  <Nav className="justify-content-center mb-4">
   {step1 ? (
    <LinkContainer to="login">
     <Nav.Link>Sing In</Nav.Link>
    </LinkContainer>
   ) : (
    <Nav.Link disabled>Sing In</Nav.Link>
   )}
   {step2 ? (
    <LinkContainer to="shipping">
     <Nav.Link>Shipping</Nav.Link>
    </LinkContainer>
   ) : (
    <Nav.Link disabled>Shipping</Nav.Link>
   )}
   {step3 ? (
    <LinkContainer to="payment">
     <Nav.Link>Payment</Nav.Link>
    </LinkContainer>
   ) : (
    <Nav.Link disabled>Payment</Nav.Link>
   )}
   {step4 ? (
    <LinkContainer to="/placeorder">
     <Nav.Link>Place order</Nav.Link>
    </LinkContainer>
   ) : (
    <Nav.Link disabled>Place order</Nav.Link>
   )}
  </Nav>
 );
};

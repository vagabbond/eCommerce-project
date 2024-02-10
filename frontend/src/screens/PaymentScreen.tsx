import { FC, FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { FormContainer } from "../components/FormContainer";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { savePayment } from "../redux/slice/cartSlice";
import { CheckoutSteps } from "../components/CheckoutSteps";

export const PaymentScreen: FC = () => {
 const [paymentMethod, setPaymentMethod] = useState<string>("PayPal");
 const { shippingAddress } = useAppSelector((state) => state.cart);

 const navigate = useNavigate();
 const dispatch = useAppDispatch();

 useEffect(() => {
  if (!shippingAddress) {
   navigate("/shipping");
  }
 }, [shippingAddress, navigate]);

 const submitHandler = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  dispatch(savePayment(paymentMethod));
  navigate("/placeorder");
 };
 return (
  <FormContainer>
   <CheckoutSteps step1 step2 step3 />
   <h1>Payment Method </h1>

   <Form onSubmit={submitHandler}>
    <Form.Group controlId="address" className="my-2">
     <Form.Label as="legend">Select Method</Form.Label>
     <Col>
      <Form.Check
       type="radio"
       className="my-2"
       label="PayPal or Credit Card"
       value={paymentMethod}
       onChange={(e) => setPaymentMethod(e.target.value)}
      ></Form.Check>
     </Col>
    </Form.Group>
    <Button type="submit" variant="primary" className="my-2">
     Continue
    </Button>
   </Form>
  </FormContainer>
 );
};

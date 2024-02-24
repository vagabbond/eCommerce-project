import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { CheckoutSteps } from "../components/CheckoutSteps";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { useCreateOrderMutation } from "../redux/slice/orderApiSlice";
import { clearCartItems } from "../redux/slice/cartSlice";
import { IError } from "../interfaces/Error";

export const PlaceOrderScreen: FC = () => {
 const navigate = useNavigate();
 const dispatch = useAppDispatch();

 const {
  cartItems,
  shippingAddress,
  paymentMethod,
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
 } = useAppSelector((state) => state.cart);
 const [createOrder, { isLoading, error }] = useCreateOrderMutation();
 const typedError = error as IError;

 useEffect(() => {
  if (!shippingAddress.address) {
   navigate("/shipping");
  } else if (!paymentMethod) {
   navigate("/payment");
  }
 }, [navigate, shippingAddress.address, paymentMethod]);

 const placeOrderHandler = async () => {
  try {
   const res = await createOrder({
    orderItems: cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
   }).unwrap();
   dispatch(clearCartItems());
   navigate(`/order/${res._id}`);
  } catch (error) {
   const typedError = error as IError;
   toast.error(typedError.data.message);
  }
 };

 return (
  <>
   <CheckoutSteps step1 step2 step3 step4 />
   <Row>
    <Col md={8}>
     <ListGroup variant="flush">
      <ListGroup.Item>
       <h2>Shipping</h2>
       <p>
        <strong>
         {shippingAddress.address},{shippingAddress.city}{" "}
         {shippingAddress.postalCode}, {shippingAddress.country}
        </strong>
       </p>
      </ListGroup.Item>
      <ListGroup.Item>
       <h2>Payment Mehtod</h2>
       <strong>Method:</strong>
       {paymentMethod}
      </ListGroup.Item>
      <ListGroup.Item>
       <h2>Order Items</h2>
       {cartItems.length === 0 ? (
        <Message variant="info">Your cart is empty</Message>
       ) : (
        <ListGroup variant="flush">
         {cartItems.map((item) => (
          <ListGroup.Item key={item._id}>
           <Row>
            <Col md={1}>
             <Image src={`${item.image}`} fluid rounded alt={item.name} />
            </Col>
            <Col>
             <Link to={`/product/${item._id}`}>{item.name}</Link>
            </Col>
            <Col md={4}>
             {item.qty} x ${item.price} = ${item.qty * item.price}
            </Col>
           </Row>
          </ListGroup.Item>
         ))}
        </ListGroup>
       )}
      </ListGroup.Item>
     </ListGroup>
    </Col>
    <Col md={4}>
     <Card>
      <ListGroup variant="flush">
       <ListGroup.Item>
        <h2>Order Summary</h2>
       </ListGroup.Item>
       <ListGroup.Item>
        <Row>
         <Col>Items:</Col>
         <Col>${itemsPrice}</Col>
        </Row>
       </ListGroup.Item>
       <ListGroup.Item>
        <Row>
         <Col>Shipping:</Col>
         <Col>${shippingPrice}</Col>
        </Row>
       </ListGroup.Item>
       <ListGroup.Item>
        <Row>
         <Col>Tax:</Col>
         <Col>${taxPrice}</Col>
        </Row>
       </ListGroup.Item>
       <ListGroup.Item>
        <Row>
         <Col>Total:</Col>
         <Col>${totalPrice}</Col>
        </Row>
       </ListGroup.Item>
       {typedError && (
        <ListGroup.Item>
         <Message variant="error">{typedError.data.message}</Message>
        </ListGroup.Item>
       )}
       <ListGroup.Item>
        <Button
         type="button"
         className="bnt-block"
         disabled={cartItems.length === 0}
         onClick={placeOrderHandler}
        >
         Place Order
        </Button>
        {isLoading && <Loader />}
       </ListGroup.Item>
      </ListGroup>
     </Card>
    </Col>
   </Row>
  </>
 );
};

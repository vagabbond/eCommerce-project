import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
 Row,
 Col,
 ListGroup,
 Image,
 Form,
 Button,
 Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { Message } from "../components/Message";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { addToCart, removeFromCart } from "../redux/slice/cartSlice";
import { IProduct } from "../interfaces/Product";

export const CartScreen: FC = () => {
 const dispatch = useAppDispatch();
 const { cartItems, itemsPrice } = useAppSelector((state) => state.cart);
 const navigate = useNavigate();

 const addToCartHandler = async (product: IProduct, qty: number) => {
  dispatch(addToCart({ ...product, qty }));
 };
 const removeFromCartHandler = async (id: string) => {
  dispatch(removeFromCart(id));
 };

 const checkoutHandler = () => {
  navigate("/login?redirect=/shipping");
 };
 return (
  <Row>
   <Col md={8}>
    <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
    {cartItems.length === 0 ? (
     <Message variant="info">
      Your cart is empty <Link to="/">Get Back</Link>
     </Message>
    ) : (
     <ListGroup variant="flush">
      {cartItems.map((item) => (
       <ListGroup.Item key={item._id}>
        <Row>
         <Col md={2}>
          <Image
           src={`/src/assets${item.image}`}
           alt={item.name}
           fluid
           rounded
          />
         </Col>
         <Col md={3}>
          <Link to={`/product/${item._id}`}>{item.name}</Link>
         </Col>
         <Col md={2}>${item.price}</Col>
         <Col md={2}>
          <Form.Control
           as="select"
           value={item.qty}
           onChange={(e) => addToCartHandler(item, Number(e.target.value))}
          >
           {[...Array(item.countInStock).keys()].map((item) => (
            <option key={item + 1} value={item + 1}>
             {item + 1}
            </option>
           ))}
          </Form.Control>
         </Col>
         <Col md={2}>
          <Button
           type="button"
           variant="light"
           onClick={() => removeFromCartHandler(item._id)}
          >
           <FaTrash />
          </Button>
         </Col>
        </Row>
       </ListGroup.Item>
      ))}
     </ListGroup>
    )}
   </Col>
   <Col md={4}>
    <Card>
     <ListGroup variant="flush">
      <ListGroup.Item>
       <h2>
        Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
       </h2>
       ${itemsPrice}
      </ListGroup.Item>
      <ListGroup.Item>
       <Button
        type="button"
        className="btn-block"
        disabled={cartItems.length === 0}
        onClick={() => checkoutHandler()}
       >
        Procced To Checkout
       </Button>
      </ListGroup.Item>
     </ListGroup>
    </Card>
   </Col>
  </Row>
 );
};

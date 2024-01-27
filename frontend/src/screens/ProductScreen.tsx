import { FC, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
 Row,
 Col,
 Image,
 ListGroup,
 Card,
 Button,
 Form,
} from "react-bootstrap";
import { useGetProductDetailsQuery } from "../redux/slice/productsApiSlice";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { Raiting } from "../components/Raiting";
import { addToCart } from "../redux/slice/cartSlice";
import { useAppDispatch } from "../redux/store";

export const ProductScreen: FC = () => {
 const { id: productId } = useParams();
 const [qty, setQty] = useState<number>(1);
 //TODO create normal back link
 //TODO add more info about error in message
 const location = useLocation();
 const navigate = useNavigate();
 console.log(location);
 const data = useGetProductDetailsQuery(productId);
 const { data: product, isLoading, isError } = data;
 const dispatch = useAppDispatch();

 const addToCartHandler = () => {
  dispatch(
   addToCart({
    ...product,
    qty,
   })
  );
  navigate("/cart");
 };
 return (
  <>
   <Link className="btn btn-light my-3" to="/">
    Go Back
   </Link>
   {isLoading ? (
    <Loader />
   ) : isError ? (
    <Message variant="danger">Something went wrong</Message>
   ) : (
    <Row>
     <Col md={5}>
      <Image src={`/src/assets/${product.image}`} alt={product.name} fluid />
     </Col>
     <Col md={4}>
      <ListGroup variant="flush">
       <ListGroup.Item>{product.name}</ListGroup.Item>
       <ListGroup.Item>
        <Raiting
         value={product.rating}
         text={`${product.numReviews} reviews`}
        />
       </ListGroup.Item>
       <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
       <ListGroup.Item>Description: {product.description}</ListGroup.Item>
      </ListGroup>
     </Col>
     <Col md={3}>
      <Card>
       <ListGroup variant="flush">
        <ListGroup.Item>
         <Row>
          <Col>Price:</Col>
          <Col>
           <strong>${product.price}</strong>
          </Col>
         </Row>
        </ListGroup.Item>
        <ListGroup.Item>
         <Row>
          <Col>Status:</Col>
          <Col>
           <strong>
            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
           </strong>
          </Col>
         </Row>
        </ListGroup.Item>
        {product.countInStock > 0 ? (
         <ListGroup.Item>
          <Row>
           <Col>Quantity</Col>
           <Col>
            <Form.Control
             as="select"
             value={qty}
             onChange={(e) => setQty(Number(e.target.value))}
            >
             {[...Array(product.countInStock).keys()].map((item) => (
              <option key={item + 1} value={item + 1}>
               {item + 1}
              </option>
             ))}
            </Form.Control>
           </Col>
          </Row>
         </ListGroup.Item>
        ) : null}
        <ListGroup.Item>
         <Button
          className="btn-block"
          type="button"
          disabled={product.countInStock === 0}
          onClick={() => addToCartHandler()}
         >
          Add To Cart
         </Button>
        </ListGroup.Item>
       </ListGroup>
      </Card>
     </Col>
    </Row>
   )}
  </>
 );
};

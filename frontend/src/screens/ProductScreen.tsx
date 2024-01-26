import { FC } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { useGetProductDetailsQuery } from "../redux/slice/productsApiSlice";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { Raiting } from "../components/Raiting";

export const ProductScreen: FC = () => {
 const { id: productId } = useParams();
 //TODO create normal back link
 //TODO add more info about error in message
 const location = useLocation();
 console.log(location);
 const data = useGetProductDetailsQuery(productId);
 const { data: product, isLoading, isError } = data;
 console.log(data);
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
        <ListGroup.Item>
         <Button
          className="btn-block"
          type="button"
          disabled={product.countInStock === 0}
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

import { FC, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Raiting } from "../components/Raiting";
import { IProduct } from "../interfaces/Product";

export const ProductScreen: FC = () => {
 const { id: productId } = useParams();
 //TODO create normal back link
 const location = useLocation();
 console.log(location);
 const [product, setProducts] = useState<IProduct | undefined>();
 useEffect(() => {
  const fetchData = async () => {
   const { data } = await axios.get(
    `http://localhost:8000/api/products/${productId}`
   );
   setProducts(data);
  };
  fetchData();
 }, [productId]);

 return (
  <>
   <Link className="btn btn-light my-3" to="/">
    Go Back
   </Link>
   {product && (
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

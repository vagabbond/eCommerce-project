import { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { IProduct } from "../interfaces/Product";
import { Raiting } from "./Raiting";

interface IProps {
 product: IProduct;
}

export const Product: FC<IProps> = ({ product }) => {
 return (
  <Card className="my-3 p-3 rounded">
   <Link to={`/product/${product._id}`}>
    <Card.Img src={`/src/assets${product.image}`} variant="top" />
   </Link>
   <Card.Body>
    <Link to={`/product/${product._id}`}>
     <Card.Title as="div" className="product-title">
      <strong>{product.name}</strong>
     </Card.Title>
    </Link>
    <Card.Text as="div">
     <Raiting value={product.rating} text={`${product.numReviews} reviews`} />
    </Card.Text>
    <Card.Text as="h3">${product.price}</Card.Text>
   </Card.Body>
  </Card>
 );
};
import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { Product } from "../components/Product";
import { IProduct } from "../interfaces/Product";

export const HomeScreen: FC = () => {
 const [products, setProducts] = useState<IProduct[]>([]);
 useEffect(() => {
  const fetchData = async () => {
   const { data } = await axios.get("http://localhost:8000/api/products");
   setProducts(data);
  };
  fetchData();
 }, []);

 return (
  <>
   <Row>
    {products &&
     products.map((product: IProduct) => (
      <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
       <Product product={product} />
      </Col>
     ))}
   </Row>
  </>
 );
};

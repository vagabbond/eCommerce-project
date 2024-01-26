import { FC } from "react";
import { Row, Col } from "react-bootstrap";
import { Product } from "../components/Product";
import { IProduct } from "../interfaces/Product";
import { useGetProductsQuery } from "../redux/slice/productsApiSlice";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";

export const HomeScreen: FC = () => {
 const { data: products, isLoading, isError } = useGetProductsQuery("Product");
 return (
  <>
   {isLoading ? (
    <Loader />
   ) : isError ? (
    <Message variant="danger">""</Message>
   ) : (
    <Row>
     {products &&
      products.map((product: IProduct) => (
       <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
        <Product product={product} />
       </Col>
      ))}
    </Row>
   )}
  </>
 );
};

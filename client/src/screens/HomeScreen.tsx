import { FC } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Product } from "../components/Product";
import { IProduct } from "../interfaces/Product";
import { useGetProductsQuery } from "../redux/slice/productsApiSlice";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { IError } from "../interfaces/Error";
import { Paginate } from "../components/Paginate";
import { ProductCarousel } from "../components/ProductCarousel";
import { Meta } from "../components/Meta";
export const HomeScreen: FC = () => {
 const { pageNumber, keyword } = useParams<{
  keyword: string;
  pageNumber: string;
 }>();
 const { data, isLoading, error } = useGetProductsQuery({
  keyword,
  pageNumber,
 });

 const typedError = error as IError;
 return (
  <>
   {!keyword ? (
    <ProductCarousel />
   ) : (
    <Link to={"/"} className="btn btn-light mb-4">
     Go Back
    </Link>
   )}
   {isLoading ? (
    <Loader />
   ) : typedError ? (
    <Message variant="danger">{typedError.data.message}</Message>
   ) : (
    <>
     <Meta
      title="Welcome To ProShop"
      description="We sell the best products for cheap"
      keywords="electronics, buy electronics, cheap electronics"
     />
     <h1>Latest Products</h1>
     <Row>
      {data.products &&
       data.products.map((product: IProduct) => (
        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
         <Product product={product} />
        </Col>
       ))}
     </Row>
     <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Paginate page={data.page} pages={data.pages} keyword={keyword} />
     </div>
    </>
   )}
  </>
 );
};

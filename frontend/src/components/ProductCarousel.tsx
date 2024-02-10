import { FC } from "react";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IProduct } from "../interfaces/Product";
import { Loader } from "./Loader";
import { Message } from "./Message";
import { useGetTopProductsQuery } from "../redux/slice/productsApiSlice";
import { IError } from "../interfaces/Error";

export const ProductCarousel: FC = () => {
 const { data: products, isLoading, error } = useGetTopProductsQuery(5);
 const typedError = error as IError;
 return isLoading ? (
  <Loader />
 ) : typedError ? (
  <Message variant="danger">{typedError.data.message}</Message>
 ) : (
  <Carousel pause="hover" className="bg-dark">
   {products.map((product: IProduct) => (
    <Carousel.Item key={product._id}>
     <Link to={`/product/${product._id}`}>
      <Image src={product.image} alt={product.name} fluid />
      <Carousel.Caption className="carousel-caption">
       <h2>
        {product.name} (${product.price})
       </h2>
      </Carousel.Caption>
     </Link>
    </Carousel.Item>
   ))}
  </Carousel>
 );
};

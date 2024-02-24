import { FC, useState } from "react";
import { useParams, useNavigate } from "react-router";
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
import { toast } from "react-toastify";
import {
 useGetProductDetailsQuery,
 useCreateProductReviewMutation,
} from "../redux/slice/productsApiSlice";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { Raiting } from "../components/Raiting";
import { addToCart } from "../redux/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { IError } from "../interfaces/Error";
import { IReview } from "../interfaces/Review";
import { Meta } from "../components/Meta";
export const ProductScreen: FC = () => {
 const { id: productId } = useParams();
 const [qty, setQty] = useState<number>(1);
 const [rating, setRating] = useState<number>(0);
 const [comment, setComment] = useState<string>("");
 const {
  data: product,
  isLoading,
  isError,
  refetch,
 } = useGetProductDetailsQuery(productId);
 const { userInfo } = useAppSelector((state) => state.auth);

 const navigate = useNavigate();
 const dispatch = useAppDispatch();

 const [createProductReview] = useCreateProductReviewMutation();
 const addToCartHandler = () => {
  dispatch(
   addToCart({
    ...product,
    qty,
   })
  );
  navigate("/cart");
 };
 const createReviewHandler = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
   await createProductReview({
    productId,
    review: {
     rating,
     comment,
    },
   }).unwrap();
   refetch();
   toast.success("Review submitted");
   setComment("");
   setRating(0);
  } catch (error) {
   const err = error as IError;
   toast.error(err.data.message);
  }
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
    <>
     <Meta
      title={product.name}
      description={product.description}
      keywords={"Product"}
     />
     <Row>
      <Col md={5}>
       <Image src={`${product.image}`} alt={product.name} fluid />
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
     <Row>
      <Col md={6}>
       <h2>Reviews</h2>
       {product.reviews.length === 0 && (
        <Message variant="info">No Reviews</Message>
       )}
       <ListGroup variant="flush">
        {product.reviews.map((review: IReview) => (
         <ListGroup.Item key={review._id}>
          <strong>{review.name}</strong>
          <Raiting value={review.rating} text={review.comment} />
          <p>{review.createdAt.substring(0, 10)}</p>
          <p>{review.comment}</p>
         </ListGroup.Item>
        ))}
        <ListGroup.Item>
         <h2>Write a Customer Review</h2>
         {userInfo ? (
          <Form onSubmit={createReviewHandler}>
           <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
             as="select"
             value={rating}
             onChange={(e) => setRating(Number(e.target.value))}
            >
             <option value="">Select...</option>
             <option value="1">1 - Poor</option>
             <option value="2">2 - Fair</option>
             <option value="3">3 - Good</option>
             <option value="4">4 - Very Good</option>
             <option value="5">5 - Excellent</option>
            </Form.Control>
           </Form.Group>
           <Form.Group controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
             as="textarea"
             value={comment}
             onChange={(e) => setComment(e.target.value)}
            ></Form.Control>
           </Form.Group>
           <Button type="submit" variant="primary" className="my-2">
            Submit
           </Button>
          </Form>
         ) : (
          <Message variant="info">
           Please <Link to="/login">sign in</Link> to write a review
          </Message>
         )}
        </ListGroup.Item>
       </ListGroup>
      </Col>
     </Row>
    </>
   )}
  </>
 );
};

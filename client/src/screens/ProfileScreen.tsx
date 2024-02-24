import { FC, useEffect, useState } from "react";
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { LinkContainer } from "react-router-bootstrap";
import { FaTimes } from "react-icons/fa";
import { Message } from "../components/Message";
import { Loader } from "../components/Loader";
import { toast } from "react-toastify";
import { useProfileMutation } from "../redux/slice/userApiSlice";
import { useGetUserOrdersQuery } from "../redux/slice/orderApiSlice";
import { setCredentians } from "../redux/slice/authSlice";
import { IError } from "../interfaces/Error";
import { IOrder } from "../interfaces/Order";

export const ProfileScreen: FC = () => {
 const dispatch = useAppDispatch();
 const { userInfo } = useAppSelector((state) => state.auth);
 const [updateProfile, { isLoading: userProfileUpdateLoading }] =
  useProfileMutation();
 const [name, setName] = useState<string>("");
 const [email, setEmail] = useState<string>("");
 const [password, setPassword] = useState<string>("");
 const [confirmPassword, setConfirmPassword] = useState<string>("");
 const { data: orders, isLoading, error } = useGetUserOrdersQuery({});

 const typedError = error as IError;

 useEffect(() => {
  if (userInfo) {
   setName(userInfo.name);
   setEmail(userInfo.email);
  }
 }, [userInfo]);

 const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (password !== confirmPassword) {
   toast.error("Passwords do not match");
  } else {
   try {
    const res = await updateProfile({
     _id: userInfo?._id,
     name,
     email,
     password,
    }).unwrap();
    dispatch(setCredentians(res));
    toast.success("Profile Updated");
   } catch (error) {
    const typedError = error as IError;
    toast.error(typedError.data.message);
   }
  }
 };
 return (
  <Row>
   <Col md={3}>
    <h2>User Profile</h2>
    <Form onSubmit={submitHandler}>
     <Form.Group controlId="name" className="my-2">
      <Form.Label>Name</Form.Label>
      <Form.Control
       type="name"
       placeholder="Enter name"
       value={name}
       onChange={(e) => setName(e.target.value)}
      />
     </Form.Group>
     <Form.Group controlId="email" className="my-2">
      <Form.Label>Email Address</Form.Label>
      <Form.Control
       type="email"
       placeholder="Enter email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
      />
     </Form.Group>
     <Form.Group controlId="password" className="my-2">
      <Form.Label>Password</Form.Label>
      <Form.Control
       type="password"
       placeholder="Enter password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
      />
     </Form.Group>
     <Form.Group controlId="confirmPassword" className="my-2">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control
       type="password"
       placeholder="Confirm password"
       value={confirmPassword}
       onChange={(e) => setConfirmPassword(e.target.value)}
      />
     </Form.Group>
     <Button type="submit" variant="primary" className="my-2">
      Update
     </Button>
     {userProfileUpdateLoading && <Loader />}
    </Form>
   </Col>
   <Col md={9}>
    {isLoading ? (
     <Loader />
    ) : typedError ? (
     <Message variant="danger">{typedError.data.message}</Message>
    ) : (
     <Table striped bordered hover responsive className="table-sm">
      <thead>
       <tr>
        <th>ID</th>
        <th>DATE</th>
        <th>TOTAL</th>
        <th>PAID</th>
        <th>DELIVERED</th>
        <th></th>
       </tr>
      </thead>
      <tbody>
       {orders?.map((order: IOrder) => (
        <tr key={order._id}>
         <td>{order._id}</td>
         <td>{order.createdAt?.toString().substring(0, 10)}</td>
         <td>{order.totalPrice}</td>
         <td>
          {order.isPaid ? (
           order.paidAt?.toString().substring(0, 10)
          ) : (
           <FaTimes style={{ color: "red" }} />
          )}
         </td>
         <td>
          {order.isDelivered ? (
           order.deliveredAt?.toString().substring(0, 10)
          ) : (
           <FaTimes style={{ color: "red" }} />
          )}
         </td>
         <td>
          <LinkContainer to={`/order/${order._id}`}>
           <Button variant="light" className="btn-sm">
            Details
           </Button>
          </LinkContainer>
         </td>
        </tr>
       ))}
      </tbody>
     </Table>
    )}
   </Col>
  </Row>
 );
};

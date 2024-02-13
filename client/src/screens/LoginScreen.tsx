import { FC, useState, FormEvent, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { FormContainer } from "../components/FormContainer";
import { setCredentians } from "../redux/slice/authSlice";
import { useLoginMutation } from "../redux/slice/userApiSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Loader } from "../components/Loader";
import { IError } from "../interfaces/Error";
export const LoginScreen: FC = () => {
 const [email, setEmail] = useState<string>("");
 const [password, setPassword] = useState<string>("");

 const navigate = useNavigate();
 const { search } = useLocation();
 const sp = new URLSearchParams(search);
 const redirect = sp.get("redirect") || "/";

 const dispatch = useAppDispatch();
 const [login, { isLoading }] = useLoginMutation();
 const { userInfo } = useAppSelector((state) => state.auth);

 const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
   const res = await login({
    email,
    password,
   }).unwrap();
   dispatch(setCredentians({ ...res }));
   navigate(redirect);
  } catch (error) {
   const typedError = error as IError;
   toast.error(typedError.data.message);
  }
 };

 useEffect(() => {
  if (userInfo) {
   navigate(redirect);
  }
 }, [userInfo, redirect, navigate]);
 return (
  <FormContainer>
   <h1>Login</h1>

   {isLoading && <Loader />}
   <Form onSubmit={submitHandler}>
    <Form.Group controlId="email" className="my-3">
     <Form.Label>Email Address</Form.Label>
     <Form.Control
      type="email"
      placeholder="Enter email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
     ></Form.Control>
    </Form.Group>
    <Form.Group controlId="password" className="my-3">
     <Form.Label>Password</Form.Label>
     <Form.Control
      type="password"
      placeholder="Enter password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
     ></Form.Control>
    </Form.Group>
    <Button
     type="submit"
     variant="primary"
     className="mt-2"
     disabled={isLoading}
    >
     Sign In
    </Button>
    <Row className="py-3">
     <Col>
      New Customer?{" "}
      <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
       Register
      </Link>
     </Col>
    </Row>
   </Form>
  </FormContainer>
 );
};

export default LoginScreen;

import { FC, useState, FormEvent, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { FormContainer } from "../components/FormContainer";
import { setCredentians } from "../redux/slice/authSlice";
import { useRegisterMutation } from "../redux/slice/userApiSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Loader } from "../components/Loader";
import { IError } from "../interfaces/Error";

export const RegisterScreen: FC = () => {
 const [email, setEmail] = useState<string>("");
 const [password, setPassword] = useState<string>("");
 const [confirmedPassword, setConfirmedPassword] = useState<string>("");
 const [name, setName] = useState<string>("");
 const navigate = useNavigate();
 const { search } = useLocation();
 const sp = new URLSearchParams(search);
 const redirect = sp.get("redirect") || "/shipping";

 const dispatch = useAppDispatch();
 const [register, { isLoading }] = useRegisterMutation();
 const { userInfo } = useAppSelector((state) => state.auth);

 const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
   if (password === confirmedPassword) {
    const res = await register({
     name,
     email,
     password,
    }).unwrap();
    dispatch(setCredentians({ ...res }));
    navigate(redirect);
   } else {
    toast.error("Passwords doesnt match");
   }
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
   <h1>Register</h1>

   {isLoading && <Loader />}
   <Form onSubmit={submitHandler}>
    <Form.Group controlId="name" className="my-3">
     <Form.Label>Name</Form.Label>
     <Form.Control
      type="text"
      placeholder="Enter name"
      value={name}
      onChange={(e) => setName(e.target.value)}
     ></Form.Control>
    </Form.Group>
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
    <Form.Group controlId="confirmedPassword" className="my-3">
     <Form.Label>Confirm Password</Form.Label>
     <Form.Control
      type="password"
      placeholder="Enter password again"
      value={confirmedPassword}
      onChange={(e) => setConfirmedPassword(e.target.value)}
     ></Form.Control>
    </Form.Group>
    <Button
     type="submit"
     variant="primary"
     className="mt-2"
     disabled={isLoading}
    >
     Register
    </Button>
    <Row className="py-3">
     <Col>
      Already have an account?{" "}
      <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
       Login
      </Link>
     </Col>
    </Row>
   </Form>
  </FormContainer>
 );
};

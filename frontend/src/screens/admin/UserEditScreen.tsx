import { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Message } from "../../components/Message";
import { Loader } from "../../components/Loader";
import { FormContainer } from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
 useGetUserByIdQuery,
 useUpdateUserMutation,
} from "../../redux/slice/userApiSlice";
import { IError } from "../../interfaces/Error";

export const UserEditScreen: FC = () => {
 const { id } = useParams<{ id: string }>();
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [isAdmin, setIsAdmin] = useState(false);

 const { data: user, isLoading, error, refetch } = useGetUserByIdQuery(id);
 const typedError = error as IError;

 const [updateUser] = useUpdateUserMutation();
 const navigate = useNavigate();

 const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
   await updateUser({ userId: id, data: { name, email, isAdmin } });
   toast.success("User updated successfully");
   refetch();
   navigate("/admin/userlist");
  } catch (err) {
   const typedError = err as IError;
   toast.error(typedError.data.message);
  }
 };
 useEffect(() => {
  if (user) {
   setName(user.name);
   setEmail(user.email);
   setIsAdmin(user.isAdmin);
  }
 }, [user]);
 return (
  <>
   <Link to="/admin/userlist" className="btn btn-light my-3">
    Go Back
   </Link>
   <FormContainer>
    <h1>Edit User</h1>
    {isLoading ? (
     <Loader />
    ) : typedError ? (
     <Message variant="danger">{typedError.data.message}</Message>
    ) : (
     <Form onSubmit={submitHandler}>
      <Form.Group controlId="name">
       <Form.Label>Name</Form.Label>
       <Form.Control
        type="name"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
       ></Form.Control>
      </Form.Group>
      <Form.Group controlId="email">
       <Form.Label>Email Address</Form.Label>
       <Form.Control
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
       ></Form.Control>
      </Form.Group>
      <Form.Group controlId="isadmin">
       <Form.Check
        type="checkbox"
        label="Is Admin"
        checked={isAdmin}
        onChange={(e) => setIsAdmin(e.target.checked)}
       ></Form.Check>
      </Form.Group>
      <Button type="submit" variant="primary">
       Update
      </Button>
     </Form>
    )}
   </FormContainer>
  </>
 );
};

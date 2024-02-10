import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export const SearchBox: FC = () => {
 const [keyword, setKeyword] = useState("");
 const navigate = useNavigate();

 const submitHandler = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (keyword.trim()) {
   navigate(`/search/${keyword.trim()}`);
   setKeyword("");
  } else {
   navigate("/");
  }
 };
 return (
  <Form onSubmit={submitHandler} className="d-flex">
   <Form.Control
    type="text"
    name="q"
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
    placeholder="Search Products..."
    className="mr-sm-2 ml-sm-5"
   ></Form.Control>
   <Button type="submit" variant="outline-light" className="p-2 mx-2">
    Submit
   </Button>
  </Form>
 );
};

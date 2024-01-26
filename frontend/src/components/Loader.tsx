import { FC } from "react";
import { Spinner } from "react-bootstrap";

export const Loader: FC = () => {
 return (
  <Spinner
   animation="border"
   role="status"
   style={{
    width: "100px",
    height: "100px",
    margin: "auto",
    display: "block",
   }}
  />
 );
};

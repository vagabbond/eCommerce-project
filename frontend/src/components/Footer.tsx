import { FC } from "react";
import { Row, Col, Container } from "react-bootstrap";

export const Footer: FC = () => {
 const currentYear = new Date().getFullYear();

 return (
  <footer>
   <Container>
    <Row>
     <Col>
      <p className="text-center py-3">Shop &copy; {currentYear}</p>
     </Col>
    </Row>
   </Container>
  </footer>
 );
};

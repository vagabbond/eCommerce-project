import { FC } from "react";
import { Container, Row, Col } from "react-bootstrap";

interface IProps {
 children: React.ReactNode;
}

export const FormContainer: FC<IProps> = ({ children }) => {
 return (
  <Container>
   <Row className="justify-content-md-center">
    <Col xs={12} md={6}>
     {children}
    </Col>
   </Row>
  </Container>
 );
};

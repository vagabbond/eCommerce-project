import { FC } from "react";
import { Header } from "./components/Header";
import { Container } from "react-bootstrap";
import { Footer } from "./components/Footer";
import { Outlet } from "react-router";
const App: FC = () => {
 return (
  <>
   <Header />
   <main className="py-3">
    <Container>
     <h1>Welcome</h1>
     <Outlet />
    </Container>
   </main>
   <Footer />
  </>
 );
};

export default App;

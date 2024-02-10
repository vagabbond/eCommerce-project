import { FC } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
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
     <Outlet />
    </Container>
   </main>
   <Footer />
   <ToastContainer />
  </>
 );
};

export default App;

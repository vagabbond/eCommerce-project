import { FC } from "react";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { Paginate } from "../../components/Paginate";
import { Message } from "../../components/Message";
import { Loader } from "../../components/Loader";
import { useGetAllOrdersQuery } from "../../redux/slice/orderApiSlice";
import { IError } from "../../interfaces/Error";
import { IOrderAdmin } from "../../interfaces/Order";

export const OrderListScreen: FC = () => {
 const { pageNumber } = useParams<{ pageNumber: string }>();
 const { data, isLoading, error } = useGetAllOrdersQuery({ pageNumber });
 const typedError = error as IError;

 console.log(pageNumber);
 console.log(data);
 return (
  <>
   <h2>Orders</h2>
   {isLoading ? (
    <Loader />
   ) : typedError ? (
    <Message variant="danger">{typedError.data.message}</Message>
   ) : (
    <>
     <Table striped hover responsive className="table-sm">
      <thead>
       <tr>
        <th>ID</th>
        <th>USER</th>
        <th>DATE</th>
        <th>TOTAL</th>
        <th>PAID</th>
        <th>DELIVERED</th>
        <th></th>
       </tr>
      </thead>
      <tbody>
       {data.orders.map((order: IOrderAdmin) => (
        <tr key={order._id}>
         <td>{order._id}</td>
         <td>{order.user.name}</td>
         <td>{order.createdAt.toString().substring(0, 10)}</td>
         <td>${order.totalPrice}</td>
         <td>
          {order.isPaid ? (
           order.paidAt.toString().substring(0, 10)
          ) : (
           <FaTimes color="red" />
          )}
         </td>
         <td>
          {order.isDelivered ? (
           order.deliveredAt.toString().substring(0, 10)
          ) : (
           <FaTimes color="red" />
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
     <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Paginate page={data.page} pages={data.pages} />
     </div>
    </>
   )}
  </>
 );
};

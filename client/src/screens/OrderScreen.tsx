import { FC, useEffect } from "react";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import {
 PayPalButtons,
 usePayPalScriptReducer,
 PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Message } from "../components/Message";
import { Loader } from "../components/Loader";
import {
 useGetOrderByIdQuery,
 usePayOrderMutation,
 useGetPayPalClientIdQuery,
 useDeliverOrderMutation,
} from "../redux/slice/orderApiSlice";
import { IError } from "../interfaces/Error";
import { useAppSelector } from "../redux/store";
import { Meta } from "../components/Meta";

interface IOrderItem {
 name: string;
 qty: number;
 image: string;
 price: number;
 product: string;
}
export const OrderScreen: FC = () => {
 const { id: orderId } = useParams();
 const {
  data: order,
  refetch,
  isLoading,
  error,
 } = useGetOrderByIdQuery(orderId);

 const {
  data: paypal,
  isLoading: loadingPayPal,
  error: errorPayPal,
 } = useGetPayPalClientIdQuery({});
 const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
 const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();
 const [deliverOrder, { isLoading: loadingDeliver }] =
  useDeliverOrderMutation();
 const { userInfo } = useAppSelector((state) => state.auth);
 const typedError = error as IError;

 useEffect(() => {
  if (!errorPayPal && !loadingPayPal && paypal.clientId) {
   const loadPaypalScript = async () => {
    payPalDispatch({
     type: "resetOptions",
     value: {
      clientId: paypal.clientId,
      currency: "USD",
     },
    });
   };
   if (order && !order.isPaid) {
    if (!window.paypal) {
     loadPaypalScript();
    }
   }
  }
 }, [order, paypal, errorPayPal, loadingPayPal, payPalDispatch]);

 //  const onApproveTest = async () => {
 //   await payOrder({
 //    orderId,
 //    details: {
 //     payer: {},
 //    },
 //   });
 //   refetch();
 //   toast.success("Payment successful");
 //  };

 const deliverHandler = async () => {
  try {
   await deliverOrder(orderId);
   refetch();
   toast.success("Order delivered");
  } catch (error) {
   const typedError = error as IError;
   toast.error(typedError.data.message);
  }
 };

 const paypalButtonProps: PayPalButtonsComponentProps = {
  async createOrder(data, actions) {
   return actions.order
    .create({
     purchase_units: [
      {
       amount: {
        value: order.totalPrice.toString(),
       },
      },
     ],
    })
    .then((orderId) => {
     return orderId;
    });
  },
  async onApprove(data, actions) {
   if (actions.order) {
    return actions.order.capture().then(async (details) => {
     try {
      await payOrder({ orderId, details });
      refetch();
      toast.success("Payment successful");
     } catch (error) {
      const typedError = error as IError;
      toast.error(typedError.data.message);
     }
    });
   }
  },
  onError(error) {
   const typedError = error.toString();
   toast.error(typedError);
  },
 };
 return isLoading ? (
  <Loader />
 ) : typedError ? (
  <Message variant="danger">{typedError.data.message}</Message>
 ) : (
  <>
   <Meta
    title={`Order ${order._id}`}
    description={"Your order"}
    keywords={"Order"}
   />
   <h1>Order {order._id}</h1>
   <Row>
    <Col md={8}>
     <ListGroup variant="flush">
      <ListGroup.Item>
       <h2>Shipping</h2>
       <p>
        <strong>Name:</strong> {order.user.name}
       </p>
       <p>
        <strong>Email:</strong> {order.user.email}
       </p>
       <p>
        <strong>Address:</strong> {order.shippingAddress.address},
        {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
        {order.shippingAddress.country}
       </p>
       {order.isDelivered ? (
        <Message variant="success">Delivered on {order.deliveredAt}</Message>
       ) : (
        <Message variant="danger">Not Delivered</Message>
       )}
      </ListGroup.Item>
      <ListGroup.Item>
       <h2>Payment</h2>
       <p>
        <strong>Method:</strong> {order.paymentMethod}
       </p>
       {order.isPaid ? (
        <Message variant="success">Paid on {order.paidAt}</Message>
       ) : (
        <Message variant="danger">Not Paid</Message>
       )}
      </ListGroup.Item>
      <ListGroup.Item>
       <h2>Order Items</h2>
       <ListGroup variant="flush">
        {order.orderItems.map((item: IOrderItem) => (
         <ListGroup.Item key={item.product}>
          <Row>
           <Col md={1}>
            <Image
             src={`/src/assets${item.image}`}
             fluid
             rounded
             alt={item.name}
            />
           </Col>
           <Col>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
           </Col>
           <Col md={4}>
            {item.qty} x ${item.price} = ${item.qty * item.price}
           </Col>
          </Row>
         </ListGroup.Item>
        ))}
       </ListGroup>
      </ListGroup.Item>
     </ListGroup>
    </Col>
    <Col md={4}>
     <Card>
      <ListGroup variant="flush">
       <ListGroup.Item>
        <h2>Order Summary</h2>
       </ListGroup.Item>
       <ListGroup.Item>
        <Row>
         <Col>Items:</Col>
         <Col>${order.itemsPrice}</Col>
        </Row>

        <Row>
         <Col>Shipping:</Col>
         <Col>${order.shippingPrice}</Col>
        </Row>

        <Row>
         <Col>Tax:</Col>
         <Col>${order.taxPrice}</Col>
        </Row>

        <Row>
         <Col>Total:</Col>
         <Col>${order.totalPrice}</Col>
        </Row>
       </ListGroup.Item>
       {!order.isPaid && order.user === userInfo?._id && (
        <ListGroup.Item>
         {loadingPay && <Loader />}
         {isPending ? (
          <Loader />
         ) : (
          <div>
           {/* <Button onClick={onApproveTest} style={{ marginBottom: "10px" }}>
            Test pay order
           </Button> */}
           <div>
            <PayPalButtons {...paypalButtonProps}></PayPalButtons>
           </div>
          </div>
         )}
        </ListGroup.Item>
       )}
       {loadingDeliver && <Loader />}
       {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
        <ListGroup.Item>
         <Button
          type="button"
          className="btn btn-block"
          onClick={deliverHandler}
         >
          Mark As Delivered
         </Button>
        </ListGroup.Item>
       )}
      </ListGroup>
     </Card>
    </Col>
   </Row>
  </>
 );
};

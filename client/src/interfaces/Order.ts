interface IOrderItem {
 name: string;
 qty: string;
 image: string;
 price: string;
 product: string;
}

export interface IOrder {
 _id: string;
 orderItems: IOrderItem[];
 shippingAddress: {
  address: string;
  city: string;
  postalCode: string;
  country: string;
 };
 paymentMethod: string;
 paymentResult: {
  id: string;
  status: string;
  updateTime: string;
  emailAddress: string;
 };
 itemsPrice: number;
 taxPrice: number;
 shippingPrice: number;
 totalPrice: number;
 isPaid: boolean;
 paidAt: Date;
 isDelivered: boolean;
 deliveredAt: Date;
 createdAt: Date;
 user: string;
}
export interface IOrderAdmin {
 _id: string;
 orderItems: IOrderItem[];
 shippingAddress: {
  address: string;
  city: string;
  postalCode: string;
  country: string;
 };
 paymentMethod: string;
 paymentResult: {
  id: string;
  status: string;
  updateTime: string;
  emailAddress: string;
 };
 itemsPrice: number;
 taxPrice: number;
 shippingPrice: number;
 totalPrice: number;
 isPaid: boolean;
 paidAt: Date;
 isDelivered: boolean;
 deliveredAt: Date;
 createdAt: Date;
 user: { _id: string; name: string };
}

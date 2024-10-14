// pages/order-history.js
import { getSession } from 'next-auth/client';
import dbConnect from '../utils/dbConnect';
import Order from '../models/Order';

const OrderHistory = ({ orders }) => {
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold">Order History</h2>
      <div>
        {orders.map(order => (
          <div key={order._id} className="my-2 p-4 border border-gray-300 rounded-md">
            <p>Order ID: {order._id}</p>
            <p>Currency: {order.currency}</p>
            <p>Amount: {order.amount}</p>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  await dbConnect();
  const orders = await Order.find({ userId: session.user.id });

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}

export default OrderHistory;

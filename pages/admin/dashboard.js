// pages/admin/dashboard.js
import { getSession } from 'next-auth/client';
import dbConnect from '../../utils/dbConnect';
import Product from '../../models/Product';
import Order from '../../models/Order';
import User from '../../models/User';

const AdminDashboard = ({ products, orders, users }) => {
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <div>
        <h3 className="text-xl font-bold">Products</h3>
        {products.map(product => (
          <div key={product._id} className="my-2 p-4 border border-gray-300 rounded-md">
            <p>Name: {product.name}</p>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-xl font-bold">Orders</h3>
        {orders.map(order => (
          <div key={order._id} className="my-2 p-4 border border-gray-300 rounded-md">
            <p>Order ID: {order._id}</p>
            <p>Currency: {order.currency}</p>
            <p>Amount: {order.amount}</p>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-xl font-bold">Users</h3>
        {users.map(user => (
          <div key={user._id} className="my-2 p-4 border border-gray-300 rounded-md">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  await dbConnect();
  const products = await Product.find({});
  const orders = await Order.find({});
  const users = await User.find({});

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      orders: JSON.parse(JSON.stringify(orders)),
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}

export default AdminDashboard;

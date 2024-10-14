// components/AdminDashboard.js
import { useState } from 'react';
import { useSession } from 'next-auth/client';

const AdminDashboard = ({ products, orders, users }) => {
  const [session] = useSession();
  const [editingProduct, setEditingProduct] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });

  const handleEditProduct = (product) => {
    setEditingProduct(product._id);
    setProductDetails({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    });
  };

  const handleSaveProduct = async () => {
    try {
      const response = await fetch('/api/products', {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...productDetails, id: editingProduct }),
      });
      if (response.ok) {
        alert('Product saved successfully!');
        setEditingProduct(null);
        setProductDetails({
          name: '',
          price: '',
          description: '',
          image: '',
        });
        // Refresh the page or update the state to reflect the changes
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('There was an issue saving the product. Please try again.');
    }
  };

  if (!session || session.user.role !== 'admin') {
    return <div>You need to be an admin to view this page.</div>;
  }

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
            <button onClick={() => handleEditProduct(product)} className="mt-2 bg-yellow-500 text-white py-1 px-2 rounded-md">
              Edit
            </button>
          </div>
        ))}
        {editingProduct && (
          <div className="my-2 p-4 border border-gray-300 rounded-md">
            <h3 className="text-xl font-bold">Edit Product</h3>
            <input
              type="text"
              value={productDetails.name}
              onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={productDetails.price}
              onChange={(e) => setProductDetails({ ...productDetails, price: e.target.value })}
              placeholder="Price"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <textarea
              value={productDetails.description}
              onChange={(e) => setProductDetails({ ...productDetails, description: e.target.value })}
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={productDetails.image}
              onChange={(e) => setProductDetails({ ...productDetails, image: e.target.value })}
              placeholder="Image URL"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button onClick={handleSaveProduct} className="mt-2 bg-green-500 text-white py-1 px-2 rounded-md">
              Save
            </button>
          </div>
        )}
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

export default AdminDashboard;

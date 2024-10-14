// components/ProductListing.js
import Link from 'next/link';
import { useCart } from '../context/CartContext';

const ProductListing = ({ product }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      item: product
    });
  };

  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-lg">${product.price}</p>
      <button onClick={addToCart} className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md">
        Add to Cart
      </button>
      <Link href={`/products/${product._id}`}>
        <a className="block mt-2 text-blue-600">View Details</a>
      </Link>
    </div>
  );
};

export default ProductListing;

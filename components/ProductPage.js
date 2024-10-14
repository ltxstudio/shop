// components/ProductPage.js
import { useCart } from '../context/CartContext';

const ProductPage = ({ product }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      item: product
    });
  };

  return (
    <div className="container mx-auto my-8">
      <div className="flex">
        <div className="w-1/2">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="w-1/2 ml-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg">{product.description}</p>
          <p className="text-2xl font-semibold">${product.price}</p>
          <button onClick={addToCart} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

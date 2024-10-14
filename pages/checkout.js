import { useCart } from '../context/CartContext';
import { createWallet, sendPayment, getWalletInfo } from '../services/paymentService';

const CheckoutPage = () => {
  const { cart, dispatch } = useCart();

  const handleCheckout = async () => {
    try {
      const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
      const wallet = await createWallet('btc');
      const destinations = [{ address: 'recipient_address', amount: totalAmount }];
      await sendPayment(wallet.id, destinations);
      const walletInfo = await getWalletInfo(wallet.id);
      console.log(walletInfo);
      dispatch({ type: 'CLEAR_CART' });
      alert('Payment successful! Your order is on its way.');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an issue processing your payment. Please try again.');
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold">Checkout</h2>
      <div>
        {cart.map(item => (
          <div key={item.id} className="flex justify-between my-2">
            <p>{item.name}</p>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
      <button onClick={handleCheckout} className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md">
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;

import { useState } from 'react';

const Checkout = () => {
  const [currency, setCurrency] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [invoice, setInvoice] = useState(null);

  const handlePayment = async () => {
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ currency, amount, address })
    });
    const data = await response.json();
    setInvoice(data);
  };

  return (
    <div>
      <input type="text" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Your crypto address" />
      <select value={currency} onChange={e => setCurrency(e.target.value)}>
        <option value="BTC">Bitcoin (BTC)</option>
        <option value="LTC">Litecoin (LTC)</option>
        <option value="USDT">Tether (USDT)</option>
        <option value="TRX">TRON (TRX)</option>
      </select>
      <button onClick={handlePayment}>Pay</button>
      {invoice && <div>Invoice ID: {invoice.id}</div>}
    </div>
  );
};

export default Checkout;

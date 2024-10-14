import axios from 'axios';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { amount, currency, address } = req.body;

    try {
      const response = await axios.post('https://apirone.com/api/v2/transaction', {
        amount,
        currency,
        address,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.APIRONE_API_KEY}`,
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end();
  }
};

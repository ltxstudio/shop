// pages/api/products.js
import dbConnect from '../../utils/dbConnect';
import Product from '../../models/Product';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { name, price, description, image } = req.body;

    try {
      const product = new Product({ name, price, description, image });
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: 'Error creating product' });
    }
  } else if (req.method === 'PUT') {
    const { id, name, price, description, image } = req.body;

    try {
      const product = await Product.findByIdAndUpdate(
        id,
        { name, price, description, image },
        { new: true }
      );
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: 'Error updating product' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ error: 'Error deleting product' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  currency: String,
  amount: Number,
  address: String,
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
  invoiceId: String,
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);

const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    // required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    // required: true
  },
  date: {
    type: Date,
    // required: true
  },
  items: [{
    description: {
      type: String,
      // required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
  }],
  status: {
    type: String,
    enum: ['pending', 'paid', 'late'],
    default: 'pending'
  },
  paymentDeadline: {
    type: Date,
    required: true
  },
  totalAmount: {
    type: Number,
    // required: true
  },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;


const Invoice = require('../model/invoiceModel')
const Client = require('../model/clientModel')

const createInvoice = async (req, res) => {
  try {
    const { invoiceNumber, clientId, date, items, paymentDeadline, totalAmount } = req.body;

    // fetch client details from client model
      const client = await Client.findById(clientId);
    console.log(client)

    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    const newInvoice = new Invoice({
      invoiceNumber,
      clientId: client,
      date,
      items,
      paymentDeadline,
      totalAmount,
      
    });

    console.log(newInvoice)

    const invoice = await newInvoice.save();

    res.status(201).json({
       success: true,
        invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//get All invoice
  const getInvoices = async (req, res) => {
    try {
      const invoices = await Invoice.find().populate("clientId");
      const invoicesCount = await Invoice.countDocuments();

      res.status(200).json({
        success: true,
        invoices,
        invoicesCount
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
// get single invoice details
const getInvoiceById = async (req, res) => {          
    try {
      const invoice = await Invoice.findById(req.params.id).populate("clientId");
      // console.log(invoice.clientId)
      if (!invoice) {
        return res.status(404).json({
          success: false,
          message: 'Invoice not found',
        });
      }
      res.status(200).json({
        success: true,
        invoice,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  // Update invoice
  const updateInvoice = async (req, res) => {
    try {
      const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!invoice) {
        return res.status(404).json({
          success: false,
          message: 'Invoice not found',
        });
      }
      res.status(200).json({
        success: true,
        invoice,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  // delete invoice

  const deleteInvoice = async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await Invoice.findById(id);
      if (!invoice) {
        return res.status(404).json({
           success: false,
            message: 'Invoice not found'
           });
      }
      if (invoice.status === 'paid') {
        await invoice.deleteOne();
        res.status(200).json({
           success: true,
            message: 'Invoice deleted successfully'
           });
      } else {
        res.status(400).json({
           success: false,
           message: 'Invoice cannot be deleted, payment status is not paid' 
          });
      }
    } catch (error) {
      res.status(500).json({
         success: false,
          message: error.message 
        });
    }
  };
  
  //delete all invoice
  const deleteAllInvoices = async (req, res) => {
    try {
      const result = await Invoice.deleteMany({status:'paid'});
      res.status(200).json({
        success: true,
        message: `Deleted ${result.deletedCount} invoices`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  // update all invoice
  const updateAllInvoices = async (req, res) => {
    try {
      const result = await Invoice.updateMany({}, req.body);
      res.status(200).json({
        success: true,
        message:  "invoices updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  // get all invoice in a single client
  const getSingleClientInvoice = async (req, res) => {
   try{
    const client = await Client.findById(req.params.id)
    console.log(client)
    if(!client){
      return res.status(404).json({
        success: false,
        message: "Client not found"
      })
    }
    const invoices = await Invoice.find({ clientId: client })
    .populate('clientId', 'name')
    .select('-__v');
    const allInvoice = invoices.length
    console.log(invoices.length)
    res.status(200).json({
      success: true,
      invoices,
      allInvoice

    });

  }catch(error){
    res.status(500).json({
      success: false,
      message: error.message,
    });
   }
  };

module.exports = {createInvoice,getInvoiceById,getInvoices,updateInvoice,deleteInvoice,deleteAllInvoices,updateAllInvoices,getSingleClientInvoice}
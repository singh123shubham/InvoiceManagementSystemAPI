const Client = require('../model/clientModel');
const Invoice =  require('../model/invoiceModel')
// Create new  Client 
const createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json({
      success:true,
      client
    });
  } catch (error) {
    res.status(400).json({
      success:false,
      message: error.message
     });
  }
};

// get All Clients
const getClients = async (req, res) => {
  try {
    const clients = await Client.find().populate("invoiceId");
    const TotalClients = await Client.countDocuments()
    res.json({
      success:true,
      clients,
      TotalClients

    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message: error.message
     });
  }
};

// get Single Client
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate('invoiceId');
    console.log(client)
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json({
      success: true,
      client
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message: error.message 
    });
  }
};

// Update Client data 
const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!client) {
      return res.status(404).json({
        success:false,
        message: 'Client not found' 
      });
    }
    res.json({
      success:ture,
      client
    });
  } catch (error) {
    res.status(400).json({ 
      success:false,
      message: error.message
     });
  }
};

// Delete Clients by ID
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if client has any related invoices
    const relatedInvoices = await Invoice.find({ clientId: id });
    if (relatedInvoices.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete client because related invoices exist',
      });
    }

    // Delete client if no related invoices exist
    const deletedClient = await Client.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: 'Client deleted successfully',
      client: deletedClient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient
};

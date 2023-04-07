const express = require("express")
const { createInvoice, getInvoiceById, getInvoices, updateInvoice, deleteInvoice, deleteAllInvoices, updateAllInvoices, getInvoicesForClient, getSingleClientInvoice } = require("../controller/invoiceController")
const router = express.Router()

router.post('/new',createInvoice)
router.get('/',getInvoices)
router.get('/:id',getInvoiceById)
router.put('/:id',updateInvoice)
router.delete('/:id',deleteInvoice)
router.delete('/',deleteAllInvoices)
router.put('/',updateAllInvoices)
router.get('/allinvoice/:id', getSingleClientInvoice);

//Add some route


module.exports = router

// stritaddress 
// city/postal Code
// phone 
// email




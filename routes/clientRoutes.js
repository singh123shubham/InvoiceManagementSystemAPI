const express = require('express')
const { createClient, getClients, getClientById, updateClient, deleteClient } = require('../controller/clientController')
const router = express.Router()

router.post('/new',createClient)
router.get('/',getClients)
router.get('/:id',getClientById)
router.put('/:id',updateClient)
router.delete('/:id',deleteClient)
module.exports = router

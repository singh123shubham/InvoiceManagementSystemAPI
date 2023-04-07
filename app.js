const express = require("express")
const cors = require('cors')
const app = express()
const dotenv = require('dotenv').config()
const connectDB = require('./db/dbConnection')
app.use(express.json())
app.use(cors())

// Invoice Routes
const invoice = require('./routes/invoiceRoute')

// Client Routes
const client =  require('./routes/clientRoutes')
const user = require('./routes/userRoutes')
app.use('/api/v1/invoice',invoice)
app.use('/api/v1/client',client)
app.use('/api/v1/user',user)

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.DB_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();


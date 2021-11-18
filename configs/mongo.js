const express = require ("express");
const mongoose = require ("mongoose");
const app = express ();
const dotenv = require ("dotenv");
require('dotenv').config();
// const pinRoute = require ('./routes/pin');

dotenv.config();

app.use(express.json())

mongoose
  .connect(
    process.env.MONGODB_URI,            //  <--- UPDATE
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
	)
  .then((x) => console.log('Connected to the DB'))
  .catch(err => console.error('Error while connecting to DB', err));

// //zone de préfixage

// app.use("/api/pins", pinRoute);
// app.use(express.json());


app.listen(8800, () => {
  console.log('backend server is running')
})

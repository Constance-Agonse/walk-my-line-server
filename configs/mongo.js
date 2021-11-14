const express = require ("express");
const mongoose = require ("mongoose");
const app = express ();
const dotenv = require ("dotenv");
// const pinRoute = require ('./routes/pin');

dotenv.config();

app.use(express.json())

mongoose
.connect("mongodb://localhost/walk-my-line", {useNewUrlParser: true,
useUnifiedTopology: true})
.then(() => {console.log('MONGODBCONNECTED bien ouej frero')})
.catch((err) =>  console.log('erreur ',err));

// //zone de préfixage

// app.use("/api/pins", pinRoute);
// app.use(express.json());


app.listen(8800, () => {
  console.log('backend server is running')
})

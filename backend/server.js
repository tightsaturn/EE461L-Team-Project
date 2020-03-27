const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');     // used for connecting to MongoDB

require('dotenv').config();               // allows environment variables to be in dotenv file

// express configuration
const app = express();
const port = process.env.PORT || 5000;

// cors middleware configuration
app.use(cors());
app.use(express.json());                  // allows you to parse JSON

const uri = process.env.ATLAS_URI;        // uri stores way to connect to MongoDB
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
   console.log("MongoDB database connection established successfully");
})

// Import Router Files
const pokemonRouter = require('./routes/pokemon');

// Setup paths for routers
app.use('/pokemon', pokemonRouter);

// Start the server
app.listen(port, () => {
   console.log(`Server is running on port: ${port}`);
});
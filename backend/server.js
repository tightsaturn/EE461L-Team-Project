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
const itemsRouter = require('./routes/items');
const abilitiesRouter = require('./routes/abilities');
const movesRouter = require('./routes/moves');
const pokemonCardsRouter = require('./routes/pokemonCards');
const itemCardsRouter = require('./routes/itemCards');
const moveCardsRouter = require('./routes/moveCards');
const abilitiesCardsRouter = require('./routes/abilitiesCards');
const moves2CardsRouter = require('./routes/moves2');
const typesRouter = require('./routes/types');

// Setup paths for routers
app.use('/pokemon', pokemonRouter);
app.use('/items', itemsRouter);
app.use('/abilities', abilitiesRouter);
app.use('/moves', movesRouter);
app.use('/moves2', moves2CardsRouter);
app.use('/pokemoncards', pokemonCardsRouter);
app.use('/itemcards', itemCardsRouter);
app.use('/movecards', moveCardsRouter);
app.use('/abilitycards', abilitiesCardsRouter);
app.use('/types', typesRouter);


// Start the server
app.listen(port, () => {
   console.log(`Server is running on port: ${port}`);
});
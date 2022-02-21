const express = require('express');
const routes = require('./routes');
const db = require('./config/connection');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const dotenv = require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3001;

const expressMongoDb = require('mongo-express');
app.use(expressMongoDb(process.env.MONGODB_URI));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(require('./routes'));


app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));

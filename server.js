const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const mongodb = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3001;

const expressMongoDb = require('mongo-express');
app.use(expressMongoDb(process.env.MONGODB_URI));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/the-social-platform', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('debug', true);


app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));

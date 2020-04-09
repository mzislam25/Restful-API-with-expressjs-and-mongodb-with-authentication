const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const notes = require('./routes/notes');
const user = require('./routes/user');

const app = express();

require('./middlewares/auth');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/notes', notes);
app.use('/user', user);

app.listen(config.PORT, () => {
  mongoose.set('useFindAndModify', false);
  mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
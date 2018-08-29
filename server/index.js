require('dotenv').config({ silent: true });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => { console.log('Database connected!') })
  .catch(err => { throw new Error(err.message) });

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});
app.use('/api/users', routes);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const router = express.Router();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


router.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../app.js'));
  }
  catch (err) {
    next(err);
  }
});

router.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }
  catch (err) {
    next(err);
  }
});

router.use((req, res, next) => {
  const err = new Error('Route not found!')
  err.status = 404
  next(err)
})

app.use((err, req, res) => {
  res.status(err.status || 500).send(err.message || 'Internal server error')
});

app.listen(8080, () => console.log('Listening on port 8080'));

module.exports = app;

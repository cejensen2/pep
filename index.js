const express = require('express');
const morgan = require('morgan');
const path = require('path');
const PORT = 3500;
const app = express();

module.exports = app;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

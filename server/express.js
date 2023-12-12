const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/authRoute');
const path = require('path');
const app = express();
const corsOptions = {
  origin: 'https://mern-frontend-fiaxim7na-charles-dev-projects.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/test', (req, res) => {
  res.status(200).json('up and running');
});

// const routes=require("../dist")
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use(express.static(path.join(__dirname, '../dist')));
app.use((err, req, res, next) => {
  if (err.name === 'UnaurthorizedError') {
    res.status(401).json({
      error: err.name + ':' + err.message,
    });
  } else if (err) {
    res.status(400).json({
      error: err.name + ':' + err.message,
    });
  }
});

module.exports = app;

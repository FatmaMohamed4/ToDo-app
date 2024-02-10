const express =require ('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcryptjs =require ('bcryptjs');

const morgan = require('morgan');
const { MongoClient } = require('mongodb');
const mongoose =require ('mongoose') ;
// dotenv.config({ path: 'config.env' });

const app = express();

  // Middleware to parse URL-encoded bodies
  app.use(express.urlencoded({ extended: true }));


// Start the server 
const PORT =3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.use(morgan('dev'));
  app.use(bodyParser.json());

  app.use('/user',require('./routes/userRoute'));
  app.use('/task',require('./routes/taskRoute'));



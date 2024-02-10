// MongoDB connection
const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://mail1project1:team123456@cluster0.kcqny2i.mongodb.net/' ;
const dbName = 'ToDo';

async function connectDB() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to the database');
    return client.db(dbName);
    
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
  // client.disconnect();
  // console.log('unConnected');
}

connectDB();

module.exports = connectDB;
const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    const url = 'mongodb://127.0.0.1:27017/pizzabyengineer';

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected successfully to the database');
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }
}

module.exports = connectToDatabase;

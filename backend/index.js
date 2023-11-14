const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connecting to MongoDB 
mongoose.connect("mongodb+srv://ashok7013:ashok7013@cluster0.v5nbxez.mongodb.net/?retryWrites=true&w=majority");

// Defining Stock Schema
const stockSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

// Creating Stock Model
const Stock = mongoose.model('Stock', stockSchema);

// Mock API  to Get Random Stock Prices
app.get('/api/stocks', async (req, res) => {
  try {
    const stocks = await Stock.find();
    const updatedStocks = stocks.map((stock) => ({
      name: stock.name,
      price: stock.price + Math.random() * 10 - 5, //generating random price
    }));
    res.json(updatedStocks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

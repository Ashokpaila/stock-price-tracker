
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }
  
  const handler = (req, res) => {
    const d = new Date()
    res.end(d.toString())
  }
  
  module.exports = allowCors(handler)
  

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
module.exports =async (req, res) => {
    
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
}


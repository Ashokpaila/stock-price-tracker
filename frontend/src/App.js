import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockSelector from './StockSelector';
import PriceDisplay from './PriceDisplay';
import './App.css';

function App() {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(''); // Initially no stock selected
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Fetching the list of stocks from the backend
    axios.get('http://localhost:3001/api/stocks')
      .then((response) => {
        setStocks(response.data);
        // Initially selecting the first stock in the list
        setSelectedStock(response.data.length > 0 ? response.data[0].name : '');
      })
      .catch((error) => {
        console.error('Error fetching stocks:', error);
      });
  }, []); 

useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:3001/api/stocks`);
      const selectedStockData = response.data.find((stock) => stock.name === selectedStock);
      if (selectedStockData) {
        setPrice(selectedStockData.price);
      }
    } catch (error) {
      console.error('Error fetching stock price:', error);
    }
    finally {
      setIsLoading(false);
    }

  };

  // Fetching the price of the when the stock selected
  fetchData();

  // Fetching the current price every minute
  const interval = setInterval(fetchData, 60000);

  return () => clearInterval(interval);
}, [selectedStock]); 


  const onSelectStock = (stock) => {
    setSelectedStock(stock);
  };
console.log(price)
  return (
    <div className="App">
      <StockSelector stocks={stocks} selectedStock={selectedStock} onSelectStock={onSelectStock} />
      <PriceDisplay selectedStock={selectedStock} isLoading={isLoading} price={price} />
    </div>
  );
}

export default App;

import React from 'react';

const StockSelector = ({ stocks, selectedStock, onSelectStock }) => {
  return (
    <div className="container">
      <label>Select a stock:</label>
      <select className="select" value={selectedStock} onChange={(e) => onSelectStock(e.target.value)}>
        {stocks.map((stock) => (
          <option key={stock.name} value={stock.name}>
            {stock.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StockSelector;

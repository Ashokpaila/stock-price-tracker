import React from 'react';

const PriceDisplay = ({ selectedStock, price, isLoading }) => {
  return (
    <div className="container">
      <h2>Stock Price Tracker</h2>
      <p>Selected Stock: {selectedStock}</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Current Price: </p>
          <div className="price-display">
            {price > 0 && (
              <span style={{ color: price > 0 ? 'green' : 'red' }}>
                {price > 0 ? '+' : ''}${price.toFixed(2)}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PriceDisplay;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cryptoData, setCryptoData] = useState([]);

  const fetchData = async () => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const response = await axios.get(
        '/api/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD',
        {
          headers: {
            'X-CMC_PRO_API_KEY': apiKey,
          },
        }
      );
      console.log('API Response:', response.data);
      setCryptoData(response.data.data);
    } catch (error) {
      handleRequestError(error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 2 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleRequestError = (error) => {
    if (error.response) {
      console.error('Server Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  };

  /*
  return (
    <div>
      <h1>Crypto Tracker</h1>
      <ul>
        {cryptoData.map((data) => (
          <li key={data.id}>
            {data.name}: ${data.quote.USD.volume_change_24h}
          </li>
        ))}
      </ul>
    </div>
  );

  */
  return (
    <div className="App">
      <h1>Financial Company</h1>
      <div className="stock-ticker">
        <div className="ticker-list">
          {cryptoData.map((data, index) => (
            <li key={index} className={data.quote.USD.volume_change_24h >= 0 ? 'plus' : 'minus'}>
              <span className="company">{data.name}</span>
              <span className="price">{data.quote.USD.price.toFixed(2)}</span>
              {/*<span className="change">{data.quote.USD.volume_change_24h}%</span>*/}
            </li>
          ))}
        </div>
        <div className="ticker-list">
          {cryptoData.map((data, index) => (
            <li key={index + cryptoData.length} className={data.quote.USD.volume_change_24h >= 0 ? 'plus' : 'minus'}>
              <span className="company">{data.name}</span>
              <span className="price">{data.quote.USD.price.toFixed(2)}</span>
              {/*<span className="change">{data.quote.USD.volume_change_24h}%</span>*/}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
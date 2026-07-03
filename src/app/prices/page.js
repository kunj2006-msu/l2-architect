'use client';

import { useState, useEffect } from 'react';

export default function Prices() {
  const [prices, setPrices] = useState({
    bitcoin: { usd: null, usd_24h_change: null },
    ethereum: { usd: null, usd_24h_change: null },
    arbitrum: { usd: null, usd_24h_change: null }
  });
  const [status, setStatus] = useState('CONNECTED');
  const [isFetching, setIsFetching] = useState(false);

  const fetchPrices = async () => {
    setIsFetching(true);
    setStatus('FETCHING...');
    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,arbitrum&vs_currencies=usd&include_24hr_change=true';
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('API Response Error');
      const data = await response.json();
      setPrices(data);
      setStatus('CONNECTED');
    } catch (error) {
      console.error('Fetch error:', error);
      setStatus('ERROR');
    } finally {
      setTimeout(() => {
        setIsFetching(false);
      }, 400);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const formatPrice = (price) => {
    if (price === null || price === undefined) return '$ --,--.-';
    if (price >= 1000) {
      return '$ ' + price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
      return '$ ' + price.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
    }
  };

  const formatChange = (change) => {
    if (change === null || change === undefined) return { text: '-.-- %', className: 'num font-mono' };
    const isPositive = change >= 0;
    const changeSign = isPositive ? '↑' : '↓';
    const text = `${changeSign} ${Math.abs(change).toFixed(2)} %`;
    const className = isPositive ? 'num font-mono ticker-green' : 'num font-mono ticker-red';
    return { text, className };
  };

  const btcData = formatChange(prices.bitcoin?.usd_24h_change);
  const ethData = formatChange(prices.ethereum?.usd_24h_change);
  const arbData = formatChange(prices.arbitrum?.usd_24h_change);

  return (
    <main>
      {/* Prices Section */}
      <section className="prices-section" id="prices">
        <div className="section-container">
          <div className="section-header">
            <div className="section-meta">SYS_MARKET: REAL_TIME_INDEX</div>
            <h1 className="section-title" id="prices-title">Live Price Feeds</h1>
          </div>

          {/* Bloomberg Terminal Header Bar */}
          <div className="terminal-header-bar" id="terminal-feed-status">
            <span>FEED_SOURCE: COINGECKO_PUBLIC_API</span>
            <span className="status" id="feed-status-text">{status}</span>
          </div>

          {/* Borderless Terminal Table */}
          <div className="terminal-table-container">
            <table className="terminal-table" id="prices-table">
              <thead>
                <tr>
                  <th scope="col">Asset Name</th>
                  <th scope="col">Ticker</th>
                  <th scope="col" className="num">Current Price (USD)</th>
                  <th scope="col" className="num">24h Change (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr id="row-btc">
                  <td>
                    <div className="coin-ticker-cell">
                      <span className="coin-ticker">Bitcoin</span>
                      <span className="coin-name">BTC</span>
                    </div>
                  </td>
                  <td>BTC</td>
                  <td className="num font-mono" id="btc-price">{formatPrice(prices.bitcoin?.usd)}</td>
                  <td className={btcData.className} id="btc-change">{btcData.text}</td>
                </tr>
                <tr id="row-eth">
                  <td>
                    <div className="coin-ticker-cell">
                      <span className="coin-ticker">Ethereum</span>
                      <span className="coin-name">ETH</span>
                    </div>
                  </td>
                  <td>ETH</td>
                  <td className="num font-mono" id="eth-price">{formatPrice(prices.ethereum?.usd)}</td>
                  <td className={ethData.className} id="eth-change">{ethData.text}</td>
                </tr>
                <tr id="row-arb">
                  <td>
                    <div className="coin-ticker-cell">
                      <span className="coin-ticker">Arbitrum</span>
                      <span className="coin-name">ARB</span>
                    </div>
                  </td>
                  <td>ARB</td>
                  <td className="num font-mono" id="arb-price">{formatPrice(prices.arbitrum?.usd)}</td>
                  <td className={arbData.className} id="arb-change">{arbData.text}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Dashboard Controls */}
          <div className="prices-controls">
            <button 
              className="btn-terminal btn-terminal-orange" 
              id="btn-refresh"
              onClick={fetchPrices}
              disabled={isFetching}
            >
              <span>{isFetching ? '[ FETCHING... ]' : '[ REFRESH_DATA ]'}</span>
              <span className="font-mono">_</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

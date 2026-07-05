'use client';

import { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const ASSETS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "arbitrum", symbol: "ARB", name: "Arbitrum" },
  { id: "solana", symbol: "SOL", name: "Solana" },
  { id: "cardano", symbol: "ADA", name: "Cardano" },
  { id: "ripple", symbol: "XRP", name: "Ripple" },
  { id: "polkadot", symbol: "DOT", name: "Polkadot" },
  { id: "avalanche-2", symbol: "AVAX", name: "Avalanche" },
  { id: "chainlink", symbol: "LINK", name: "Chainlink" },
  { id: "optimism", symbol: "OP", name: "Optimism" }
];

const MOCK_DATA = {
  bitcoin: { usd: 63450.25, usd_24h_change: 2.45 },
  ethereum: { usd: 3450.80, usd_24h_change: -1.20 },
  arbitrum: { usd: 0.9540, usd_24h_change: 4.80 },
  solana: { usd: 145.20, usd_24h_change: 3.15 },
  cardano: { usd: 0.3850, usd_24h_change: -0.75 },
  ripple: { usd: 0.5820, usd_24h_change: 1.10 },
  polkadot: { usd: 6.25, usd_24h_change: -2.30 },
  "avalanche-2": { usd: 28.90, usd_24h_change: 5.40 },
  chainlink: { usd: 14.15, usd_24h_change: 0.85 },
  optimism: { usd: 1.85, usd_24h_change: -3.60 }
};

// Fallback dynamic historical chart data generator based on timeframe
const getMockHistoricalData = (assetId, currentPrice, change24h, timeframe) => {
  const data = [];
  const now = new Date();
  const basePrice = currentPrice || 100;
  const trendPercent = (change24h || 0) / 100;
  
  let points = 7;
  let stepMs = 24 * 60 * 60 * 1000; // 1 day in ms
  
  if (timeframe === 1) {
    points = 24;
    stepMs = 60 * 60 * 1000; // 1 hour in ms
  } else if (timeframe === 7) {
    points = 7;
    stepMs = 24 * 60 * 60 * 1000; // 1 day in ms
  } else if (timeframe === 30) {
    points = 30;
    stepMs = 24 * 60 * 60 * 1000; // 1 day in ms
  } else if (timeframe === 365) {
    points = 12;
    stepMs = 30 * 24 * 60 * 60 * 1000; // ~30 days in ms
  }
  
  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * stepMs);
    const timestamp = date.getTime();
    
    let priceVal = basePrice;
    if (i > 0) {
      const randomFactor = 1 + (Math.random() - 0.5) * 0.04 - (i * trendPercent * 0.008);
      priceVal = basePrice * randomFactor;
    }
    
    data.push({
      timestamp,
      price: parseFloat(priceVal.toFixed(priceVal >= 1000 ? 2 : 4))
    });
  }
  return data;
};

export default function Prices() {
  const [prices, setPrices] = useState({
    bitcoin: { usd: null, usd_24h_change: null },
    ethereum: { usd: null, usd_24h_change: null },
    arbitrum: { usd: null, usd_24h_change: null },
    solana: { usd: null, usd_24h_change: null },
    cardano: { usd: null, usd_24h_change: null },
    ripple: { usd: null, usd_24h_change: null },
    polkadot: { usd: null, usd_24h_change: null },
    "avalanche-2": { usd: null, usd_24h_change: null },
    chainlink: { usd: null, usd_24h_change: null },
    optimism: { usd: null, usd_24h_change: null }
  });
  
  const [status, setStatus] = useState('CONNECTED');
  const [isFetching, setIsFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');

  // Trend graph modal states
  const [activeChartAsset, setActiveChartAsset] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [chartTimeframe, setChartTimeframe] = useState(1);

  const fetchPrices = async () => {
    setIsFetching(true);
    setStatus('FETCHING...');
    
    const ids = ASSETS.map(a => a.id).join(',');
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('API Response Error');
      const data = await response.json();
      
      const newPrices = { ...prices };
      ASSETS.forEach(asset => {
        if (data[asset.id]) {
          newPrices[asset.id] = data[asset.id];
        }
      });
      setPrices(newPrices);
      setStatus('CONNECTED');
    } catch (error) {
      console.error('Fetch error, falling back to mock data:', error);
      setPrices(MOCK_DATA);
      setStatus('CONNECTED (DEMO_MODE)');
    } finally {
      setTimeout(() => {
        setIsFetching(false);
      }, 400);
    }
  };

  // Helper to format timestamps based on active timeframe
  const formatTimestamp = (timestamp, timeframe) => {
    const date = new Date(timestamp);
    if (timeframe === 1) {
      // 24H View: Strictly display localized time (e.g., HH:MM AM/PM)
      return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    } else if (timeframe === 7 || timeframe === 30) {
      // 7D & 1M Views: Display Date and Hour (e.g., MM/DD HH:00)
      const mm = (date.getMonth() + 1).toString().padStart(2, '0');
      const dd = date.getDate().toString().padStart(2, '0');
      const hh = date.getHours().toString().padStart(2, '0');
      return `${mm}/${dd} ${hh}:00`;
    } else {
      // 1Y View: Display only the Date (e.g., MM/DD/YYYY)
      const mm = (date.getMonth() + 1).toString().padStart(2, '0');
      const dd = date.getDate().toString().padStart(2, '0');
      const yyyy = date.getFullYear();
      return `${mm}/${dd}/${yyyy}`;
    }
  };

  const fetchHistoricalData = async (asset, timeframe) => {
    setChartLoading(true);
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${asset.id}/market_chart?vs_currency=usd&days=${timeframe}`;
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('History Fetch Error');
      const data = await response.json();
      
      if (data.prices && Array.isArray(data.prices)) {
        const parsed = data.prices.map(([timestamp, price]) => ({
          timestamp,
          price: parseFloat(price.toFixed(price >= 1000 ? 2 : 4))
        }));
        
        // De-duplicate by formatted date representation to prevent duplicate labels on X-axis
        const uniqueParsed = [];
        const seenDates = new Set();
        parsed.forEach(item => {
          const formatted = formatTimestamp(item.timestamp, timeframe);
          if (!seenDates.has(formatted)) {
            seenDates.add(formatted);
            uniqueParsed.push(item);
          }
        });
        setHistoricalData(uniqueParsed);
      } else {
        throw new Error('Malformed chart response');
      }
    } catch (error) {
      console.error('Fetch chart error, generating mock trend lines:', error);
      const currentPrice = prices[asset.id]?.usd || MOCK_DATA[asset.id]?.usd || 100;
      const change24h = prices[asset.id]?.usd_24h_change || MOCK_DATA[asset.id]?.usd_24h_change || 0;
      const mockPoints = getMockHistoricalData(asset.id, currentPrice, change24h, timeframe);
      setHistoricalData(mockPoints);
    } finally {
      setChartLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeChartAsset) {
      fetchHistoricalData(activeChartAsset, chartTimeframe);
    }
  }, [activeChartAsset, chartTimeframe]);

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

  // Filter Logic
  const filteredAssets = ASSETS.filter(asset => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      
    const price = prices[asset.id]?.usd;
    let matchesPrice = true;
    
    if (priceFilter === 'under_1') {
      matchesPrice = price !== null && price !== undefined && price < 1;
    } else if (priceFilter === '1_to_100') {
      matchesPrice = price !== null && price !== undefined && price >= 1 && price <= 100;
    } else if (priceFilter === '100_to_1000') {
      matchesPrice = price !== null && price !== undefined && price > 100 && price <= 1000;
    } else if (priceFilter === 'over_1000') {
      matchesPrice = price !== null && price !== undefined && price > 1000;
    }
    
    return matchesSearch && matchesPrice;
  });

  // Calculate 7-day trend direction for styling modal graph colors
  const getTrendDirection = () => {
    if (historicalData.length < 2) return true;
    const first = historicalData[0].price;
    const last = historicalData[historicalData.length - 1].price;
    return last >= first;
  };

  const isTrendUp = getTrendDirection();
  const strokeColor = isTrendUp ? '#00E5FF' : '#FF003C';

  // Custom Terminal Tooltip component for Recharts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid var(--border-color)',
          padding: '0.75rem 1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: '#eaeaea',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.7)'
        }}>
          <p style={{ margin: 0, color: 'var(--accent-blue)' }}>{`SYS_COORD_DAT: ${formatTimestamp(data.timestamp, chartTimeframe)}`}</p>
          <p style={{ margin: '0.25rem 0 0 0' }}>
            {`PRICE_USD: $${payload[0].value.toLocaleString(undefined, { 
              minimumFractionDigits: payload[0].value >= 1000 ? 2 : 4,
              maximumFractionDigits: payload[0].value >= 1000 ? 2 : 4 
            })}`}
          </p>
        </div>
      );
    }
    return null;
  };

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

          {/* Search & Filter Toolbar */}
          <div className="prices-toolbar" id="prices-controls-toolbar">
            <div className="prices-toolbar-item">
              <label htmlFor="search-input">Search Asset</label>
              <input 
                type="text" 
                id="search-input" 
                className="terminal-input"
                placeholder="Search by name or ticker..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
            </div>
            
            <div className="prices-toolbar-item">
              <label htmlFor="price-filter-select">Price Range (USD)</label>
              <select 
                id="price-filter-select" 
                className="terminal-select"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="under_1">Under $1.00</option>
                <option value="1_to_100">$1.00 - $100.00</option>
                <option value="100_to_1000">$100.00 - $1,000.00</option>
                <option value="over_1000">Over $1,000.00</option>
              </select>
            </div>
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
                  <th scope="col" className="num" style={{ textAlign: 'center' }}>Price Trend</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.length > 0 ? (
                  filteredAssets.map(asset => {
                    const priceData = prices[asset.id] || { usd: null, usd_24h_change: null };
                    const changeFormat = formatChange(priceData.usd_24h_change);
                    const isPositive = priceData.usd_24h_change >= 0;
                    const trendEmoji = priceData.usd_24h_change !== null 
                      ? (isPositive ? "📈" : "📉") 
                      : "📊";
                    
                    return (
                      <tr key={asset.id} id={`row-${asset.id}`}>
                        <td>
                          <div className="coin-ticker-cell">
                            <span className="coin-ticker">{asset.name}</span>
                            <span className="coin-name">{asset.symbol.toUpperCase()}</span>
                          </div>
                        </td>
                        <td>{asset.symbol.toUpperCase()}</td>
                        <td className="num font-mono" id={`${asset.id}-price`}>
                          {formatPrice(priceData.usd)}
                        </td>
                        <td className={changeFormat.className} id={`${asset.id}-change`}>
                          {changeFormat.text}
                        </td>
                        <td className="num" style={{ textAlign: 'center' }}>
                          <div className="trend-disabled-cell">
                            <button 
                              className={`trend-active ${!isPositive ? 'trend-down' : ''}`}
                              title="Click to view interactive trend visualizer"
                              onClick={() => {
                                setChartTimeframe(1);
                                setActiveChartAsset(asset);
                              }}
                              id={`trend-btn-${asset.id}`}
                            >
                              {trendEmoji}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', padding: '2rem' }}>
                      NO_ASSETS_FOUND_MATCHING_FILTER
                    </td>
                  </tr>
                )}
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

      {/* Terminal Interactive Chart Modal */}
      {activeChartAsset && (
        <div className="terminal-modal-overlay" onClick={() => setActiveChartAsset(null)}>
          <div 
            className={`terminal-modal ${isTrendUp ? 'modal-trend-up' : 'modal-trend-down'}`} 
            onClick={(e) => e.stopPropagation()}
            id="trend-modal-content"
          >
            {/* Header */}
            <div className="modal-header">
              <div className="modal-title-wrapper">
                <span className="modal-meta">{`SYS_VISUALIZER // HISTORICAL_DATA_${chartTimeframe === 1 ? '24H' : chartTimeframe === 7 ? '7D' : chartTimeframe === 30 ? '1M' : '1Y'}`}</span>
                <h2 className="modal-title">{activeChartAsset.name} ({activeChartAsset.symbol.toUpperCase()})</h2>
              </div>
            </div>

            {/* Stats summary */}
            <div className="modal-stats">
              <div className="modal-stat-item">
                <span className="modal-stat-label">CURRENT_PRICE</span>
                <span className="modal-stat-value">
                  {formatPrice(prices[activeChartAsset.id]?.usd)}
                </span>
              </div>
              <div className="modal-stat-item">
                <span className="modal-stat-label">CHANGE_24H</span>
                <span className={`modal-stat-value ${prices[activeChartAsset.id]?.usd_24h_change >= 0 ? 'ticker-green' : 'ticker-red'}`}>
                  {formatChange(prices[activeChartAsset.id]?.usd_24h_change).text}
                </span>
              </div>
              <div className="modal-stat-item">
                <span className="modal-stat-label">{`TREND_${chartTimeframe === 1 ? '24H' : chartTimeframe === 7 ? '7D' : chartTimeframe === 30 ? '1M' : '1Y'}`}</span>
                <span className={`modal-stat-value ${isTrendUp ? 'ticker-green' : 'ticker-red'}`}>
                  {isTrendUp ? '↑ BULLISH' : '↓ BEARISH'}
                </span>
              </div>
            </div>

            {/* Timeframe controls */}
            <div className="timeframe-controls">
              <button 
                className={`timeframe-btn ${chartTimeframe === 1 ? 'active' : ''}`}
                onClick={() => setChartTimeframe(1)}
                disabled={chartLoading}
              >
                [ 24H ]
              </button>
              <button 
                className={`timeframe-btn ${chartTimeframe === 7 ? 'active' : ''}`}
                onClick={() => setChartTimeframe(7)}
                disabled={chartLoading}
              >
                [ 7D ]
              </button>
              <button 
                className={`timeframe-btn ${chartTimeframe === 30 ? 'active' : ''}`}
                onClick={() => setChartTimeframe(30)}
                disabled={chartLoading}
              >
                [ 1M ]
              </button>
              <button 
                className={`timeframe-btn ${chartTimeframe === 365 ? 'active' : ''}`}
                onClick={() => setChartTimeframe(365)}
                disabled={chartLoading}
              >
                [ 1Y ]
              </button>
            </div>

            {/* Chart stream visualizer */}
            <div className="chart-container-wrapper">
              {chartLoading ? (
                <div className="chart-loading-overlay">
                  <span>[ FETCHING_DATA... ]</span>
                </div>
              ) : (
                mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#161616" vertical={false} />
                      <XAxis 
                        dataKey="timestamp" 
                        stroke="var(--text-muted)" 
                        tickFormatter={(val) => formatTimestamp(val, chartTimeframe)}
                        tick={{ fontFamily: 'var(--font-mono)', fontSize: 9 }}
                        axisLine={{ stroke: 'var(--border-color)' }}
                        tickLine={{ stroke: 'var(--border-color)' }}
                      />
                      <YAxis 
                        domain={['auto', 'auto']}
                        stroke="var(--text-muted)" 
                        tickFormatter={(val) => '$' + val.toLocaleString(undefined, { 
                          minimumFractionDigits: val >= 1000 ? 0 : 2, 
                          maximumFractionDigits: val >= 1000 ? 0 : 2 
                        })}
                        tick={{ fontFamily: 'var(--font-mono)', fontSize: 9 }}
                        axisLine={{ stroke: 'var(--border-color)' }}
                        tickLine={{ stroke: 'var(--border-color)' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke={strokeColor} 
                        strokeWidth={2.5}
                        dot={{ r: 2, stroke: strokeColor, strokeWidth: 1, fill: '#0a0a0a' }}
                        activeDot={{ r: 5, stroke: strokeColor, strokeWidth: 1, fill: '#eaeaea' }}
                        isAnimationActive={true}
                        animationDuration={1200}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )
              )}
            </div>

            {/* Footer buttons */}
            <div className="modal-footer">
              <button 
                className="btn-terminal btn-terminal-orange" 
                onClick={() => setActiveChartAsset(null)}
                id="btn-close-modal"
              >
                <span>[ CLOSE_VISUALIZER ]</span>
                <span className="font-mono">_</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

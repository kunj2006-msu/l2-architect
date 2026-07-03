/**
 * L2_ARCHITECT - Main Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation Toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
      menuToggle.textContent = isExpanded ? 'MENU_' : 'CLOSE_';
    });
  }

  // --- Terminal System Diagnostics (Theme Enrichment) ---
  console.log(`
==================================================
  __  __     ____  _  _  ____  ____  ____  ____ 
 (  )(  )   (  __)/ )( \\(  __)/ ___)(  __)(  _ \\
  )(__)(     ) _) ) \\/ ( ) _) \\___ \\ ) _)  )   /
 (______)(_)(____)\\____/(____)(____/(____)(__\\_)
 
 >> SYSTEM: INITIALIZING L2_ARCHITECT PANEL
 >> PROTOCOL: OPTIMISTIC ROLLUPS
 >> CHAIN: ARBITRUM ONE
 >> STATUS: CONNECTED
==================================================
  `);

  // --- Hero Subheadline Subtle Typing Effect ---
  const subheadline = document.getElementById('hero-subtitle');
  if (subheadline) {
    const text = subheadline.textContent;
    subheadline.textContent = '';
    let index = 0;
    
    function typeText() {
      if (index < text.length) {
        subheadline.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 70);
      }
    }
    
    // Start typing effect with a slight delay
    setTimeout(typeText, 500);
  }

  // --- CoinGecko Price Dashboard ---
  const refreshBtn = document.getElementById('btn-refresh');
  const feedStatus = document.getElementById('feed-status-text');

  async function fetchPrices() {
    const btcPriceEl = document.getElementById('btc-price');
    const btcChangeEl = document.getElementById('btc-change');
    const ethPriceEl = document.getElementById('eth-price');
    const ethChangeEl = document.getElementById('eth-change');
    const arbPriceEl = document.getElementById('arb-price');
    const arbChangeEl = document.getElementById('arb-change');
    const btnSpan = refreshBtn.querySelector('span');

    // Update UI to loading state
    if (btnSpan) btnSpan.textContent = '[ FETCHING... ]';
    if (feedStatus) {
      feedStatus.textContent = 'FETCHING...';
    }

    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,arbitrum&vs_currencies=usd&include_24hr_change=true';

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('API Response Error');
      const data = await response.json();

      const updateCoinData = (coinId, priceEl, changeEl) => {
        if (!data[coinId] || !priceEl || !changeEl) return;
        const price = data[coinId].usd;
        const change = data[coinId].usd_24h_change;

        // Format price
        let formattedPrice = '';
        if (price >= 1000) {
          formattedPrice = '$ ' + price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } else {
          formattedPrice = '$ ' + price.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
        }
        priceEl.textContent = formattedPrice;

        // Format change
        const isPositive = change >= 0;
        const changeSign = isPositive ? '↑' : '↓';
        changeEl.textContent = `${changeSign} ${Math.abs(change).toFixed(2)} %`;
        
        // Color state
        changeEl.className = isPositive ? 'num font-mono ticker-green' : 'num font-mono ticker-red';
      };

      updateCoinData('bitcoin', btcPriceEl, btcChangeEl);
      updateCoinData('ethereum', ethPriceEl, ethChangeEl);
      updateCoinData('arbitrum', arbPriceEl, arbChangeEl);

      if (feedStatus) {
        feedStatus.textContent = 'CONNECTED';
      }
    } catch (error) {
      console.error('Fetch error:', error);
      if (feedStatus) {
        feedStatus.textContent = 'ERROR';
      }
      [btcPriceEl, btcChangeEl, ethPriceEl, ethChangeEl, arbPriceEl, arbChangeEl].forEach(el => {
        if (el) el.textContent = 'ERROR';
      });
    } finally {
      // Add a slight latency simulation for fetching effect, if it's too fast
      setTimeout(() => {
        if (btnSpan) btnSpan.textContent = '[ REFRESH_DATA ]';
      }, 400);
    }
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', fetchPrices);
    // Initial fetch on page load
    fetchPrices();
  }

  // --- Block Simulator ---
  const block1Data = document.getElementById('block1-data');
  if (block1Data) {
    initSimulator();
  }

  function initSimulator() {
    const b1Data = document.getElementById('block1-data');
    const b1Prev = document.getElementById('block1-prev');
    const b1Nonce = document.getElementById('block1-nonce');
    const b1Hash = document.getElementById('block1-hash');
    const b1Panel = document.getElementById('block1-panel');
    const b1Status = document.getElementById('block1-status');
    const b1Mine = document.getElementById('block1-mine');

    const b2Data = document.getElementById('block2-data');
    const b2Prev = document.getElementById('block2-prev');
    const b2Nonce = document.getElementById('block2-nonce');
    const b2Hash = document.getElementById('block2-hash');
    const b2Panel = document.getElementById('block2-panel');
    const b2Status = document.getElementById('block2-status');
    const b2Mine = document.getElementById('block2-mine');

    // SHA-256 Async Helper utilizing crypto.subtle
    async function sha256(message) {
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Recalculates hash links and sets VALID / INVALID statuses
    async function updateChain() {
      // Block 1: Hash = sha256(nonce + data + previous)
      const data1 = b1Data.value;
      const prev1 = b1Prev.value;
      const nonce1 = b1Nonce.value;
      const hash1 = await sha256(nonce1 + data1 + prev1);
      
      b1Hash.value = hash1;
      const isB1Valid = hash1.startsWith('00');
      
      if (isB1Valid) {
        b1Panel.className = 'block-panel block-valid';
        b1Status.textContent = 'VALID';
      } else {
        b1Panel.className = 'block-panel block-invalid';
        b1Status.textContent = 'INVALID';
      }

      // Chain Link propagation: Block 2 previous hash always matches Block 1 current hash
      b2Prev.value = hash1;

      // Block 2: Hash = sha256(nonce + data + previous)
      const data2 = b2Data.value;
      const prev2 = hash1;
      const nonce2 = b2Nonce.value;
      const hash2 = await sha256(nonce2 + data2 + prev2);

      b2Hash.value = hash2;
      
      // Block 2 is only cryptographically valid if its own hash fits difficulty and parent block is valid
      const isB2Valid = hash2.startsWith('00') && isB1Valid;

      if (isB2Valid) {
        b2Panel.className = 'block-panel block-valid';
        b2Status.textContent = 'VALID';
      } else {
        b2Panel.className = 'block-panel block-invalid';
        b2Status.textContent = 'INVALID';
      }
    }

    // Mine Block 1
    b1Mine.addEventListener('click', async () => {
      b1Mine.disabled = true;
      b1Mine.querySelector('span').textContent = '[ MINING... ]';
      
      const data1 = b1Data.value;
      const prev1 = b1Prev.value;
      let nonce = 0;
      let hash = '';

      while (true) {
        hash = await sha256(nonce + data1 + prev1);
        if (hash.startsWith('00')) break;
        nonce++;
      }

      b1Nonce.value = nonce;
      await updateChain();

      b1Mine.disabled = false;
      b1Mine.querySelector('span').textContent = '[ MINE_BLOCK ]';
    });

    // Mine Block 2
    b2Mine.addEventListener('click', async () => {
      b2Mine.disabled = true;
      b2Mine.querySelector('span').textContent = '[ MINING... ]';

      const data2 = b2Data.value;
      const prev2 = b2Prev.value;
      let nonce = 0;
      let hash = '';

      while (true) {
        hash = await sha256(nonce + data2 + prev2);
        if (hash.startsWith('00')) break;
        nonce++;
      }

      b2Nonce.value = nonce;
      await updateChain();

      b2Mine.disabled = false;
      b2Mine.querySelector('span').textContent = '[ MINE_BLOCK ]';
    });

    // Bind real-time input data listening
    b1Data.addEventListener('input', updateChain);
    b2Data.addEventListener('input', updateChain);

    // Initial cycle to compute valid state on load
    updateChain();
  }
});



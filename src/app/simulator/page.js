'use client';

import { useState, useEffect } from 'react';

export default function Simulator() {
  const [b1Data, setB1Data] = useState('');
  const [b1Nonce, setB1Nonce] = useState(0);
  const [b1Hash, setB1Hash] = useState('');

  const [b2Data, setB2Data] = useState('');
  const [b2Nonce, setB2Nonce] = useState(0);
  const [b2Hash, setB2Hash] = useState('');

  const [isB1Mining, setIsB1Mining] = useState(false);
  const [isB2Mining, setIsB2Mining] = useState(false);

  // SHA-256 Async Helper
  const sha256 = async (message) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // Reactive hash link updates
  useEffect(() => {
    let active = true;
    const updateChain = async () => {
      const prev1 = '0000000000000000';
      const hash1 = await sha256(b1Nonce + b1Data + prev1);
      if (!active) return;
      setB1Hash(hash1);

      const hash2 = await sha256(b2Nonce + b2Data + hash1);
      if (!active) return;
      setB2Hash(hash2);
    };

    updateChain();
    return () => { active = false; };
  }, [b1Data, b1Nonce, b2Data, b2Nonce]);

  // Mine Block 1
  const mineBlock1 = async () => {
    setIsB1Mining(true);
    const prev1 = '0000000000000000';
    let nonce = 0;
    let hash = '';
    
    while (true) {
      hash = await sha256(nonce + b1Data + prev1);
      if (hash.startsWith('00')) break;
      nonce++;
    }

    setB1Nonce(nonce);
    setIsB1Mining(false);
  };

  // Mine Block 2
  const mineBlock2 = async () => {
    setIsB2Mining(true);
    let nonce = 0;
    let hash = '';
    
    while (true) {
      hash = await sha256(nonce + b2Data + b1Hash);
      if (hash.startsWith('00')) break;
      nonce++;
    }

    setB2Nonce(nonce);
    setIsB2Mining(false);
  };

  // Validation Border Status checks
  const isB1Valid = b1Hash.startsWith('00');
  const isB2Valid = b2Hash.startsWith('00') && isB1Valid;

  return (
    <main>
      {/* Simulator Section */}
      <section className="simulator-section" id="simulator">
        <div className="section-container">
          <div className="section-header">
            <div className="section-meta">SYS_SIMULATOR: PROOF_OF_WORK</div>
            <h1 className="section-title" id="simulator-title">Cryptographic Block Simulator</h1>
          </div>

          {/* Chain Wrapper with dashed connector line */}
          <div className="chain-wrapper">
            <div className="chain-link-line"></div>
            
            <div className="chain-container" id="chain-container">
              {/* BLOCK 1 Panel */}
              <div className={`block-panel ${isB1Valid ? 'block-valid' : 'block-invalid'}`} id="block1-panel">
                <div className="block-panel-header">
                  <span className="block-title">BLOCK #1</span>
                  <span className="block-status-badge" id="block1-status">
                    {isB1Valid ? 'VALID' : 'INVALID'}
                  </span>
                </div>
                
                {/* Data Field */}
                <div className="block-field">
                  <label htmlFor="block1-data">Data (payload):</label>
                  <input 
                    type="text" 
                    id="block1-data" 
                    placeholder="Type data here..." 
                    value={b1Data}
                    onChange={(e) => setB1Data(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                {/* Previous Hash */}
                <div className="block-field">
                  <label htmlFor="block1-prev">Previous Hash:</label>
                  <input 
                    type="text" 
                    id="block1-prev" 
                    className="hash-display" 
                    value="0000000000000000" 
                    readOnly 
                  />
                </div>

                {/* Nonce */}
                <div className="block-field">
                  <label htmlFor="block1-nonce">Nonce:</label>
                  <input 
                    type="text" 
                    id="block1-nonce" 
                    value={b1Nonce} 
                    readOnly 
                  />
                </div>

                {/* Current Hash */}
                <div className="block-field">
                  <label htmlFor="block1-hash">Current Hash:</label>
                  <input 
                    type="text" 
                    id="block1-hash" 
                    className="hash-display" 
                    value={b1Hash}
                    readOnly 
                  />
                </div>

                {/* Mine Button */}
                <button 
                  className="btn-terminal btn-terminal-orange" 
                  id="block1-mine"
                  onClick={mineBlock1}
                  disabled={isB1Mining}
                >
                  <span>{isB1Mining ? '[ MINING... ]' : '[ MINE_BLOCK ]'}</span>
                  <span className="font-mono">_</span>
                </button>
              </div>

              {/* BLOCK 2 Panel */}
              <div className={`block-panel ${isB2Valid ? 'block-valid' : 'block-invalid'}`} id="block2-panel">
                <div className="block-panel-header">
                  <span className="block-title">BLOCK #2</span>
                  <span className="block-status-badge" id="block2-status">
                    {isB2Valid ? 'VALID' : 'INVALID'}
                  </span>
                </div>
                
                {/* Data Field */}
                <div className="block-field">
                  <label htmlFor="block2-data">Data (payload):</label>
                  <input 
                    type="text" 
                    id="block2-data" 
                    placeholder="Type data here..." 
                    value={b2Data}
                    onChange={(e) => setB2Data(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                {/* Previous Hash */}
                <div className="block-field">
                  <label htmlFor="block2-prev">Previous Hash:</label>
                  <input 
                    type="text" 
                    id="block2-prev" 
                    className="hash-display" 
                    value={b1Hash}
                    readOnly 
                  />
                </div>

                {/* Nonce */}
                <div className="block-field">
                  <label htmlFor="block2-nonce">Nonce:</label>
                  <input 
                    type="text" 
                    id="block2-nonce" 
                    value={b2Nonce} 
                    readOnly 
                  />
                </div>

                {/* Current Hash */}
                <div className="block-field">
                  <label htmlFor="block2-hash">Current Hash:</label>
                  <input 
                    type="text" 
                    id="block2-hash" 
                    className="hash-display" 
                    value={b2Hash}
                    readOnly 
                  />
                </div>

                {/* Mine Button */}
                <button 
                  className="btn-terminal btn-terminal-orange" 
                  id="block2-mine"
                  onClick={mineBlock2}
                  disabled={isB2Mining}
                >
                  <span>{isB2Mining ? '[ MINING... ]' : '[ MINE_BLOCK ]'}</span>
                  <span className="font-mono">_</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

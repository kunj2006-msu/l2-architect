'use client';

import { useState, useEffect } from 'react';

// SHA-256 Async Helper
const sha256 = async (message) => {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

function Block({
  id,
  data,
  nonce,
  previousHash,
  onDataChange,
  onNonceChange,
  onHashChange,
  isValid
}) {
  const [currentHash, setCurrentHash] = useState('');
  const [isMining, setIsMining] = useState(false);

  // Passive real-time hashing effect throttled with debounce
  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      const nonceVal = nonce === '' ? 0 : nonce;
      const calculatedHash = await sha256(nonceVal + data + previousHash);
      if (active) {
        setCurrentHash(calculatedHash);
        onHashChange(calculatedHash);
      }
    }, 50);

    return () => {
      active = false;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, nonce, previousHash]);

  const handleMine = async () => {
    setIsMining(true);
    let currentNonce = 0;
    let calculatedHash = '';
    while (true) {
      calculatedHash = await sha256(currentNonce + data + previousHash);
      if (calculatedHash.startsWith('00')) {
        break;
      }
      currentNonce++;
    }
    setIsMining(false);
    onNonceChange(currentNonce);
  };

  return (
    <div className={`block-panel ${isValid ? 'block-valid' : 'block-invalid'}`} id={`block${id}-panel`}>
      <div className="block-panel-header">
        <span className="block-title">BLOCK #{id}</span>
        <span className="block-status-badge" id={`block${id}-status`}>
          {isValid ? 'VALID' : 'INVALID'}
        </span>
      </div>
      
      {/* Data Field */}
      <div className="block-field">
        <label htmlFor={`block${id}-data`}>Data (payload):</label>
        <input 
          type="text" 
          id={`block${id}-data`} 
          placeholder="Type data here..." 
          value={data}
          onChange={(e) => onDataChange(e.target.value)}
          autoComplete="off"
        />
      </div>

      {/* Previous Hash */}
      <div className="block-field">
        <label htmlFor={`block${id}-prev`}>Previous Hash:</label>
        <input 
          type="text" 
          id={`block${id}-prev`} 
          className="hash-display" 
          value={previousHash} 
          readOnly 
        />
      </div>

      {/* Nonce */}
      <div className="block-field">
        <label htmlFor={`block${id}-nonce`}>Nonce:</label>
        <input 
          type="text" 
          id={`block${id}-nonce`} 
          value={nonce} 
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            onNonceChange(val === '' ? '' : parseInt(val, 10));
          }}
        />
      </div>

      {/* Current Hash */}
      <div className="block-field">
        <label htmlFor={`block${id}-hash`}>Current Hash:</label>
        <input 
          type="text" 
          id={`block${id}-hash`} 
          className="hash-display" 
          value={currentHash}
          readOnly 
        />
      </div>

      {/* Mine Button */}
      <button 
        className="btn-terminal btn-terminal-orange" 
        id={`block${id}-mine`}
        onClick={handleMine}
        disabled={isMining}
      >
        <span>{isMining ? '[ MINING... ]' : '[ MINE_BLOCK ]'}</span>
        <span className="font-mono">_</span>
      </button>
    </div>
  );
}

export default function Simulator() {
  const [blocks, setBlocks] = useState([
    { id: 1, data: '', nonce: 0, hash: '' },
    { id: 2, data: '', nonce: 0, hash: '' },
    { id: 3, data: '', nonce: 0, hash: '' },
    { id: 4, data: '', nonce: 0, hash: '' },
    { id: 5, data: '', nonce: 0, hash: '' },
  ]);

  const updateBlockField = (index, field, value) => {
    setBlocks(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  // Helper to determine if a block is valid
  const getBlockValidity = (index) => {
    const hash = blocks[index].hash;
    const isValidPoW = hash.startsWith('00');
    
    if (index === 0) {
      return isValidPoW;
    }
    
    return isValidPoW && getBlockValidity(index - 1);
  };

  return (
    <main>
      {/* Simulator Section */}
      <section className="simulator-section" id="simulator">
        <div className="section-container">
          <div className="section-header">
            <div className="section-meta">SYS_SIMULATOR: PROOF_OF_WORK</div>
            <h1 className="section-title" id="simulator-title">Cryptographic Block Simulator</h1>
          </div>

          {/* Chain Wrapper */}
          <div className="chain-wrapper">
            <div className="chain-container" id="chain-container">
              
              {blocks.map((block, index) => {
                const isValid = getBlockValidity(index);
                const prevHash = index === 0 ? '0000000000000000' : blocks[index - 1].hash;
                
                return (
                  <Block
                    key={block.id}
                    id={block.id}
                    data={block.data}
                    nonce={block.nonce}
                    previousHash={prevHash}
                    isValid={isValid}
                    onDataChange={(val) => updateBlockField(index, 'data', val)}
                    onNonceChange={(val) => updateBlockField(index, 'nonce', val)}
                    onHashChange={(val) => updateBlockField(index, 'hash', val)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

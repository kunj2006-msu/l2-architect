'use client';

import { useState, useEffect } from 'react';

const CONCEPTS_DATA = [
  {
    id: "web2-web3",
    metaTitle: "SYS_DICTIONARY: CORE_CONCEPTS // MATRIX_01_OF_04",
    left: {
      meta: "REF_01A // CENTRALIZED",
      title: "Web2_Tech",
      points: [
        "Centralized servers managed by tech conglomerates.",
        "User identities are leased (Google/Meta login credentials).",
        "Closed data silos monetized through advertising."
      ]
    },
    right: {
      meta: "REF_01B // DECENTRALIZED",
      title: "Web3_Tech",
      points: [
        "Decentralized node execution on global consensus.",
        "Self-sovereign cryptographic wallets manage identity.",
        "Open-source, permissionless state and asset layers."
      ]
    }
  },
  {
    id: "btc-eth",
    metaTitle: "SYS_DICTIONARY: CORE_CONCEPTS // MATRIX_02_OF_04",
    left: {
      meta: "REF_02A // PAYMENT_LEDGER",
      title: "Bitcoin",
      points: [
        "Optimized as digital gold and decentralized value store.",
        "Employs UTXO model for secure, simple balance ledger.",
        "Proof of Work consensus with highly rigid script capabilities."
      ]
    },
    right: {
      meta: "REF_02B // APPS_PLATFORM",
      title: "Ethereum",
      points: [
        "Programmed as a Turing-complete global state machine.",
        "Employs account-based model supporting rich state memory.",
        "Executes decentralized smart contracts via the EVM."
      ]
    }
  },
  {
    id: "keys",
    metaTitle: "SYS_DICTIONARY: CORE_CONCEPTS // MATRIX_03_OF_04",
    left: {
      meta: "REF_03A // SHAREABLE",
      title: "Public_Key",
      points: [
        "Derives your public wallet address (shareable with anyone).",
        "Acts like an email address to identify payment destinations.",
        "Encrypts messages and validates signatures cryptographically."
      ]
    },
    right: {
      meta: "REF_03B // CONFIDENTIAL",
      title: "Private_Key",
      points: [
        "Secret, highly sensitive key that grants asset control.",
        "Authorizes transactions via unique cryptographic signatures.",
        "If lost, assets are permanently unrecoverable."
      ]
    }
  },
  {
    id: "dbs",
    metaTitle: "SYS_DICTIONARY: CORE_CONCEPTS // MATRIX_04_OF_04",
    left: {
      meta: "REF_04A // APPEND_ONLY",
      title: "Blockchain",
      points: [
        "Append-only cryptographically linked blocks of data.",
        "Decentralized consensus dictates validation without authority.",
        "Extreme immutability at the cost of execution latency."
      ]
    },
    right: {
      meta: "REF_04B // RELATIONAL",
      title: "Traditional_DB",
      points: [
        "Full CRUD operations allowed (Create, Read, Update, Delete).",
        "Centralized administration handles writes and overrides.",
        "Extremely high speed and throughput with zero consensus delay."
      ]
    }
  }
];

export default function ConceptsClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [leftTyped, setLeftTyped] = useState([null, null, null]);
  const [rightTyped, setRightTyped] = useState([null, null, null]);

  // Handle slide changing
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? CONCEPTS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === CONCEPTS_DATA.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const activeData = CONCEPTS_DATA[currentIndex];

    // Reset typing states: null means not started yet (invisible to prevent layout shift)
    setLeftTyped([null, null, null]);
    setRightTyped([null, null, null]);

    const leftPoints = activeData.left.points;
    const rightPoints = activeData.right.points;

    let leftItemIndex = 0;
    let leftCharIndex = 0;
    let rightItemIndex = 0;
    let rightCharIndex = 0;

    let leftTimeout = null;
    let rightTimeout = null;

    // Type Left Column
    const typeLeft = () => {
      if (leftItemIndex < leftPoints.length) {
        const fullText = leftPoints[leftItemIndex];

        // Ensure array slot is initialized to an empty string on first character
        setLeftTyped((prev) => {
          const next = [...prev];
          if (next[leftItemIndex] === null) {
            next[leftItemIndex] = "";
          }
          next[leftItemIndex] = fullText.substring(0, leftCharIndex + 1);
          return next;
        });

        if (leftCharIndex < fullText.length - 1) {
          leftCharIndex++;
          leftTimeout = setTimeout(typeLeft, 50); // fast cyberpunk typing speed
        } else {
          // Finished typing this point, proceed to the next after a tiny delay
          leftItemIndex++;
          leftCharIndex = 0;
          leftTimeout = setTimeout(typeLeft, 100);
        }
      }
    };

    // Type Right Column
    const typeRight = () => {
      if (rightItemIndex < rightPoints.length) {
        const fullText = rightPoints[rightItemIndex];

        // Ensure array slot is initialized to an empty string on first character
        setRightTyped((prev) => {
          const next = [...prev];
          if (next[rightItemIndex] === null) {
            next[rightItemIndex] = "";
          }
          next[rightItemIndex] = fullText.substring(0, rightCharIndex + 1);
          return next;
        });

        if (rightCharIndex < fullText.length - 1) {
          rightCharIndex++;
          rightTimeout = setTimeout(typeRight, 50); // fast cyberpunk typing speed
        } else {
          // Finished typing this point, proceed to the next after a tiny delay
          rightItemIndex++;
          rightCharIndex = 0;
          rightTimeout = setTimeout(typeRight, 100);
        }
      }
    };

    // Kick off typing simultaneously in both columns with a small delay
    leftTimeout = setTimeout(typeLeft, 300);
    rightTimeout = setTimeout(typeRight, 300);

    return () => {
      clearTimeout(leftTimeout);
      clearTimeout(rightTimeout);
    };
  }, [currentIndex]);

  const card = CONCEPTS_DATA[currentIndex];

  return (
    <main>
      <section className="concepts-section" id="concepts">
        <div className="section-container">
          <div className="section-header">
            <div className="section-meta">{card.metaTitle}</div>
            <h1 className="section-title" id="concepts-title">Split-Pane Comparison Matrix</h1>
          </div>

          <div className="matrix-slider-container">
            {/* Previous button on the left side */}
            <button
              className="slider-arrow arrow-left"
              onClick={handlePrev}
              aria-label="Previous comparison matrix"
              id="btn-matrix-prev"
            >
              &lt;
            </button>

            {/* Active Card Content */}
            <div className="active-card-wrapper">
              <div className="split-matrix-card" id={`card-${card.id}`}>
                {/* Left Column */}
                <div className="matrix-pane matrix-pane-left" id={`pane-${card.id}-left`}>
                  <div className="matrix-pane-meta">{card.left.meta}</div>
                  <h3 className="matrix-pane-title">{card.left.title}</h3>
                  <ul className="matrix-pane-list">
                    {card.left.points.map((point, idx) => {
                      const isVisible = leftTyped[idx] !== null;
                      const isCurrentlyTyping = isVisible && leftTyped[idx].length < point.length;
                      return (
                        <li key={idx} style={{ opacity: isVisible ? 1 : 0 }}>
                          {leftTyped[idx] || ""}
                          {isCurrentlyTyping && <span className="typing-cursor">_</span>}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Right Column */}
                <div className="matrix-pane matrix-pane-right" id={`pane-${card.id}-right`}>
                  <div className="matrix-pane-meta">{card.right.meta}</div>
                  <h3 className="matrix-pane-title">{card.right.title}</h3>
                  <ul className="matrix-pane-list">
                    {card.right.points.map((point, idx) => {
                      const isVisible = rightTyped[idx] !== null;
                      const isCurrentlyTyping = isVisible && rightTyped[idx].length < point.length;
                      return (
                        <li key={idx} style={{ opacity: isVisible ? 1 : 0 }}>
                          {rightTyped[idx] || ""}
                          {isCurrentlyTyping && <span className="typing-cursor">_</span>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* Next button on the right side */}
            <button
              className="slider-arrow arrow-right"
              onClick={handleNext}
              aria-label="Next comparison matrix"
              id="btn-matrix-next"
            >
              &gt;
            </button>
          </div>

          {/* Dots pagination */}
          <div className="matrix-pagination">
            {CONCEPTS_DATA.map((_, index) => (
              <button
                key={index}
                className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Navigate to matrix ${index + 1}`}
                id={`btn-matrix-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

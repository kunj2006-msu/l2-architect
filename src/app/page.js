'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const PROBLEM_POINTS = [
  "High Gas Fees: Bidding wars during peak hours push fees to $50+ per trade.",
  "Low Throughput: The base layer handles only ~15 transactions per second.",
  "Slow Confirmation Times: Blocks take averages of 12 seconds to clear."
];

const SOLUTION_POINTS = [
  "Fractional Cent Fees: Transaction execution cost is slashed by up to 95%.",
  "High Throughput: Supports thousands of transactions per second (TPS).",
  "Ethereum-Grade Security: Cryptographic assertions preserve L1 trustlessness."
];

export default function Home() {
  const [typedTitle1, setTypedTitle1] = useState('');
  const [typedTitle2, setTypedTitle2] = useState('');
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [typedDesc, setTypedDesc] = useState('');
  const [showDiagram, setShowDiagram] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [heroFinished, setHeroFinished] = useState(false);

  const titlePart1 = "Scaling Ethereum";
  const titlePart2 = "with Arbitrum.";
  const subtitleText = "Understanding Layer 2 Rollups";
  const descriptionText = "Arbitrum is a suite of Ethereum scaling solutions making transactions fast and cheap. By rolling up hundreds of transactions into a single batch on Layer 1, Arbitrum provides massive throughput without compromising on Ethereum's base layer security.";

  // Scroll revealed states
  const sectionRef = useRef(null);
  const [problemTyped, setProblemTyped] = useState([null, null, null]);
  const [solutionTyped, setSolutionTyped] = useState([null, null, null]);
  const [hasTriggeredWhy, setHasTriggeredWhy] = useState(false);

  useEffect(() => {
    let idx1 = 0;
    let idx2 = 0;
    let idx3 = 0;
    let idx4 = 0;

    const typeLine1 = () => {
      if (idx1 < titlePart1.length) {
        setTypedTitle1(titlePart1.substring(0, idx1 + 1));
        idx1++;
        setTimeout(typeLine1, 30);
      } else {
        setTimeout(typeLine2, 100);
      }
    };

    const typeLine2 = () => {
      if (idx2 < titlePart2.length) {
        setTypedTitle2(titlePart2.substring(0, idx2 + 1));
        idx2++;
        setTimeout(typeLine2, 30);
      } else {
        setTimeout(typeSubtitle, 150);
      }
    };

    const typeSubtitle = () => {
      if (idx3 < subtitleText.length) {
        setTypedSubtitle(subtitleText.substring(0, idx3 + 1));
        idx3++;
        setTimeout(typeSubtitle, 40);
      } else {
        // Subtitle typing completed. Trigger diagram fade-in and description typing.
        setShowDiagram(true);
        setTimeout(typeDesc, 200);
      }
    };

    const typeDesc = () => {
      if (idx4 < descriptionText.length) {
        setTypedDesc(descriptionText.substring(0, idx4 + 1));
        idx4++;
        setTimeout(typeDesc, 8); // fast typing speed for the paragraph block
      } else {
        // Description completed. Show action buttons and allow scroll observer to bind.
        setShowButtons(true);
        setHeroFinished(true);
      }
    };

    typeLine1();
  }, []);

  useEffect(() => {
    if (!heroFinished || hasTriggeredWhy) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasTriggeredWhy(true);
          startWhyTyping();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [heroFinished, hasTriggeredWhy]);

  const startWhyTyping = () => {
    let probItemIdx = 0;
    let probCharIdx = 0;
    let solItemIdx = 0;
    let solCharIdx = 0;

    const typeProblem = () => {
      if (probItemIdx < PROBLEM_POINTS.length) {
        const fullText = PROBLEM_POINTS[probItemIdx];
        setProblemTyped((prev) => {
          const next = [...prev];
          if (next[probItemIdx] === null) {
            next[probItemIdx] = "";
          }
          next[probItemIdx] = fullText.substring(0, probCharIdx + 1);
          return next;
        });

        if (probCharIdx < fullText.length - 1) {
          probCharIdx++;
          setTimeout(typeProblem, 15);
        } else {
          probItemIdx++;
          probCharIdx = 0;
          setTimeout(typeProblem, 100);
        }
      }
    };

    const typeSolution = () => {
      if (solItemIdx < SOLUTION_POINTS.length) {
        const fullText = SOLUTION_POINTS[solItemIdx];
        setSolutionTyped((prev) => {
          const next = [...prev];
          if (next[solItemIdx] === null) {
            next[solItemIdx] = "";
          }
          next[solItemIdx] = fullText.substring(0, solCharIdx + 1);
          return next;
        });

        if (solCharIdx < fullText.length - 1) {
          solCharIdx++;
          setTimeout(typeSolution, 15);
        } else {
          solItemIdx++;
          solCharIdx = 0;
          setTimeout(typeSolution, 100);
        }
      }
    };

    setTimeout(typeProblem, 100);
    setTimeout(typeSolution, 100);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="section-container hero-content">
          <div className="section-meta">SYS_STATUS: ACTIVE</div>
          <h1 className="hero-title" id="hero-title">
            {typedTitle1}
            {typedTitle1.length >= titlePart1.length && <br />}
            {typedTitle2.substring(0, 5)}
            {typedTitle2.length > 5 && <span className="text-accent-blue">{typedTitle2.substring(5)}</span>}
          </h1>
          <div className="hero-subtitle" id="hero-subtitle">
            {typedSubtitle}
            {typedSubtitle.length > 0 && typedSubtitle.length < subtitleText.length && <span className="typing-cursor">_</span>}
          </div>
          <p
            className="hero-desc"
            id="hero-description"
            style={{
              opacity: showDiagram ? 1 : 0,
              transition: 'opacity 0.5 s ease-in-out'
            }}
          >
            {typedDesc}
            {typedDesc.length > 0 && typedDesc.length < descriptionText.length && <span className="typing-cursor">_</span>}
          </p>
          <div
            className="terminal-controls"
            style={{
              opacity: showButtons ? 1 : 0,
              transform: showButtons ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <Link href="/concepts" className="btn-terminal" id="btn-explore-specs">
              <span>EXPLORE_SPECS</span>
              <span className="font-mono">»</span>
            </Link>
            <Link href="/simulator" className="btn-terminal btn-terminal-orange" id="btn-run-sim">
              <span>RUN_SIMULATOR</span>
              <span className="font-mono">_</span>
            </Link>
          </div>
        </div>

        <div
          className="hero-graphic-container"
          id="hero-graphic"
          style={{
            opacity: showDiagram ? 1 : 0,
            transform: showDiagram ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div className="blueprint-graphic">
            <div className="blueprint-grid-back"></div>
            {/* Custom Layer 2 Rollup Diagram SVG */}
            <svg className="rollup-block-graphic" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="blue-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="orange-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF5E00" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FF5E00" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Connection Lines / Data Flow */}
              <path d="M 120 120 L 200 170" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="4,4" fill="none" />
              <path d="M 200 90 L 200 170" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="4,4" fill="none" />
              <path d="M 280 120 L 200 170" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="4,4" fill="none" />

              <path d="M 200 190 L 200 280" stroke="#FF5E00" strokeWidth="2" fill="none" />

              <circle cx="200" cy="235" r="4" fill="#00E5FF">
                <animate attributeName="cy" values="190;280" dur="2.5s" repeatCount="indefinite" />
              </circle>

              {/* Layer 2 Blocks */}
              {/* Block A (Left) */}
              <g transform="translate(70, 75)">
                <polygon points="50,15 90,35 50,55 10,35" fill="#0a0a0a" stroke="#00E5FF" strokeWidth="1.5" />
                <polygon points="10,35 50,55 50,70 10,50" fill="none" stroke="#00E5FF" strokeWidth="1.5" />
                <polygon points="50,55 90,35 90,50 50,70" fill="none" stroke="#00E5FF" strokeWidth="1.5" />
                <text x="50" y="40" fill="#00E5FF" fontFamily="Fira Code" fontSize="7" textAnchor="middle">TX_BATCH_01</text>
              </g>

              {/* Block B (Center) */}
              <g transform="translate(150, 45)">
                <polygon points="50,15 90,35 50,55 10,35" fill="#0a0a0a" stroke="#00E5FF" strokeWidth="1.5" />
                <polygon points="10,35 50,55 50,70 10,50" fill="none" stroke="#00E5FF" strokeWidth="1.5" />
                <polygon points="50,55 90,35 90,50 50,70" fill="none" stroke="#00E5FF" strokeWidth="1.5" />
                <text x="50" y="40" fill="#00E5FF" fontFamily="Fira Code" fontSize="7" textAnchor="middle">TX_BATCH_02</text>
              </g>

              {/* Block C (Right) */}
              <g transform="translate(230, 75)">
                <polygon points="50,15 90,35 50,55 10,35" fill="#0a0a0a" stroke="#00E5FF" strokeWidth="1.5" />
                <polygon points="10,35 50,55 50,70 10,50" fill="none" stroke="#00E5FF" strokeWidth="1.5" />
                <polygon points="50,55 90,35 90,50 50,70" fill="none" stroke="#00E5FF" strokeWidth="1.5" />
                <text x="50" y="40" fill="#00E5FF" fontFamily="Fira Code" fontSize="7" textAnchor="middle">TX_BATCH_03</text>
              </g>

              {/* Sequencer / Rollup Node (Middle) */}
              <g transform="translate(150, 140)">
                <polygon points="50,10 90,30 50,50 10,30" fill="none" stroke="#FF5E00" strokeWidth="2" />
                <polygon points="10,30 50,50 50,55 10,35" fill="none" stroke="#FF5E00" strokeWidth="2" />
                <polygon points="50,50 90,30 90,35 50,55" fill="none" stroke="#FF5E00" strokeWidth="2" />
                <polygon points="50,18 80,30 50,42 20,30" fill="#FF5E00" opacity="0.3" />
                <text x="50" y="34" fill="#eaeaea" fontFamily="Fira Code" fontSize="8" fontWeight="bold" textAnchor="middle">SEQUENCER</text>
              </g>

              {/* Layer 1 Ethereum Block (Bottom) */}
              <g transform="translate(130, 260)">
                <polygon points="70,20 130,50 70,80 10,50" fill="#0a0a0a" stroke="#FF5E00" strokeWidth="2" />
                <polygon points="10,50 70,80 70,110 10,80" fill="none" stroke="#FF5E00" strokeWidth="2" />
                <polygon points="70,80 130,50 130,80 70,110" fill="none" stroke="#FF5E00" strokeWidth="2" />

                <text x="70" y="50" fill="#FF5E00" fontFamily="Space Grotesk" fontSize="11" fontWeight="bold" textAnchor="middle">ETHEREUM L1</text>

              </g>

              {/* Blueprint Labels */}
              <text x="15" y="65" fill="#eaeaea" fontFamily="Fira Code" fontSize="9">[ LAYER 2 ]</text>
              <text x="15" y="80" fill="#00E5FF" fontFamily="Fira Code" fontSize="8">OFF-CHAIN EXEC</text>

              <text x="300" y="325" fill="#eaeaea" fontFamily="Fira Code" fontSize="9">[ LAYER 1 ]</text>
              <text x="300" y="340" fill="#FF5E00" fontFamily="Fira Code" fontSize="8">DATA AVAILABILITY</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Why Layer 2 Section */}
      <section className="why-l2-section" id="why-l2" ref={sectionRef}>
        <div className="section-container">
          <div className="section-meta">SYS_ANALYSIS: PROBLEMS_AND_SOLUTIONS</div>
          <div className="why-grid">
            {/* Column 1: The Problem */}
            <div className="why-col" id="col-problem">
              <div className="why-index">
                <span>STAGE_01 // THE_PROBLEM</span>
                <span className="text-accent-orange">[!] DEGRADED</span>
              </div>
              <h2 className="why-title" id="title-problem">Ethereum Mainnet Congestion</h2>
              <p className="why-text">
                Ethereum was designed as a decentralized computer, but its success has led to scalability issues.
                Because every node in the network must execute every transaction, the mainnet suffers from:
              </p>
              <ul className="why-list">
                {PROBLEM_POINTS.map((point, idx) => {
                  const isVisible = problemTyped[idx] !== null;
                  const isCurrentlyTyping = isVisible && problemTyped[idx].length < point.length;
                  return (
                    <li
                      key={idx}
                      className="accent-orange"
                      style={{ opacity: isVisible ? 1 : 0 }}
                    >
                      {problemTyped[idx] || ""}
                      {isCurrentlyTyping && <span className="typing-cursor">_</span>}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 2: The Solution */}
            <div className="why-col" id="col-solution">
              <div className="why-index">
                <span>STAGE_02 // THE_SOLUTION</span>
                <span className="text-accent-blue">[✓] OPTIMIZED</span>
              </div>
              <h2 className="why-title" id="title-solution">Arbitrum Optimistic Rollup</h2>
              <p className="why-text">
                Arbitrum scales Ethereum by shifting execution off-chain. It runs smart contracts on a fast Layer 2
                protocol, then compiles and publishes condensed transaction batches back to Ethereum:
              </p>
              <ul className="why-list">
                {SOLUTION_POINTS.map((point, idx) => {
                  const isVisible = solutionTyped[idx] !== null;
                  const isCurrentlyTyping = isVisible && solutionTyped[idx].length < point.length;
                  return (
                    <li
                      key={idx}
                      className="accent-blue"
                      style={{ opacity: isVisible ? 1 : 0 }}
                    >
                      {solutionTyped[idx] || ""}
                      {isCurrentlyTyping && <span className="typing-cursor">_</span>}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section" id="specifications">
        <div className="section-container">
          <div className="section-header">
            <div className="section-meta">SYS_SPECS: CORE_ARCHITECTURES</div>
            <h2 className="section-title" id="title-specs">System Features</h2>
          </div>

          <div className="features-grid">
            {/* Card 1 */}
            <div className="feature-card" id="feature-throughput">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                  <path d="M16 3l3 3-3 3M8 9l3 3-3 3M16 15l3 3-3 3" />
                </svg>
              </div>
              <h3 className="feature-title" id="title-feature-throughput">High Throughput</h3>
              <p className="feature-desc">
                Executes transactions asynchronously off-chain. Optimistic assumptions yield instantaneous user
                confirmations and sub-second execution speeds.
              </p>
            </div>

            {/* Card 2 */}
            <div className="feature-card" id="feature-evm">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="12 2 2 7 12 12 22 7" />
                  <polygon points="2 17 12 22 22 17" />
                  <polygon points="2 12 12 17 22 12" />
                </svg>
              </div>
              <h3 className="feature-title" id="title-feature-evm">EVM Compatibility</h3>
              <p className="feature-desc">
                Bytecode-compatible with the Ethereum Virtual Machine. Developers deploy existing Solidity contracts
                out-of-the-box without modifying code.
              </p>
            </div>

            {/* Card 3 */}
            <div className="feature-card" id="feature-security">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="11" width="14" height="10" />
                  <path d="M12 2a5 5 0 0 0-5 5v4h10V7a5 5 0 0 0-5-5z" />
                  <circle cx="12" cy="16" r="2" />
                </svg>
              </div>
              <h3 className="feature-title" id="title-feature-security">Trustless Security</h3>
              <p className="feature-desc">
                Secured by Ethereum mainnet. Interactive fraud proofs allow any single honest validator to challenge
                invalid state updates and secure the rollup.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

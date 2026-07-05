'use client';

import { useState, useEffect } from 'react';
import TerminalQuiz from './TerminalQuiz';

const CONCEPTS_DATA = [
  {
    id: "web2-web3",
    metaTitle: "SYS_DICTIONARY: CORE_CONCEPTS // MATRIX_01_OF_04",
    left: {
      meta: "REF_01A // CENTRALIZED",
      title: "Web2_Tech",
      points: [
        "Centralized server architectures (AWS, GCP) managed by single corporate entities.",
        "User identities leased via federated identity providers (Google/Meta OAuth).",
        "Closed, proprietary databases creating data silos monetized through target ads.",
        "Single points of failure vulnerable to targeted censorship and systemic outages.",
        "Trust model relies on legal agreements, service level guarantees, and intermediaries.",
        "API access is permissioned and can be unilaterally restricted or deprecated."
      ]
    },
    right: {
      meta: "REF_01B // DECENTRALIZED",
      title: "Web3_Tech",
      points: [
        "Decentralized state transition machines executed by peer-to-peer node networks.",
        "Self-sovereign identity managed via cryptographic public/private key pairs.",
        "Open-source, permissionless state layers storing immutable history on-chain.",
        "Fault-tolerant consensus mechanisms preventing centralized censorship or control.",
        "Trustless execution guaranteed by cryptographic proofs and smart contracts.",
        "Fully composable, public APIs (ABI contracts) allowing permissionless integration."
      ]
    },
    quiz: [
      {
        question: "Which of the following best describes the difference between identity management in Web2 and Web3?",
        options: [
          "Web2 uses decentralized identifiers while Web3 relies on centralized OAuth protocols.",
          "Web2 identities are leased from centralized providers; Web3 uses self-sovereign cryptographic wallets.",
          "Web2 uses public/private keys; Web3 relies entirely on username/password combinations.",
          "There is no operational difference; both rely on centralized directory services."
        ],
        correctAnswerIndex: 1,
        explanation: "Web2 uses federated OAuth where identity is leased and controlled by third parties. Web3 uses private key signatures to prove ownership, enabling self-sovereign identity."
      },
      {
        question: "How does Web3 achieve data persistency without relying on a centralized cloud database?",
        options: [
          "By storing all data in local browser cookies across all users.",
          "By using a decentralized network of nodes executing consensus protocols to maintain a shared state ledger.",
          "By replicating traditional SQL databases to every client device globally.",
          "By encrypting Web2 databases with a master password shared among all users."
        ],
        correctAnswerIndex: 1,
        explanation: "Web3 relies on consensus engines (like PoW or PoS) across a distributed network of nodes to maintain a single, synchronized state ledger."
      },
      {
        question: "What is 'composability' in the context of Web3 smart contracts?",
        options: [
          "The ability of different smart contracts to interact and integrate with each other permissionlessly.",
          "The process of compiling Solidity code into WebAssembly for faster execution.",
          "The restriction of access control to prevent external applications from calling functions.",
          "The standard format used to write comment documentation in smart contract source code."
        ],
        correctAnswerIndex: 0,
        explanation: "Composability refers to the design principle where smart contracts can interact, query, and build upon other contracts permissionlessly on the same state layer."
      },
      {
        question: "In Web2, application updates are deployed to centralized servers. How are updates typically managed in decentralized Web3 protocols?",
        options: [
          "The original developer modifies the blockchain database directly at any time.",
          "Users must download a patch from an official app store to change the blockchain state.",
          "Through on-chain governance or proxy-based smart contract upgrade patterns approved by token holders.",
          "Protocols cannot be updated, and any change requires launching a completely new physical network."
        ],
        correctAnswerIndex: 2,
        explanation: "Web3 protocols use on-chain governance (DAOs) or upgradeable smart contract architectures (like proxy contracts) to deploy upgrades through community consensus."
      },
      {
        question: "What does the 'permissionless' nature of Web3 imply?",
        options: [
          "Anyone can write to, read from, and deploy code to the network without needing authorization from a central authority.",
          "Users do not need passwords or keys to access their digital assets.",
          "Smart contracts do not require gas fees to execute transactions on the mainnet.",
          "Developers can bypass security audits and deploy malicious code without consequences."
        ],
        correctAnswerIndex: 0,
        explanation: "Permissionless means the network is open to anyone to submit transactions, deploy contracts, or participate in validation without needing approval from a gatekeeper."
      }
    ]
  },
  {
    id: "btc-eth",
    metaTitle: "SYS_DICTIONARY: CORE_CONCEPTS // MATRIX_02_OF_04",
    left: {
      meta: "REF_02A // PAYMENT_LEDGER",
      title: "Bitcoin",
      points: [
        "Primary design objective is digital scarcity, censorship-resistant value storage, and payments.",
        "Utilizes the UTXO (Unspent Transaction Output) model for strict, parallelizable transaction verification.",
        "Implements the SHA-256 Proof of Work consensus mechanism to secure the network.",
        "Uses Script, a limited, non-Turing-complete language, to maximize security and reduce attack vectors.",
        "Features a hard-capped supply of 21 million coins, programmatically enforced via halving cycles.",
        "Execution throughput is highly constrained, prioritizing decentralization and block space auction efficiency."
      ]
    },
    right: {
      meta: "REF_02B // APPS_PLATFORM",
      title: "Ethereum",
      points: [
        "Primary design objective is a Turing-complete, general-purpose smart contract execution environment.",
        "Utilizes an Account-based state model (similar to bank accounts) to track balances and contract storage.",
        "Operates on Proof of Stake consensus (Beacon Chain) utilizing validator staking and slashing.",
        "Executes complex logic on the Ethereum Virtual Machine (EVM) using gas to prevent infinite loop exploits.",
        "Features a dynamic monetary policy (EIP-1559) with base fee burn rates for ultrasound money mechanics.",
        "Native scaling relies on Layer-2 Rollups (Optimistic/ZK) that batch transactions off-chain and post proofs to Layer-1."
      ]
    },
    quiz: [
      {
        question: "Why does Ethereum use a 'gas' fee mechanism for transaction execution, whereas Bitcoin does not?",
        options: [
          "Ethereum has a much smaller network capacity than Bitcoin.",
          "Gas represents the literal fuel needed to keep the physical validator computers running.",
          "To prevent infinite loops and denial-of-service attacks in a Turing-complete state machine.",
          "To reward the developers of Solidity for writing smart contracts."
        ],
        correctAnswerIndex: 2,
        explanation: "Because Ethereum is Turing-complete, gas limits are required to prevent infinite loops (the Halting Problem) from running indefinitely and freezing the network."
      },
      {
        question: "What is the fundamental difference between Bitcoin's UTXO model and Ethereum's Account model?",
        options: [
          "The UTXO model tracks individual coins (outputs) like physical cash, while the Account model tracks state balances like a bank ledger.",
          "UTXO is only used for proof of stake, while the Account model is used for proof of work.",
          "The UTXO model allows smart contracts, while the Account model does not support any contract state.",
          "The Account model requires users to upload their real-world identities, unlike UTXO."
        ],
        correctAnswerIndex: 0,
        explanation: "Bitcoin's UTXO model acts like paper cash where unspent outputs are combined and spent. Ethereum's Account model tracks global state balances directly linked to user and contract accounts."
      },
      {
        question: "What is the consensus mechanism utilized by Ethereum after 'The Merge' transition?",
        options: [
          "Proof of Work (PoW) using SHA-256 ASIC miners.",
          "Delegated Proof of Authority (PoA) controlled by the Ethereum Foundation.",
          "Proof of Stake (PoS) using validator deposits of 32 ETH to propose and attest blocks.",
          "Proof of History (PoH) combined with Proof of Elapsed Time."
        ],
        correctAnswerIndex: 2,
        explanation: "Following The Merge, Ethereum transitioned from Proof of Work to Proof of Stake, where validator nodes stake 32 ETH to secure the network and consensus."
      },
      {
        question: "What is the purpose of EIP-1559 in Ethereum's fee market mechanism?",
        options: [
          "It completely removes transaction fees to make transactions free.",
          "It splits fees into a burned base fee and a tip to the validator, making ETH potentially deflationary.",
          "It limits the total supply of Ethereum to exactly 100 million coins.",
          "It forces all transactions to be processed through Layer 2 rollups."
        ],
        correctAnswerIndex: 1,
        explanation: "EIP-1559 introduced a dynamic base fee that is burned with every transaction, which reduces the circulating supply of ETH during high network demand."
      },
      {
        question: "Which scripting language is natively used to build smart contracts on Ethereum, and how does it compile?",
        options: [
          "C++ compiling into native x86 machine instructions.",
          "Bitcoin Script compiling into UTXO spending conditions.",
          "Solidity compiling into EVM bytecode executed by validators.",
          "Python compiling into Docker images run by consensus nodes."
        ],
        correctAnswerIndex: 2,
        explanation: "Solidity is the primary high-level language for writing Ethereum smart contracts. It compiles to bytecode that runs inside the Ethereum Virtual Machine (EVM)."
      }
    ]
  },
  {
    id: "keys",
    metaTitle: "SYS_DICTIONARY: CORE_CONCEPTS // MATRIX_03_OF_04",
    left: {
      meta: "REF_03A // SHAREABLE",
      title: "Public_Key",
      points: [
        "Generated from the private key using Elliptic Curve Cryptography (secp256k1 in BTC/ETH).",
        "Serves as the mathematical base to derive your public wallet address via hashing (e.g., Keccak-256).",
        "Safe to share publicly, allowing other actors to route payments and direct messages to you.",
        "Used by the network to verify that a transaction signature was generated by the corresponding private key.",
        "In advanced schemes, can be combined in multisig scripts to require co-signing by multiple parties.",
        "Enables public encryption where only the owner of the paired private key can decrypt the data."
      ]
    },
    right: {
      meta: "REF_03B // CONFIDENTIAL",
      title: "Private_Key",
      points: [
        "A randomly generated 256-bit number that represents absolute ownership of its associated accounts.",
        "Must be kept entirely confidential; exposure results in immediate, irreversible loss of all linked assets.",
        "Used to cryptographically sign transactions (ECDSA), proving authorization without revealing the key itself.",
        "Serves as the root seed to derive the public key and all subsequent addresses.",
        "Typically encoded as a 12-to-24 word mnemonic seed phrase (BIP-39) for human-readable backup.",
        "Cannot be changed or reset; if lost, there is no administrative entity to recover your assets."
      ]
    },
    quiz: [
      {
        question: "How is a public address derived from a private key in standard Web3 wallets?",
        options: [
          "By reversing the hashing algorithm of the public address using brute force.",
          "By multiplying the private key on an elliptic curve to get the public key, then hashing the public key.",
          "By encrypting a user's email address with a symmetric password.",
          "By requesting a random address from the blockchain network's central server."
        ],
        correctAnswerIndex: 1,
        explanation: "Asymmetric cryptography generates the public key from the private key via elliptic curve multiplication (secp256k1). The public address is then derived by hashing this public key."
      },
      {
        question: "Why is it mathematically impossible to recover a private key from a public key?",
        options: [
          "Because private keys are stored on physical paper that cannot be digitized.",
          "The derivation relies on the Elliptic Curve Discrete Logarithm Problem, which is computationally infeasible to solve.",
          "The blockchain network blocks any computer that tries to reverse the calculation.",
          "Private keys are deleted from the network as soon as the public key is created."
        ],
        correctAnswerIndex: 1,
        explanation: "The Elliptic Curve Discrete Logarithm Problem is a one-way mathematical function. It is easy to calculate public key = private key * G, but practically impossible to calculate the private key from the public key."
      },
      {
        question: "What does a cryptographic signature (ECDSA) prove when you submit a transaction?",
        options: [
          "It proves that the transaction was scanned by a certified antivirus program.",
          "It proves you possess the private key corresponding to the public address without revealing the private key.",
          "It proves that you have physically signed a document using a digital stylus.",
          "It proves that your wallet is currently connected to a high-speed internet connection."
        ],
        correctAnswerIndex: 1,
        explanation: "A digital signature proves ownership of the corresponding private key for a transaction payload without leaking any information about the private key itself."
      },
      {
        question: "What is a BIP-39 mnemonic phrase?",
        options: [
          "A security standard that encrypts your password using facial recognition data.",
          "A list of 12 to 24 random dictionary words representing the seed entropy used to generate private keys.",
          "A command-line script used to deploy contracts to the mainnet.",
          "A special database index that speeds up transaction history lookup."
        ],
        correctAnswerIndex: 1,
        explanation: "BIP-39 is a standard that translates a binary seed (entropy) into a human-readable list of 12-24 words, allowing easy backup and restoration of private keys."
      },
      {
        question: "If you lose your private key but still have your public address, what happens to your assets?",
        options: [
          "You can contact the blockchain customer support team to reset your credentials.",
          "The assets remain on-chain but are permanently locked and unrecoverable by anyone.",
          "The assets are automatically returned to the wallets that sent them to you.",
          "You can regenerate the private key from the public address using standard wallet recovery tools."
        ],
        correctAnswerIndex: 1,
        explanation: "In decentralized public key cryptography, there is no central gatekeeper or account recovery. If the private key is lost, the assets are permanently frozen in the state."
      }
    ]
  },
  {
    id: "dbs",
    metaTitle: "SYS_DICTIONARY: CORE_CONCEPTS // MATRIX_04_OF_04",
    left: {
      meta: "REF_04A // APPEND_ONLY",
      title: "Blockchain",
      points: [
        "Built as an append-only ledger structured in cryptographically linked blocks (hashes).",
        "Distributed across a network of independent validator nodes with no single database administrator.",
        "Achieves high immutability; modifying historical data requires rewriting subsequent blocks and securing consensus.",
        "Transactions require validation through consensus protocols (e.g., PoW, PoS) before commitment.",
        "Features full auditability, permitting anyone to trace the history of state modifications from genesis.",
        "Execution latency is high due to block times and network-wide consensus synchronization requirements."
      ]
    },
    right: {
      meta: "REF_04B // RELATIONAL",
      title: "Traditional_DB",
      points: [
        "Supports full CRUD operations (Create, Read, Update, and Delete), allowing data modification and deletion.",
        "Hosted on centralized servers or cloud infrastructure controlled by a single administrative organization.",
        "Rely on database administrators who possess root credentials to override, modify, or delete any record.",
        "Transactions are processed instantly through direct writes to memory/disk, using ACID guarantees.",
        "Internal audit trails are optional and can be manipulated by privileged administrators or system intruders.",
        "Throughput is extremely high (millions of queries per second) with sub-millisecond execution latency."
      ]
    },
    quiz: [
      {
        question: "Why is a blockchain referred to as 'append-only'?",
        options: [
          "You can only add new records; you cannot modify or delete existing historical data.",
          "The database can only be edited by adding file attachments like PDFs.",
          "It only allows users to join the network and does not support transaction fees.",
          "All files must be appended with a special file extension (.blk) to be saved."
        ],
        correctAnswerIndex: 0,
        explanation: "Blockchains are designed as linear historical ledgers. Once a block is verified and appended, existing entries cannot be updated or deleted, guaranteeing immutability."
      },
      {
        question: "What trade-off is made when choosing a blockchain over a traditional relational database?",
        options: [
          "You trade query speed and write throughput for decentralization, trustless consensus, and immutability.",
          "You trade security for a simpler database setup that does not require passwords.",
          "You trade database size for a system that can only store up to 100 entries.",
          "There are no trade-offs; blockchains are strictly faster and cheaper in all use cases."
        ],
        correctAnswerIndex: 0,
        explanation: "Blockchains provide trustless coordination and high immutability but are much slower, have higher latency, and cost more to write to than centralized databases."
      },
      {
        question: "In traditional databases, what does the 'D' in CRUD stand for, and why is it absent in blockchain designs?",
        options: [
          "Document; because blockchains only store binary code.",
          "Delete; because blockchain history is immutable and previous state transitions must persist.",
          "Decrypt; because blockchain data is always encrypted and cannot be viewed by developers.",
          "Distributed; because blockchain state is not shared with anyone."
        ],
        correctAnswerIndex: 1,
        explanation: "The 'D' stands for Delete. Blockchains lack a native delete operation because they preserve a chronological, tamper-evident log of all transactions from genesis."
      },
      {
        question: "How do traditional databases ensure transaction reliability, and how does it compare to blockchain consensus?",
        options: [
          "They rely on ACID properties enforced locally by a central engine, while blockchains rely on distributed consensus.",
          "They use Proof of Work mining, while blockchains do not require any consensus logic.",
          "They require manual approval from web developers for every single SQL query.",
          "They do not provide any guarantees for transaction reliability or data consistency."
        ],
        correctAnswerIndex: 0,
        explanation: "Centralized databases use ACID (Atomicity, Consistency, Isolation, Durability) guarantees enforced by a single server engine. Blockchains use consensus algorithms across many nodes."
      },
      {
        question: "What prevents a system administrator of a centralized database from falsifying audit records, and how does blockchain solve this?",
        options: [
          "Admin access is automatically blocked if they try to edit logs in a traditional database.",
          "Nothing; administrators can edit database tables. Blockchains prevent this using cryptographic block hashes.",
          "Relational databases use smart contracts to ban administrative overrides.",
          "Traditional databases are naturally encrypted with keys that administrators do not hold."
        ],
        correctAnswerIndex: 1,
        explanation: "A database admin with root access can modify tables and logs directly in a traditional DB. Blockchains use cryptographically linked block headers (hashes) so changing any record alters the chain's signatures."
      }
    ]
  }
];

export default function ConceptsClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [leftTyped, setLeftTyped] = useState(() => new Array(CONCEPTS_DATA[0].left.points.length).fill(null));
  const [rightTyped, setRightTyped] = useState(() => new Array(CONCEPTS_DATA[0].right.points.length).fill(null));

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
    setLeftTyped(new Array(activeData.left.points.length).fill(null));
    setRightTyped(new Array(activeData.right.points.length).fill(null));

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
                      const isCurrentlyTyping = isVisible && leftTyped[idx] && leftTyped[idx].length < point.length;
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
                      const isCurrentlyTyping = isVisible && rightTyped[idx] && rightTyped[idx].length < point.length;
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
              <TerminalQuiz key={card.id} quiz={card.quiz} conceptTitle={`${card.left.title}_VS_${card.right.title}`} />
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

# L2_ARCHITECT: Scaling Ethereum

**Author:** KUNJ S. KAKA
**Class:**  BE III CSE 

## Project Description
L2_ARCHITECT is a 4-page educational Web3 platform designed to explain the core mechanics of blockchain technology, specifically focusing on Ethereum Layer 2 scaling solutions like Arbitrum. The project features a cohesive "Neo-Terminal Blueprint" brutalist design system and includes interactive, data-driven elements to demonstrate Web3 concepts tangibly.

---

## Website Structure & Pages

1. **Home / Landing (`index.html`)**
   Introduces the core theme of the website: why Ethereum requires Layer 2 solutions to scale and how Arbitrum utilizes Optimistic Rollups to achieve high throughput and low fees while maintaining L1 security.

2. **Concepts (`concepts.html`)**
   A visual comparison matrix breaking down fundamental Web3 paradigms. It features side-by-side explanations of Web2 vs Web3, Ethereum vs Bitcoin, Public vs Private Keys, and Blockchain vs Traditional Databases.

3. **Live Prices (`prices.html`)**
   A real-time financial dashboard fetching live cryptocurrency data (BTC, ETH, ARB) directly from the public CoinGecko API. It includes a manual data refresh mechanism and dynamic color-coded 24h price change indicators.

4. **Block Simulator (`simulator.html`)**
   An interactive, pure JavaScript blockchain simulator. It demonstrates the concept of chain immutability by allowing users to input data, generate valid SHA-256 hashes via proof-of-work mining (finding a nonce that produces a hash starting with "00"), and observe how altering data in a previous block instantly breaks the cryptographic integrity of subsequent blocks.

---

## How to Install and Run Locally

Because this project is built using pure HTML, CSS, and Vanilla JavaScript, no complex build tools or package managers (like npm) are required.

1. Clone or download this repository to your local machine.
2. Ensure all files (`index.html`, `concepts.html`, `prices.html`, `simulator.html`, `style.css`, `app.js`) are located in the same root directory.
3. Open `index.html` directly in any modern web browser (Chrome, Firefox, Brave, Safari). 
   * *Note: For the best experience, you can also run a local development server (like the VS Code "Live Server" extension).*

---

## Known Issues & Future Improvements

* **API Rate Limiting:** The CoinGecko public API on the Live Prices page may occasionally face rate-limiting if refreshed too many times in rapid succession. A future improvement would be to cache the response in `localStorage` for 60 seconds to prevent unnecessary API calls.
* **Mobile Responsiveness on Simulator:** While the Block Simulator chain stacks vertically on smaller screens, highly constrained mobile views (under 320px) could benefit from tighter padding around the input fields.
* **Hash Difficulty:** The current proof-of-work difficulty is set to find a hash starting with two zeros (`"00"`). To make the simulation more realistic (but computationally heavier), a future update could allow the user to manually adjust the difficulty slider.
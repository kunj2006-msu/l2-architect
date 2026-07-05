# L2_ARCHITECT: Scaling Ethereum

**Author:** KUNJ S. KAKA
**Class:**  BE III CSE 

## Project Description
L2_ARCHITECT is a Next.js-based educational Web3 platform designed to explain the core mechanics of blockchain technology, specifically focusing on Ethereum Layer 2 scaling solutions like Arbitrum. The project features a cohesive brutalist design system and includes interactive, data-driven elements to demonstrate Web3 concepts tangibly.

---

## Website Structure & Features

1. **Home / Landing (`/`)**
   Introduces the core theme of the website: why Ethereum requires Layer 2 solutions to scale and how Arbitrum utilizes Optimistic Rollups to achieve high throughput and low fees while maintaining L1 security. Includes a clean, high-performance SVG animation modeling transaction sequencing.

2. **Concepts (`/concepts`)**
   A comparative dashboard breaking down fundamental Web3 paradigms:
   - **Expanded Matrices:** Detailed technical comparison grids covering Web2 vs Web3, Ethereum vs Bitcoin, Public vs Private Keys, and Blockchain vs Databases (5–6 points each).
   - **Terminal Diagnostics Quizzes:** Each concept card features an interactive Gateway (`[ START_QUIZ ]` button) prompting a progressive 5-question multiple-choice quiz.
   - **Dynamic Feedback & Recovery:** Tracks user choices, flags status diagnostic updates on correct/incorrect choices, calculates scoring, and allows a full `[ REBOOT_SEQUENCE ]` to try again.

3. **Live Prices (`/prices`)**
   A real-time financial dashboard fetching live cryptocurrency data directly from the public CoinGecko API. 
   - **Live Data Feeds:** Includes live price indicators and refresh functionality.
   - **Interactive Trend Visualizer:** Features a Recharts price trend visualizer modal.
   - **Timeframe Filters:** Interactive buttons `[ 24H ]`, `[ 7D ]`, `[ 1M ]`, and `[ 1Y ]` to query historical trends. Includes a dynamic `[ FETCHING_DATA... ]` load state.
   - **Dynamic Date Formatting:** The X-axis ticks and custom tooltips dynamically format based on the timeframe (localized times for 24H, date/hour for 7D/1M, and dates for 1Y).

4. **Block Simulator (`/simulator`)**
   An interactive cryptographic blockchain simulator demonstrating chain immutability.
   - **5-Block Chain:** Scaled to 5 sequential blocks with interactive inputs.
   - **Modular React Architecture:** Rebuilt with modular components to eliminate rendering bottlenecks.
   - **Debounced Hashing:** Employs a 50ms debounced `useEffect` cascade to propagate hash updates cleanly down the chain without locking the browser's main thread.
   - **Proof-of-Work Mining:** A button-bound mining loop adjusts the nonce to solve the hash difficulty (finding a SHA-256 hash starting with `"00"`).

---

## Theme Configurations (Global Switcher)

The application supports a Global Theme engine that shifts styles globally while maintaining layout dimensions and grid alignments:
* **Dark Theme (Neo-Terminal Blueprint):** Off-white monospace fonts, dark charcoal backgrounds, electric cyan accents, and diagnostic grid lines.
* **Light Theme (Cyber-Paper Terminal):** Dark ink-black typography (`#121212`), high-contrast cream-paper white backgrounds (`#F4F4F0`), gray structural borders (`#CCCCCC`), and technical blue highlight overlays.
* **Hydration Safety:** Built with a `useEffect` initializer targeting `localStorage` preferences to prevent server-side hydration mismatches.
* **Transition System:** Configured with a global CSS transition utility (`0.3s` ease) for background color, text color, border color, and glow shadows to ensure seamless blending.
* **Button Stacking Contexts:** Utilizes local stacking contexts on `.btn-terminal` to ensure negative z-index hover effects slide cleanly over Light Mode backdrops without clipping.

---

## How to Install and Run Locally

The project is built on Next.js 16 (App Router) and React 19.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Steps
1. Clone or download this repository to your local machine.
2. Open your terminal in the root directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

To compile a production build of the project, run:
```bash
npm run build
```

---

## Known Issues & Future Improvements

* **API Rate Limiting:** The CoinGecko public API on the Live Prices page may occasionally face rate-limiting if refreshed too many times in rapid succession. A future improvement would be to cache the response in `localStorage` for 60 seconds to prevent unnecessary API calls.
* **Hash Difficulty:** The current proof-of-work difficulty is set to find a hash starting with two zeros (`"00"`). A future update could allow the user to manually adjust the difficulty slider.
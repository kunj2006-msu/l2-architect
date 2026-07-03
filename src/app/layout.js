import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "L2_ARCHITECT | Scaling Ethereum with Arbitrum",
  description: "Learn how Arbitrum scales Ethereum. Explore Layer 2 rollups, gas savings, EVM compatibility, and high-performance Web3 solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

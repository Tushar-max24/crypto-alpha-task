import { useEffect, useState } from "react";

// Map base symbols (from BTC/USDT) to CoinGecko IDs
const COINGECKO_IDS = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  MATIC: "matic-network",
  BNB: "binancecoin",
  XRP: "ripple",
  DOGE: "dogecoin"
};

const getBaseSymbol = (pair) => {
  if (!pair) return null;
  return pair.split("/")[0].trim().toUpperCase();
};

const useCryptoPrices = (signals) => {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!signals || signals.length === 0) return;

    const baseSymbols = Array.from(
      new Set(signals.map((s) => getBaseSymbol(s.pair)))
    );
    const ids = baseSymbols
      .map((sym) => COINGECKO_IDS[sym])
      .filter(Boolean);

    if (ids.length === 0) return;

    const fetchPrices = async () => {
      try {
        setLoading(true);
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(
          ","
        )}&vs_currencies=usd`;
        const res = await fetch(url);
        const data = await res.json();

        const nextPrices = {};
        baseSymbols.forEach((sym) => {
          const id = COINGECKO_IDS[sym];
          if (data[id]?.usd) {
            nextPrices[sym] = data[id].usd;
          }
        });
        setPrices(nextPrices);
      } catch (err) {
        console.error("Price fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // every 30s

    return () => clearInterval(interval);
  }, [signals]);

  return { prices, loading };
};

export { useCryptoPrices, getBaseSymbol };

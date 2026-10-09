import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, TrendingUp, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";

export function TradingBotSimulator() {
  const [isActive, setIsActive] = useState(true);
  const [priceData, setPriceData] = useState<number[]>([100.2, 101.5, 99.8, 102.4, 101.0, 103.8, 102.5, 105.2]);
  const [profit, setProfit] = useState<number>(42.8);
  const [winCount, setWinCount] = useState<number>(14);
  const [totalTrades, setTotalTrades] = useState<number>(18);
  const [tradeLog, setTradeLog] = useState<{ id: number; time: string; type: "BUY" | "SELL"; price: number; pnl?: number }[]>([
    { id: 1, time: "11:02:10", type: "BUY", price: 99.8, pnl: 2.6 },
    { id: 2, time: "11:04:15", type: "SELL", price: 105.2, pnl: 5.4 },
  ]);

  const latestPriceRef = useRef(105.2);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const currentPrice = latestPriceRef.current;
      const change = (Math.random() - 0.47) * 1.8;
      const newPrice = Math.max(85, Math.round((currentPrice + change) * 100) / 100);
      latestPriceRef.current = newPrice;

      setPriceData((prev) => {
        return [...prev.slice(-19), newPrice]; // Keep last 20 points
      });

      // Auto simulation trades
      if (Math.random() > 0.8) {
        const tradeType: "BUY" | "SELL" = Math.random() > 0.45 ? "BUY" : "SELL";
        const tradeTime = new Date().toLocaleTimeString("en-IN", { hour12: false });
        const deltaPnl = tradeType === "SELL" ? Number((Math.random() * 6).toFixed(2)) : -Number((Math.random() * 2).toFixed(2));

        setTradeLog((prev) => [
          { id: Date.now(), time: tradeTime, type: tradeType, price: newPrice, pnl: deltaPnl },
          ...prev.slice(0, 4),
        ]);

        setProfit((prev) => Math.round((prev + deltaPnl) * 100) / 100);
        setTotalTrades((t) => t + 1);
        if (deltaPnl > 0) setWinCount((w) => w + 1);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isActive]);

  const executeManualTrade = (type: "BUY" | "SELL") => {
    const currentPrice = latestPriceRef.current;
    const tradeTime = new Date().toLocaleTimeString("en-IN", { hour12: false });
    const deltaPnl = type === "SELL" ? Number((Math.random() * 7).toFixed(2)) : -Number((Math.random() * 2.5).toFixed(2));

    setTradeLog((prev) => [
      { id: Date.now(), time: tradeTime, type, price: currentPrice, pnl: deltaPnl },
      ...prev.slice(0, 4),
    ]);

    setProfit((prev) => Math.round((prev + deltaPnl) * 100) / 100);
    setTotalTrades((t) => t + 1);
    if (deltaPnl > 0) setWinCount((w) => w + 1);
  };

  const maxPrice = Math.max(...priceData);
  const minPrice = Math.min(...priceData);
  const priceRange = maxPrice - minPrice || 10;

  const svgWidth = 600;
  const svgHeight = 160;
  const paddingX = 16;
  const paddingY = 24;

  const points = priceData
    .map((price, index) => {
      const x = (index / (priceData.length - 1)) * (svgWidth - paddingX * 2) + paddingX;
      const y = svgHeight - ((price - minPrice) / priceRange) * (svgHeight - paddingY * 2) - paddingY;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `${points} ${svgWidth - paddingX},${svgHeight} ${paddingX},${svgHeight}`;

  const winRate = totalTrades > 0 ? Math.round((winCount / totalTrades) * 100) : 78;

  return (
    <div className="mt-4 p-6 rounded-2xl glass-premium border border-white/10 space-y-5">
      {/* Header controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#c8a96e]/15 border border-[#c8a96e]/30 flex items-center justify-center text-[#c8a96e]">
            <Activity className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`} />
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-white flex items-center gap-1.5">
              Quantitative Trading Terminal
              <span className="text-[10px] text-[#c8a96e] bg-[#c8a96e]/10 px-2 py-0.5 rounded border border-[#c8a96e]/30">
                Binance Futures Bot
              </span>
            </h4>
            <p className="text-[11px] text-white/50">Simulated EMA Crossover · 150ms Execution Loop</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => executeManualTrade("BUY")}
            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 transition-all font-semibold"
          >
            <ArrowUpRight className="w-3.5 h-3.5" /> Long (Buy)
          </button>
          <button
            onClick={() => executeManualTrade("SELL")}
            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500/25 transition-all font-semibold"
          >
            <ArrowDownRight className="w-3.5 h-3.5" /> Short (Sell)
          </button>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition-all ${
              isActive
                ? "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20"
                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
            }`}
          >
            {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isActive ? "Pause" : "Resume"}
          </button>
        </div>
      </div>

      {/* Telemetry Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
          <span className="text-[10px] text-white/40 uppercase font-mono tracking-wider">Ticking Mark</span>
          <p className="text-xl font-mono font-bold text-white mt-1">
            ${latestPriceRef.current.toFixed(2)}
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
          <span className="text-[10px] text-white/40 uppercase font-mono tracking-wider">Simulated PnL</span>
          <p className={`text-xl font-mono font-bold mt-1 flex items-center gap-0.5 ${profit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            <DollarSign className="w-4 h-4 shrink-0" /> {profit.toFixed(2)}
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
          <span className="text-[10px] text-white/40 uppercase font-mono tracking-wider">Win Rate</span>
          <p className="text-xl font-mono font-bold text-[#c8a96e] mt-1">
            {winRate}%
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
          <span className="text-[10px] text-white/40 uppercase font-mono tracking-wider">Engine Status</span>
          <div className="flex items-center gap-2 mt-2">
            <span className={`w-2 h-2 rounded-full ${isActive ? "bg-emerald-400 animate-ping" : "bg-amber-400"}`} />
            <span className="text-xs font-mono font-bold text-white/80">
              {isActive ? "LIVE EXECUTION" : "PAUSED"}
            </span>
          </div>
        </div>
      </div>

      {/* Ticking SVG Graph with Area Fill */}
      <div className="bg-black/40 border border-white/10 rounded-xl p-3 overflow-hidden relative">
        <div className="absolute top-3 left-4 flex gap-4 text-[10px] font-mono text-white/40">
          <span>EMA(9): {(latestPriceRef.current * 0.994).toFixed(2)}</span>
          <span className="text-[#c8a96e]">EMA(21): {(latestPriceRef.current * 0.985).toFixed(2)}</span>
        </div>

        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible mt-2">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c8a96e" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#c8a96e" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#c8a96e" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Background Grid */}
          <line x1="0" y1={svgHeight * 0.3} x2={svgWidth} y2={svgHeight * 0.3} stroke="rgba(255,255,255,0.04)" strokeDasharray="4,4" />
          <line x1="0" y1={svgHeight * 0.65} x2={svgWidth} y2={svgHeight * 0.65} stroke="rgba(255,255,255,0.04)" strokeDasharray="4,4" />

          {/* Gradient Area */}
          <polygon fill="url(#chartGradient)" points={areaPoints} className="transition-all duration-300" />

          {/* Stroke Line */}
          <polyline fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" points={points} className="transition-all duration-300" strokeLinecap="round" strokeLinejoin="round" />

          {/* Head Dot */}
          {priceData.length > 0 && (
            <circle
              cx={(priceData.length - 1) * (svgWidth - paddingX * 2) / (priceData.length - 1) + paddingX}
              cy={svgHeight - ((priceData[priceData.length - 1] - minPrice) / priceRange) * (svgHeight - paddingY * 2) - paddingY}
              r="4.5"
              fill="#c8a96e"
              className="animate-pulse"
            />
          )}
        </svg>
      </div>

      {/* Trade Log */}
      <div>
        <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider block mb-2 font-mono">
          Live Order Book & Signal Log
        </span>
        <div className="space-y-1.5 max-h-[120px] overflow-y-auto font-mono text-[11px]">
          {tradeLog.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-2">
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${log.type === "BUY" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/15 text-rose-400 border border-rose-500/30"}`}>
                  {log.type}
                </span>
                <span className="text-white/60">Execution Fill @</span>
                <span className="text-white font-semibold">${log.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-3">
                {log.pnl !== undefined && (
                  <span className={`text-[10px] font-bold ${log.pnl >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {log.pnl >= 0 ? `+${log.pnl}` : log.pnl} USD
                  </span>
                )}
                <span className="text-white/30 text-[10px]">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

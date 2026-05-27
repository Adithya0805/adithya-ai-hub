import { useState, useEffect, useRef } from "react";
import { Play, Pause, TrendingUp, DollarSign, Activity } from "lucide-react";

export function TradingBotSimulator() {
  const [isActive, setIsActive] = useState(true);
  const [priceData, setPriceData] = useState<number[]>([100, 101, 99, 102, 100, 103, 102, 105]);
  const [profit, setProfit] = useState<number>(14.5);
  const [tradeLog, setTradeLog] = useState<{ id: number; time: string; type: "BUY" | "SELL"; price: number }[]>([
    { id: 1, time: "11:02:10", type: "BUY", price: 99 },
    { id: 2, time: "11:04:15", type: "SELL", price: 105 },
  ]);

  const latestPriceRef = useRef(105);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      // Simulate real-time randomized price ticking
      const currentPrice = latestPriceRef.current;
      const change = (Math.random() - 0.48) * 2; // Slight upward bias
      const newPrice = Math.max(80, Math.round((currentPrice + change) * 100) / 100);
      latestPriceRef.current = newPrice;

      setPriceData((prev) => {
        const updated = [...prev.slice(-14), newPrice]; // Keep last 15 points
        return updated;
      });

      // Randomized simulated trade actions
      const chance = Math.random();
      if (chance > 0.85) {
        const tradeType = Math.random() > 0.5 ? "BUY" : "SELL";
        const tradeTime = new Date().toLocaleTimeString("en-IN", { hour12: false });
        
        setTradeLog((prev) => [
          { id: Date.now(), time: tradeTime, type: tradeType, price: newPrice },
          ...prev.slice(0, 4), // Keep last 5 trades
        ]);

        setProfit((prev) => {
          const tradePnl = tradeType === "SELL" ? Math.random() * 5 : -(Math.random() * 2);
          return Math.round((prev + tradePnl) * 100) / 100;
        });
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isActive]);

  const maxPrice = Math.max(...priceData);
  const minPrice = Math.min(...priceData);
  const priceRange = maxPrice - minPrice || 10;

  // Generate SVG path coordinates
  const svgWidth = 500;
  const svgHeight = 150;
  const points = priceData
    .map((price, index) => {
      const x = (index / (priceData.length - 1)) * (svgWidth - 20) + 10;
      const y = svgHeight - ((price - minPrice) / priceRange) * (svgHeight - 40) - 20;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="mt-4 p-5 rounded-2xl bg-gradient-card border border-border space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Activity className={`w-4 h-4 ${isActive ? "text-primary animate-pulse" : "text-muted-foreground"}`} />
          <h4 className="text-xs uppercase tracking-wider font-semibold text-primary">Live bot simulator</h4>
        </div>
        <button
          onClick={() => setIsActive(!isActive)}
          className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition-smooth ${
            isActive
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20"
              : "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"
          }`}
        >
          {isActive ? (
            <>
              <Pause className="w-3 h-3" /> Pause Bot
            </>
          ) : (
            <>
              <Play className="w-3 h-3" /> Resume Bot
            </>
          )}
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {/* Stats */}
        <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 flex flex-col justify-center">
          <span className="text-[10px] text-muted-foreground uppercase font-semibold">Ticking Price</span>
          <span className="text-lg font-mono font-bold text-foreground mt-1">
            ${latestPriceRef.current.toFixed(2)}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 flex flex-col justify-center">
          <span className="text-[10px] text-muted-foreground uppercase font-semibold">Accumulated Profit</span>
          <span className={`text-lg font-mono font-bold mt-1 flex items-center gap-0.5 ${profit >= 0 ? "text-green-400" : "text-rose-400"}`}>
            <DollarSign className="w-4 h-4 shrink-0" /> {profit.toFixed(2)}
          </span>
        </div>
        <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 flex flex-col justify-center">
          <span className="text-[10px] text-muted-foreground uppercase font-semibold">Bot status</span>
          <span className={`text-xs mt-1 font-semibold flex items-center gap-1.5 ${isActive ? "text-green-400" : "text-amber-400"}`}>
            <span className={`w-2 h-2 rounded-full ${isActive ? "bg-green-400 animate-ping" : "bg-amber-400"}`} />
            {isActive ? "ACTIVE & TRADING" : "PAUSED"}
          </span>
        </div>
      </div>

      {/* Ticking SVG Graph */}
      <div className="bg-background/40 border border-border/40 rounded-xl p-3 overflow-hidden">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
          {/* Grid lines */}
          <line x1="0" y1={svgHeight / 2} x2={svgWidth} y2={svgHeight / 2} stroke="rgba(255,255,255,0.03)" strokeDasharray="5,5" />
          {/* Moving Line */}
          <polyline fill="none" stroke="url(#cyanPurpleGrad)" strokeWidth="2.5" points={points} className="transition-all duration-300" />
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="cyanPurpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          {/* Ticking endpoint dot */}
          {priceData.length > 0 && (
            <circle
              cx={(priceData.length - 1) * (svgWidth - 20) / (priceData.length - 1) + 10}
              cy={svgHeight - ((priceData[priceData.length - 1] - minPrice) / priceRange) * (svgHeight - 40) - 20}
              r="4.5"
              fill="#06b6d4"
              className="animate-pulse"
            />
          )}
        </svg>
      </div>

      {/* Trade Log */}
      <div>
        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-2">Simulated Activity Log</span>
        <div className="space-y-1.5 max-h-[100px] overflow-y-auto font-mono text-[11px]">
          {tradeLog.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-2 rounded bg-secondary/25 border border-border/40">
              <div className="flex items-center gap-1.5">
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${log.type === "BUY" ? "bg-green-500/10 text-green-400" : "bg-rose-500/10 text-rose-400"}`}>
                  {log.type}
                </span>
                <span className="text-muted-foreground">Order filled</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-foreground">${log.price.toFixed(2)}</span>
                <span className="text-muted-foreground/60 text-[10px]">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

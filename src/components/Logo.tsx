import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className = "w-8 h-8", showText = true }: LogoProps) => {
  return (
    <div className="flex items-center gap-3">
      <div 
        className={`relative flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg border border-cyber-cyan/50 shadow-[0_0_12px_rgba(0,240,255,0.4)] ${className}`}
      >
        <span className="font-display font-bold text-xl text-transparent bg-clip-text bg-gradient-to-br from-cyber-cyan to-blue-500">
          A
        </span>
        <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyber-cyan border border-black"></span>
        </span>
      </div>
      
      {showText && (
        <div className="flex flex-col justify-center">
          <span className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 leading-none mb-1 text-lg">
            Adithya
          </span>
          <span className="text-[10px] text-cyber-cyan tracking-[0.2em] font-semibold leading-none">
            AI HUB
          </span>
        </div>
      )}
    </div>
  );
};

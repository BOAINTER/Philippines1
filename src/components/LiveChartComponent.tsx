import { useState, useMemo } from 'react';
import { Asset } from '../types';
import { Activity, Clock, Layers, Maximize2, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export const GoldCornerOrnate = ({ className }: { className: string }) => (
  <svg className={`absolute w-12 h-12 pointer-events-none text-gold-400 opacity-80 ${className}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
    {/* Elegant classical corner scrollwork */}
    <path d="M10,10 Q35,10 40,40 Q40,60 20,60 Q15,40 25,25 Q35,10 50,20" />
    <path d="M10,10 Q10,35 40,40 Q60,40 60,20 Q40,15 25,25 Q10,35 20,50" />
    <path d="M10,10 L10,80 Q10,90 20,90 Q30,90 30,80 Q30,70 15,70 Q10,70 15,80" strokeWidth="2" />
    <path d="M10,10 L80,10 Q90,10 90,20 Q90,30 80,30 Q70,30 70,15 Q70,10 80,15" strokeWidth="2" />
    <circle cx="20" cy="20" r="3.5" fill="currentColor" />
    <circle cx="10" cy="50" r="2" fill="currentColor" />
    <circle cx="50" cy="10" r="2" fill="currentColor" />
    <circle cx="35" cy="35" r="1.5" fill="currentColor" />
  </svg>
);

interface LiveChartComponentProps {
  asset: Asset;
  onRefresh: () => void;
}

export default function LiveChartComponent({ asset, onRefresh }: LiveChartComponentProps) {
  const [timeframe, setTimeframe] = useState<'1M' | '5M' | '15M' | '1H'>('1M');
  const [chartType, setChartType] = useState<'candle' | 'line'>('candle');
  const [showIndicator, setShowIndicator] = useState<'none' | 'ma' | 'bb'>('ma');

  const history = asset.priceHistory;

  // Find min and max values to fit in SVG
  const { minPrice, maxPrice, pricesRange, candles } = useMemo(() => {
    if (!history || history.length === 0) {
      return { minPrice: 0, maxPrice: 100, pricesRange: 100, candles: [] };
    }
    let min = Infinity;
    let max = -Infinity;
    history.forEach((h) => {
      if (h.low < min) min = h.low;
      if (h.high > max) max = h.high;
    });

    // Add 5% padding to top and bottom
    const range = max - min || 1;
    const paddedMin = min - range * 0.05;
    const paddedMax = max + range * 0.05;
    const paddedRange = paddedMax - paddedMin;

    return {
      minPrice: paddedMin,
      maxPrice: paddedMax,
      pricesRange: paddedRange,
      candles: history,
    };
  }, [history]);

  // Dimensions of SVG canvas
  const svgWidth = 600;
  const svgHeight = 280;

  // Calculate coordinates for SVG
  const candleWidth = svgWidth / (candles.length || 1);

  // Compute Moving Average (SMA 5) for line and overlay
  const smaPoints = useMemo(() => {
    if (candles.length < 5) return '';
    const points = [];
    for (let i = 0; i < candles.length; i++) {
      const start = Math.max(0, i - 4);
      const sub = candles.slice(start, i + 1);
      const sum = sub.reduce((acc, curr) => acc + curr.close, 0);
      const avg = sum / sub.length;

      const x = i * candleWidth + candleWidth / 2;
      const y = svgHeight - ((avg - minPrice) / pricesRange) * svgHeight;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  }, [candles, candleWidth, minPrice, pricesRange, svgHeight]);

  // Compute Line chart points
  const linePoints = useMemo(() => {
    return candles
      .map((c, i) => {
        const x = i * candleWidth + candleWidth / 2;
        const y = svgHeight - ((c.close - minPrice) / pricesRange) * svgHeight;
        return `${x},${y}`;
      })
      .join(' ');
  }, [candles, candleWidth, minPrice, pricesRange, svgHeight]);

  const lastPrice = candles[candles.length - 1]?.close || asset.currentPrice;
  const lastPriceY = svgHeight - ((lastPrice - minPrice) / pricesRange) * svgHeight;
  const isLastUp = candles[candles.length - 1]?.close >= candles[candles.length - 1]?.open;

  return (
    <div id="livechart" className="p-5 rounded-2xl border-2 border-[#0A3D91] bg-white shadow-xl relative overflow-hidden">
      {/* Golden Filigree Corners */}
      <GoldCornerOrnate className="top-1 left-1 opacity-40" />
      <GoldCornerOrnate className="top-1 right-1 rotate-90 opacity-40" />
      <GoldCornerOrnate className="bottom-1 left-1 -rotate-90 opacity-40" />
      <GoldCornerOrnate className="bottom-1 right-1 rotate-180 opacity-40" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#0A3D91]/10 border border-[#0A3D91]/20 text-[#0A3D91]">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0A3D91]">
                LiveChart Terminal
              </h2>
              <span className="px-1.5 py-0.5 rounded bg-[#F5B400] text-[10px] text-[#1F2937] font-mono font-bold">
                OTC REALTIME
              </span>
            </div>
            <h3 className="text-xl font-display font-bold text-[#1F2937] mt-0.5">
              {asset.name} <span className="text-xs font-mono font-bold text-[#0A3D91]">({asset.symbol})</span>
            </h3>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframes */}
          <div className="flex p-0.5 rounded-lg bg-slate-100 border border-gray-200">
            {(['1M', '5M', '15M', '1H'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-md transition cursor-pointer ${
                  timeframe === tf
                    ? 'bg-[#F5B400] text-[#1F2937]'
                    : 'text-gray-600 hover:text-[#0A3D91]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Type Toggles */}
          <div className="flex p-0.5 rounded-lg bg-slate-100 border border-gray-200">
            <button
              onClick={() => setChartType('candle')}
              className={`px-2 py-1 text-[10px] font-bold rounded-md transition cursor-pointer ${
                chartType === 'candle' ? 'bg-[#0A3D91] text-white' : 'text-gray-600'
              }`}
            >
              Candles
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-2 py-1 text-[10px] font-bold rounded-md transition cursor-pointer ${
                chartType === 'line' ? 'bg-[#0A3D91] text-white' : 'text-gray-600'
              }`}
            >
              Line
            </button>
          </div>

          {/* Indicator Toggles */}
          <button
            onClick={() => setShowIndicator(showIndicator === 'ma' ? 'none' : 'ma')}
            className={`p-1.5 rounded-lg border transition cursor-pointer ${
              showIndicator === 'ma'
                ? 'bg-[#F5B400] border-[#F5B400] text-[#1F2937]'
                : 'bg-slate-100 border-gray-200 text-gray-600 hover:text-[#0A3D91]'
            }`}
            title="Toggle Simple Moving Average"
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* Force Refresh */}
          <button
            onClick={onRefresh}
            className="p-1.5 rounded-lg bg-slate-100 border border-gray-200 text-gray-600 hover:text-[#0A3D91] transition active:scale-95 cursor-pointer"
            title="Simulate Market Tick"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main SVG Plot Stage */}
      <div className="my-4 relative h-[280px] w-full rounded-xl bg-[#061d42] overflow-hidden border border-[#0A3D91]/40">
        {/* Trading grid horizontal lines */}
        {[0.25, 0.5, 0.75].map((ratio, i) => {
          const yVal = svgHeight * ratio;
          const priceVal = maxPrice - ratio * pricesRange;
          return (
            <div key={i}>
              <div
                className="absolute left-0 right-0 border-t border-white/10 pointer-events-none"
                style={{ top: `${yVal}px` }}
              />
              <span
                className="absolute left-2 text-[9px] font-mono text-blue-200/60 pointer-events-none"
                style={{ top: `${yVal - 14}px` }}
              >
                ${priceVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          );
        })}

        {/* Live Candlestick/Line Canvas */}
        <svg className="w-full h-full" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
          {/* Glowing area under line chart */}
          {chartType === 'line' && (
            <path
              d={`M ${candleWidth / 2},${svgHeight} L ${linePoints} L ${(candles.length - 1) * candleWidth + candleWidth / 2},${svgHeight} Z`}
              fill="url(#goldGradientGlow)"
              opacity="0.15"
            />
          )}

          {/* Custom gradients definitions */}
          <defs>
            <linearGradient id="goldGradientGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5B400" />
              <stop offset="100%" stopColor="#061d42" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Moving Average Line overlay */}
          {showIndicator === 'ma' && (
            <polyline
              fill="none"
              stroke="#F5B400"
              strokeWidth="2"
              strokeDasharray="4,4"
              points={smaPoints}
              opacity="0.8"
            />
          )}

          {/* Standard Chart types rendering */}
          {chartType === 'line' ? (
            <polyline
              fill="none"
              stroke={asset.changePercent >= 0 ? '#16A34A' : '#ef4444'}
              strokeWidth="2.5"
              points={linePoints}
              filter="url(#glow)"
            />
          ) : (
            candles.map((candle, idx) => {
              const x = idx * candleWidth;
              const openY = svgHeight - ((candle.open - minPrice) / pricesRange) * svgHeight;
              const closeY = svgHeight - ((candle.close - minPrice) / pricesRange) * svgHeight;
              const highY = svgHeight - ((candle.high - minPrice) / pricesRange) * svgHeight;
              const lowY = svgHeight - ((candle.low - minPrice) / pricesRange) * svgHeight;

              const isGreen = candle.close >= candle.open;
              const color = isGreen ? '#16A34A' : '#ef4444';

              const wickX = x + candleWidth / 2;
              const bodyHeight = Math.max(Math.abs(closeY - openY), 2.5);
              const bodyY = Math.min(openY, closeY);
              const bodyWidth = Math.max(candleWidth - 4, 3);

              return (
                <g key={idx} className="transition-all duration-300">
                  {/* Wick (high to low line) */}
                  <line x1={wickX} y1={highY} x2={wickX} y2={lowY} stroke={color} strokeWidth="1.2" />
                  {/* Candlestick body */}
                  <rect
                    x={wickX - bodyWidth / 2}
                    y={bodyY}
                    width={bodyWidth}
                    height={bodyHeight}
                    fill={color}
                    rx="1"
                    opacity="0.85"
                  />
                </g>
              );
            })
          )}

          {/* Horizontal tracking line for current price */}
          <line
            x1="0"
            y1={lastPriceY}
            x2={svgWidth}
            y2={lastPriceY}
            stroke={isLastUp ? '#16A34A' : '#ef4444'}
            strokeWidth="0.8"
            strokeDasharray="3,3"
            opacity="0.6"
          />

          {/* Pulse target node */}
          <circle
            cx={svgWidth - candleWidth / 2}
            cy={lastPriceY}
            r="4"
            fill={isLastUp ? '#16A34A' : '#ef4444'}
            className="animate-ping"
          />
        </svg>

        {/* Float indicator label */}
        <div
          className={`absolute right-1 px-1.5 py-0.5 rounded font-mono text-[9px] font-bold text-white pointer-events-none transition-all duration-300 flex items-center gap-1 shadow ${
            isLastUp ? 'bg-[#16A34A]' : 'bg-red-600'
          }`}
          style={{ top: `${Math.max(Math.min(lastPriceY - 8, svgHeight - 20), 4)}px` }}
        >
          <span>${lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>

      {/* Meta indicators and advice overlay */}
      <div className="grid grid-cols-3 gap-2 p-3 bg-slate-100 rounded-xl border border-gray-200 text-center">
        <div>
          <span className="text-[10px] text-gray-500 block uppercase font-mono font-semibold">
            ACCURACY FACTOR
          </span>
          <span className="text-base font-display font-bold text-[#0A3D91]">
            {asset.accuracy}% Win Rate
          </span>
        </div>
        <div>
          <span className="text-[10px] text-gray-500 block uppercase font-mono font-semibold">
            RSI MOMENTUM
          </span>
          <span className="text-base font-display font-bold text-[#16A34A]">
            {asset.changePercent >= 0 ? 'Strong BUY' : 'Neutral SELL'}
          </span>
        </div>
        <div>
          <span className="text-[10px] text-gray-500 block uppercase font-mono font-semibold">
            EXECUTION SPEED
          </span>
          <span className="text-base font-display font-bold text-[#1F2937]">
            &lt; 0.12s Ping
          </span>
        </div>
      </div>
    </div>
  );
}

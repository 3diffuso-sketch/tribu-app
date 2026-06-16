"use client";

interface MiniChartProps {
  type: "line" | "bar" | "donut";
  data: number[];
  labels?: string[];
  color?: string;
  height?: number;
}

export function MiniChart({
  type,
  data,
  labels,
  color = "var(--roots-red)",
  height = 60,
}: MiniChartProps) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min;
  
  if (type === "line") {
    // Generate SVG path for line chart
    const width = 100; // viewbox width
    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    }).join(" L ");
    
    const pathD = `M ${points}`;
    const fillD = `${pathD} L ${width},${height} L 0,${height} Z`;

    return (
      <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" className="overflow-visible">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={fillD} fill="url(#lineGrad)" />
        <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Render dots for each point */}
        {data.map((val, i) => {
          const x = (i / (data.length - 1)) * width;
          const y = height - ((val - min) / range) * height;
          return (
            <circle key={i} cx={x} cy={y} r="2" fill="white" stroke={color} strokeWidth="1.5" />
          );
        })}
      </svg>
    );
  }

  if (type === "bar") {
    return (
      <div className="flex items-end justify-between gap-1 w-full" style={{ height }}>
        {data.map((val, i) => {
          const h = ((val - min) / range) * 100;
          return (
            <div key={i} className="flex-1 group relative flex flex-col items-center justify-end h-full">
              {labels && labels[i] && (
                <div className="opacity-0 group-hover:opacity-100 absolute -top-6 text-[10px] bg-roots-charcoal text-white px-1.5 py-0.5 rounded transition-opacity whitespace-nowrap z-10">
                  {labels[i]}: {val}
                </div>
              )}
              <div 
                className="w-full rounded-t-sm transition-all duration-300 group-hover:opacity-80" 
                style={{ height: `${h}%`, backgroundColor: color }} 
              />
            </div>
          );
        })}
      </div>
    );
  }

  if (type === "donut") {
    // A simple donut chart logic (supports only up to 4 items for simplicity here)
    const total = data.reduce((a, b) => a + b, 0);
    let currentAngle = 0;
    const colors = [
      color,
      "var(--roots-orange)",
      "var(--roots-green)",
      "var(--roots-brown)",
    ];

    return (
      <div className="flex items-center gap-4">
        <svg width={height} height={height} viewBox="0 0 32 32" className="transform -rotate-90">
          {data.map((val, i) => {
            const percentage = val / total;
            const strokeDasharray = `${percentage * 100} 100`;
            const strokeDashoffset = -currentAngle;
            currentAngle += percentage * 100;
            
            return (
              <circle
                key={i}
                cx="16"
                cy="16"
                r="15.91549430918954"
                fill="transparent"
                stroke={colors[i % colors.length]}
                strokeWidth="4"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
        
        {labels && (
          <div className="flex flex-col gap-1 text-xs">
            {labels.map((label, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
                <span className="text-foreground-muted">{label} <span className="font-medium text-roots-charcoal">{data[i]}</span></span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}

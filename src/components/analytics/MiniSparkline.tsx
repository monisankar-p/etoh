interface MiniSparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
}

export default function MiniSparkline({
  data,
  color = 'var(--color-primary)',
  width = 80,
  height = 32,
  strokeWidth = 2,
  className = '',
}: MiniSparklineProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = padding + (1 - (val - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p}`).join(' ');

  // Create fill area
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];
  const fillD = `${pathD} L${lastPoint.split(',')[0]},${height - padding} L${firstPoint.split(',')[0]},${height - padding} Z`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`flex-shrink-0 ${className}`}
      style={{ overflow: 'visible' }}
    >
      {/* Gradient fill */}
      <defs>
        <linearGradient id={`sparkline-grad-${color.replace(/[^a-zA-Z0-9]/g, '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path
        d={fillD}
        fill={`url(#sparkline-grad-${color.replace(/[^a-zA-Z0-9]/g, '')})`}
      />
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      <circle
        cx={parseFloat(lastPoint.split(',')[0])}
        cy={parseFloat(lastPoint.split(',')[1])}
        r={3}
        fill={color}
      />
    </svg>
  );
}

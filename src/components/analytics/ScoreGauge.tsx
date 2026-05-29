interface ScoreGaugeProps {
  score: number; // 0 to 100
  title: string;
  subtitle?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export default function ScoreGauge({
  score,
  title,
  subtitle,
  size = 120,
  strokeWidth = 12,
  className = '',
}: ScoreGaugeProps) {
  // Clamp score between 0 and 100
  const clampedScore = Math.min(100, Math.max(0, score));
  
  // Calculate SVG arc parameters
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (clampedScore / 100) * circumference;

  // Determine color based on score
  let colorClass = 'text-emerald-500';
  if (clampedScore < 50) colorClass = 'text-red-500';
  else if (clampedScore < 80) colorClass = 'text-amber-500';

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Background Circle */}
        <svg
          className="absolute inset-0 -rotate-90 transform"
          width={size}
          height={size}
        >
          <circle
            className="text-muted/20"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress Circle */}
          <circle
            className={`transition-all duration-1000 ease-out ${colorClass}`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        
        {/* Score Text inside gauge */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-foreground">
            {clampedScore}
          </span>
          <span className="text-xs text-muted-foreground">%</span>
        </div>
      </div>
      
      {/* Title & Subtitle */}
      <div className="mt-4 text-center">
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

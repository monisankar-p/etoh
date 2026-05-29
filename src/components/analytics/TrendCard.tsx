import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import MiniSparkline from './MiniSparkline';

interface TrendCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend: 'up' | 'down' | 'stable';
  trendLabel: string;
  sparklineData?: number[];
  sparklineColor?: string;
  className?: string;
}

export default function TrendCard({
  title,
  value,
  unit,
  trend,
  trendLabel,
  sparklineData,
  sparklineColor = 'var(--color-primary)',
  className = '',
}: TrendCardProps) {
  const trendConfig = {
    up: { icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    down: { icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-500/10' },
    stable: { icon: Minus, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  };

  const { icon: TrendIcon, color, bg } = trendConfig[trend];

  return (
    <div className={`rounded-2xl border border-border/50 bg-card p-5 transition-all duration-300 hover:shadow-lg hover:border-primary/20 ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color} ${bg}`}>
          <TrendIcon className="h-3 w-3" />
          {trendLabel}
        </span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-3xl font-bold text-foreground">{value}</span>
          {unit && <span className="ml-1 text-sm text-muted-foreground">{unit}</span>}
        </div>
        {sparklineData && sparklineData.length > 0 && (
          <MiniSparkline data={sparklineData} color={sparklineColor} width={80} height={32} />
        )}
      </div>
    </div>
  );
}

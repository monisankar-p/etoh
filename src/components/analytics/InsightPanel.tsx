import { Sparkles } from 'lucide-react';
import { useTranslation } from '../../i18n';

interface InsightPanelProps {
  title?: string;
  insight: string;
  className?: string;
}

export default function InsightPanel({
  title,
  insight,
  className = '',
}: InsightPanelProps) {
  const { t } = useTranslation();

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-6 ${className}`}>
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <h3 className="font-semibold text-foreground">
            {title || t('analytics.aiInsight')}
          </h3>
          <span className="ml-auto text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            {t('common.poweredByAI')}
          </span>
        </div>
        
        <div className="flex-1 text-sm text-muted-foreground leading-relaxed prose prose-sm dark:prose-invert">
          <p>{insight}</p>
        </div>
      </div>
    </div>
  );
}

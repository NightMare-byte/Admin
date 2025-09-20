import { Badge } from "./ui/badge";
import { cn } from "./ui/utils";

export type Status = 'pending' | 'ai-review' | 'flagged' | 'approved' | 'rejected' | 'field-visit';
export type RiskLevel = 'green' | 'amber' | 'red';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

interface RiskBadgeProps {
  level: RiskLevel;
  score?: number;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    pending: { label: 'Pending', variant: 'secondary' as const },
    'ai-review': { label: 'AI Review', variant: 'default' as const },
    flagged: { label: 'Flagged', variant: 'destructive' as const },
    approved: { label: 'Approved', variant: 'default' as const },
    rejected: { label: 'Rejected', variant: 'destructive' as const },
    'field-visit': { label: 'Field Visit', variant: 'outline' as const },
  };

  const config = statusConfig[status];
  
  return (
    <Badge 
      variant={config.variant} 
      className={cn(
        status === 'approved' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        className
      )}
    >
      {config.label}
    </Badge>
  );
}

export function RiskBadge({ level, score, className }: RiskBadgeProps) {
  const riskConfig = {
    green: { 
      label: 'Low Risk', 
      className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' 
    },
    amber: { 
      label: 'Medium Risk', 
      className: 'bg-accent text-accent-foreground hover:bg-accent/80' 
    },
    red: { 
      label: 'High Risk', 
      className: 'bg-destructive text-destructive-foreground hover:bg-destructive/80' 
    },
  };

  const config = riskConfig[level];
  const tooltip = score ? `Risk ${score.toFixed(2)}: ${config.label.toLowerCase()}` : config.label;
  
  return (
    <Badge 
      className={cn(config.className, className)}
      title={tooltip}
    >
      {config.label}
    </Badge>
  );
}
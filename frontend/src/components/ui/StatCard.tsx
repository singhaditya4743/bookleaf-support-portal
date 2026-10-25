import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/cn';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  highlight?: boolean;
}

export function StatCard({ label, value, icon: Icon, highlight }: StatCardProps) {
  return (
    <Card className={cn('p-5', highlight && 'border-amber-200 bg-amber-50/40')}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <Icon
          className={cn('size-4', highlight ? 'text-amber-600' : 'text-slate-400')}
          aria-hidden
        />
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
    </Card>
  );
}

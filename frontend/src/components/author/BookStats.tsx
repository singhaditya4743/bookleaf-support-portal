import { BookOpen, Clock, IndianRupee, ShoppingBag } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { formatCurrency, formatNumber } from '@/lib/format';
import { BookStatsSummary } from '@/types/book.types';

export function BookStats({ stats }: { stats: BookStatsSummary }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard label="Books" value={formatNumber(stats.totalBooks)} icon={BookOpen} />
      <StatCard label="Copies sold" value={formatNumber(stats.copiesSold)} icon={ShoppingBag} />
      <StatCard
        label="Royalty earned"
        value={formatCurrency(stats.royaltyEarned)}
        icon={IndianRupee}
      />
      <StatCard
        label="Royalty pending"
        value={formatCurrency(stats.royaltyPending)}
        icon={Clock}
        highlight={stats.royaltyPending > 0}
      />
    </div>
  );
}

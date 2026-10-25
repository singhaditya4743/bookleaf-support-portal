import { LucideIcon } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { LinkButton } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';

interface NotFoundStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  back: { href: string; label: string };
}

export function NotFoundState({ icon, title, description, back }: NotFoundStateProps) {
  return (
    <>
      <PageHeader title={title} back={back} />
      <Card>
        <EmptyState
          icon={icon}
          title={title}
          description={description}
          action={<LinkButton href={back.href}>Back to {back.label}</LinkButton>}
        />
      </Card>
    </>
  );
}

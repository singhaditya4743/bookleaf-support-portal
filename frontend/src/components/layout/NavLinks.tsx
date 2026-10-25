'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import { NAV_ITEMS } from '@/components/layout/nav-config';
import { cn } from '@/lib/cn';
import { Panel } from '@/types/ui.types';

interface NavLinksProps {
  panel: Panel;
  onNavigate?: () => void;
}

interface NavListProps extends NavLinksProps {
  pathname: string | null;
}

function NavList({ panel, pathname, onNavigate }: NavListProps) {
  return (
    <nav className="space-y-1">
      {NAV_ITEMS[panel].map(({ label, href, icon: Icon }) => {
        const active = pathname === href || Boolean(pathname?.startsWith(`${href}/`));
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              active
                ? 'bg-brand-50 text-brand-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
            )}
          >
            <Icon className="size-4.5" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function ActiveNavList(props: NavLinksProps) {
  return <NavList {...props} pathname={usePathname()} />;
}

export function NavLinks(props: NavLinksProps) {
  return (
    <Suspense fallback={<NavList {...props} pathname={null} />}>
      <ActiveNavList {...props} />
    </Suspense>
  );
}

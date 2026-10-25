'use client';

import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { MobileNav } from '@/components/layout/MobileNav';
import { Sidebar } from '@/components/layout/Sidebar';
import { useSession } from '@/hooks/common/use-session';
import { HOME_BY_ROLE, LOGIN_ROUTE, PANEL_ROLE } from '@/lib/auth/routes';
import { Panel } from '@/types/ui.types';

interface PanelShellProps {
  panel: Panel;
  children: ReactNode;
}

export function PanelShell({ panel, children }: PanelShellProps) {
  const router = useRouter();
  const session = useSession();
  const allowed = session?.user.role === PANEL_ROLE[panel];

  useEffect(() => {
    if (session === undefined || allowed) return;
    router.replace(session ? HOME_BY_ROLE[session.user.role] : LOGIN_ROUTE);
  }, [session, allowed, router]);

  if (!session || !allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center" aria-busy="true">
        <LoaderCircle className="size-6 animate-spin text-brand-600" aria-label="Loading" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar panel={panel} user={session.user} />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileNav panel={panel} user={session.user} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}

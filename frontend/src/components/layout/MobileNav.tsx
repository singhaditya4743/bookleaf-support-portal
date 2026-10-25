'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Logo } from '@/components/layout/Logo';
import { NavLinks } from '@/components/layout/NavLinks';
import { UserCard } from '@/components/layout/UserCard';
import { Panel } from '@/types/ui.types';
import { UserProfile } from '@/types/user.types';

interface MobileNavProps {
  panel: Panel;
  user: UserProfile;
}

export function MobileNav({ panel, user }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-30 border-b border-slate-200 bg-white lg:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="space-y-4 border-t border-slate-100 px-4 py-4">
          <NavLinks panel={panel} onNavigate={() => setOpen(false)} />
          <UserCard user={user} />
        </div>
      )}
    </div>
  );
}

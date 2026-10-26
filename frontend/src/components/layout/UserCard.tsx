'use client';

import { LogOut } from 'lucide-react';
import { getInitials } from '@/lib/initials';
import { logout } from '@/services/auth.service';
import { UserProfile } from '@/types/user.types';

interface UserCardProps {
  user: UserProfile;
}

export function UserCard({ user }: UserCardProps) {
  const initials = getInitials(user.name);

  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
        {initials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-900">{user.name}</p>
        <p className="truncate text-xs text-slate-500">{user.email}</p>
      </div>
      <button
        type="button"
        onClick={logout}
        aria-label="Log out"
        title="Log out"
        className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      >
        <LogOut className="size-4" />
      </button>
    </div>
  );
}

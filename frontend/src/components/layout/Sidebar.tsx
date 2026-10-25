import { Logo } from '@/components/layout/Logo';
import { NavLinks } from '@/components/layout/NavLinks';
import { UserCard } from '@/components/layout/UserCard';
import { Panel } from '@/types/ui.types';
import { UserProfile } from '@/types/user.types';

interface SidebarProps {
  panel: Panel;
  user: UserProfile;
}

export function Sidebar({ panel, user }: SidebarProps) {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-5 lg:flex">
      <div className="px-2">
        <Logo />
      </div>
      <div className="mt-8 flex-1">
        <NavLinks panel={panel} />
      </div>
      <UserCard user={user} />
    </aside>
  );
}

import { PanelShell } from '@/components/layout/PanelShell';

export default function AdminLayout({ children }: LayoutProps<'/admin'>) {
  return <PanelShell panel="admin">{children}</PanelShell>;
}

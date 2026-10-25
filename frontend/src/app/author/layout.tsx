import { PanelShell } from '@/components/layout/PanelShell';

export default function AuthorLayout({ children }: LayoutProps<'/author'>) {
  return <PanelShell panel="author">{children}</PanelShell>;
}

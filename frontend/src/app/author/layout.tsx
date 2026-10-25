import { MobileNav } from '@/components/layout/MobileNav';
import { Sidebar } from '@/components/layout/Sidebar';
import { MOCK_AUTHOR } from '@/mocks/books.mock';

export default function AuthorLayout({ children }: LayoutProps<'/author'>) {
  return (
    <div className="flex min-h-screen">
      <Sidebar panel="author" user={MOCK_AUTHOR} />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileNav panel="author" user={MOCK_AUTHOR} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}

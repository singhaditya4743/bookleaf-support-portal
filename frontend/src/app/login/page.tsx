import { CheckCircle2 } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';
import { LoginIllustration } from '@/components/auth/LoginIllustration';
import { Logo } from '@/components/layout/Logo';

const HIGHLIGHTS = [
  'Track royalties for every book in one place',
  'Raise a query and follow every reply live',
  'Get clear timelines from the BookLeaf team',
];

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="hidden flex-col justify-between gap-10 bg-brand-900 p-12 text-white lg:flex">
        <span className="text-lg font-semibold">BookLeaf Publishing</span>
        <div className="flex flex-1 items-center justify-center">
          <LoginIllustration />
        </div>
        <div>
          <h2 className="text-3xl leading-tight font-semibold">
            Your books, royalties and support — all in one portal.
          </h2>
          <ul className="mt-8 space-y-3 text-brand-100">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="size-5 text-brand-500" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-brand-100/70">Author Support &amp; Communication Portal</p>
      </section>

      <section className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm space-y-8">
          <Logo />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Sign in to your account</h1>
            <p className="mt-1 text-sm text-slate-500">Use the email registered with BookLeaf.</p>
          </div>
          <LoginForm />
        </div>
      </section>
    </div>
  );
}

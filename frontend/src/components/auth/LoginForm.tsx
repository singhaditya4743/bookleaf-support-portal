'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/inputs';
import { hasErrors, validateLogin } from '@/lib/validation';
import { FieldErrors } from '@/types/ui.types';
import { LoginCredentials } from '@/types/user.types';

export function LoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<LoginCredentials>({ email: '', password: '' });
  const [errors, setErrors] = useState<FieldErrors<LoginCredentials>>({});
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof LoginCredentials, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLogin(values);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;
    setSubmitting(true);
    router.push('/author/books');
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <FormField id="email" label="Email" error={errors.email}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          invalid={Boolean(errors.email)}
          onChange={(event) => update('email', event.target.value)}
        />
      </FormField>
      <FormField id="password" label="Password" error={errors.password}>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={values.password}
          invalid={Boolean(errors.password)}
          onChange={(event) => update('password', event.target.value)}
        />
      </FormField>
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
}

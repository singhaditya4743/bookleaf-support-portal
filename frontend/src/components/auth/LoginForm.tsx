'use client';

import { PasswordInput } from '@/components/auth/PasswordInput';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/inputs';
import { useLoginForm } from '@/hooks/auth/use-login-form';

export function LoginForm() {
  const { values, errors, serverError, submitting, update, submit } = useLoginForm();

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {serverError && <Alert message={serverError} />}
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

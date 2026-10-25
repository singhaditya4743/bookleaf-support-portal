'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useSession } from '@/hooks/common/use-session';
import { getErrorMessage } from '@/lib/api/api-error';
import { HOME_BY_ROLE } from '@/lib/auth/routes';
import { hasErrors, validateLogin } from '@/lib/validation';
import { login } from '@/services/auth.service';
import { FieldErrors } from '@/types/ui.types';
import { LoginCredentials } from '@/types/user.types';

export function useLoginForm() {
  const router = useRouter();
  const session = useSession();
  const [values, setValues] = useState<LoginCredentials>({ email: '', password: '' });
  const [errors, setErrors] = useState<FieldErrors<LoginCredentials>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (session) router.replace(HOME_BY_ROLE[session.user.role]);
  }, [session, router]);

  const update = useCallback((field: keyof LoginCredentials, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setServerError(null);
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLogin(values);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;
    setSubmitting(true);
    try {
      await login(values);
    } catch (error) {
      setServerError(getErrorMessage(error));
      setSubmitting(false);
    }
  };

  return { values, errors, serverError, submitting, update, submit };
}

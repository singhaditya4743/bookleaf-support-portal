'use client';

import { FormEvent, useState } from 'react';
import { hasErrors, validateTicket } from '@/lib/validation';
import { CreateTicketInput } from '@/types/ticket.types';
import { FieldErrors } from '@/types/ui.types';

export function useQueryForm(initialBookId: string) {
  const empty: CreateTicketInput = { bookId: initialBookId, subject: '', description: '' };
  const [values, setValues] = useState<CreateTicketInput>(empty);
  const [errors, setErrors] = useState<FieldErrors<CreateTicketInput>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof CreateTicketInput>(field: K, value: CreateTicketInput[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateTicket(values);
    setErrors(nextErrors);
    if (!hasErrors(nextErrors)) setSubmitted(true);
  };

  const reset = () => {
    setValues(empty);
    setErrors({});
    setSubmitted(false);
  };

  return { values, errors, submitted, update, submit, reset };
}

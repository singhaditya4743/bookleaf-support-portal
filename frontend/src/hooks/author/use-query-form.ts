'use client';

import { FormEvent, useCallback, useState } from 'react';
import { getErrorMessage } from '@/lib/api/api-error';
import { hasErrors, validateTicket } from '@/lib/validation';
import { createTicket } from '@/services/author.service';
import { CreateTicketInput } from '@/types/ticket.types';
import { FieldErrors } from '@/types/ui.types';

const toPayload = ({ bookId, subject, description, attachmentName }: CreateTicketInput) => ({
  bookId: bookId || undefined,
  subject: subject.trim(),
  description: description.trim(),
  attachmentName,
});

export function useQueryForm(initialBookId: string) {
  const [values, setValues] = useState<CreateTicketInput>({
    bookId: initialBookId,
    subject: '',
    description: '',
  });
  const [errors, setErrors] = useState<FieldErrors<CreateTicketInput>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [createdId, setCreatedId] = useState<string | null>(null);

  const update = useCallback(
    <K extends keyof CreateTicketInput>(field: K, value: CreateTicketInput[K]) => {
      setValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    },
    [],
  );

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateTicket(values);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;
    setSubmitting(true);
    setServerError(null);
    try {
      const ticket = await createTicket(toPayload(values));
      setCreatedId(ticket.id);
    } catch (error) {
      setServerError(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const reset = useCallback(() => {
    setValues({ bookId: initialBookId, subject: '', description: '' });
    setErrors({});
    setServerError(null);
    setCreatedId(null);
  }, [initialBookId]);

  return { values, errors, serverError, submitting, createdId, update, submit, reset };
}

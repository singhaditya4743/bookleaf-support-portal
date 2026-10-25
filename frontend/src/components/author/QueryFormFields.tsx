'use client';

import { Send } from 'lucide-react';
import { useMemo } from 'react';
import { QuerySuccess } from '@/components/author/QuerySuccess';
import { Alert } from '@/components/ui/Alert';
import { AttachmentInput } from '@/components/ui/AttachmentInput';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import { Input, Select, Textarea } from '@/components/ui/inputs';
import { useQueryForm } from '@/hooks/author/use-query-form';
import { DESCRIPTION_LIMITS, SUBJECT_LIMITS } from '@/lib/validation';
import { AuthorBook } from '@/types/book.types';

const GENERAL = { value: '', label: 'General / Account level' };
const count = (text: string, max: number) => `${text.trim().length} / ${max}`;

interface QueryFormFieldsProps {
  books: AuthorBook[];
  initialBookId: string;
}

export function QueryFormFields({ books, initialBookId }: QueryFormFieldsProps) {
  const form = useQueryForm(initialBookId);
  const { values, errors, serverError, submitting, createdId, update, submit, reset } = form;
  const options = useMemo(
    () => [GENERAL, ...books.map((book) => ({ value: book.id, label: book.title }))],
    [books],
  );

  if (createdId) return <QuerySuccess ticketId={createdId} onNewQuery={reset} />;

  return (
    <Card className="p-5 sm:p-6">
      <form onSubmit={submit} noValidate className="space-y-5">
        {serverError && <Alert message={serverError} />}
        <FormField id="bookId" label="Which book is this about?">
          <Select
            id="bookId"
            options={options}
            value={values.bookId ?? ''}
            onChange={(event) => update('bookId', event.target.value || undefined)}
          />
        </FormField>
        <FormField
          id="subject"
          label="Subject"
          error={errors.subject}
          hint={count(values.subject, SUBJECT_LIMITS.max)}
        >
          <Input
            id="subject"
            placeholder="e.g. Royalty for last quarter not received"
            maxLength={SUBJECT_LIMITS.max}
            value={values.subject}
            invalid={Boolean(errors.subject)}
            onChange={(event) => update('subject', event.target.value)}
          />
        </FormField>
        <FormField
          id="description"
          label="Describe your issue"
          error={errors.description}
          hint={count(values.description, DESCRIPTION_LIMITS.max)}
        >
          <Textarea
            id="description"
            rows={7}
            maxLength={DESCRIPTION_LIMITS.max}
            placeholder="Share as much detail as you can: dates, amounts, links or order numbers."
            value={values.description}
            invalid={Boolean(errors.description)}
            onChange={(event) => update('description', event.target.value)}
          />
        </FormField>
        <FormField id="attachment" label="Attachment" optional>
          <AttachmentInput
            id="attachment"
            fileName={values.attachmentName}
            onChange={(name) => update('attachmentName', name)}
          />
        </FormField>
        <div className="flex justify-end border-t border-slate-100 pt-5">
          <Button type="submit" disabled={submitting}>
            <Send className="size-4" aria-hidden />
            {submitting ? 'Submitting…' : 'Submit query'}
          </Button>
        </div>
      </form>
    </Card>
  );
}

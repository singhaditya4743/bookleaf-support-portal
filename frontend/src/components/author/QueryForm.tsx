'use client';

import { Send } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { QuerySuccess } from '@/components/author/QuerySuccess';
import { AttachmentInput } from '@/components/ui/AttachmentInput';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import { Input, Select, Textarea } from '@/components/ui/inputs';
import { useAuthorBooks } from '@/hooks/use-author-books';
import { useQueryForm } from '@/hooks/use-query-form';
import { DESCRIPTION_LIMITS, SUBJECT_LIMITS } from '@/lib/validation';

const GENERAL = { value: '', label: 'General / Account level' };

export function QueryForm() {
  const { books } = useAuthorBooks();
  const preselected = useSearchParams().get('bookId') ?? '';
  const initialBookId = books.some((book) => book.id === preselected) ? preselected : '';
  const { values, errors, submitted, update, submit, reset } = useQueryForm(initialBookId);

  if (submitted) return <QuerySuccess onNewQuery={reset} />;

  const options = [GENERAL, ...books.map((book) => ({ value: book.id, label: book.title }))];
  const count = (text: string, max: number) => `${text.trim().length} / ${max}`;

  return (
    <Card className="p-5 sm:p-6">
      <form onSubmit={submit} noValidate className="space-y-5">
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
          <Button type="submit">
            <Send className="size-4" aria-hidden />
            Submit query
          </Button>
        </div>
      </form>
    </Card>
  );
}

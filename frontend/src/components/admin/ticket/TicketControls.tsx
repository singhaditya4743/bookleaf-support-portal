'use client';

import { Sparkles, UserRoundCheck } from 'lucide-react';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import { Select } from '@/components/ui/inputs';
import { SuccessNote } from '@/components/ui/SuccessNote';
import { useAdminTicketContext } from '@/hooks/admin/use-admin-ticket-context';
import { useFlashMessage } from '@/hooks/common/use-flash-message';
import { useSession } from '@/hooks/common/use-session';
import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  PROVIDER_LABELS,
  STATUS_LABELS,
  toOptions,
} from '@/lib/labels';
import { AdminTicketDetail, UpdateTicketInput } from '@/types/admin-ticket.types';

type Status = AdminTicketDetail['status'];
type Category = AdminTicketDetail['category'];
type Priority = AdminTicketDetail['priority'];

const STATUS_OPTIONS = toOptions(STATUS_LABELS);
const CATEGORY_OPTIONS = toOptions(CATEGORY_LABELS);
const PRIORITY_OPTIONS = toOptions(PRIORITY_LABELS);

export function TicketControls() {
  const { ticket, actions } = useAdminTicketContext();
  const userId = useSession()?.user.id;
  const busy = actions.pending === 'update' || actions.pending === 'assign';
  const error = actions.error?.action === 'update' || actions.error?.action === 'assign';
  const mine = ticket.assignedTo?.id === userId;
  const [saved, flash] = useFlashMessage();

  const change = async (input: UpdateTicketInput, label: string, value?: string) => {
    if (await actions.update(input)) flash(`${label} changed to ${value}`);
  };

  return (
    <Card>
      <CardHeader title="Manage ticket" />
      <div className="space-y-4 px-5 py-5">
        {error && actions.error && <Alert message={actions.error.message} />}
        <SuccessNote message={saved} />
        <FormField id="status" label="Status">
          <Select
            id="status"
            options={STATUS_OPTIONS}
            value={ticket.status}
            disabled={busy}
            onChange={({ target }) =>
              change({ status: target.value as Status }, 'Status', target.selectedOptions[0]?.text)
            }
          />
        </FormField>
        <FormField id="category" label="Category">
          <Select
            id="category"
            options={CATEGORY_OPTIONS}
            value={ticket.category}
            disabled={busy}
            onChange={({ target }) =>
              change(
                { category: target.value as Category },
                'Category',
                target.selectedOptions[0]?.text,
              )
            }
          />
        </FormField>
        <FormField id="priority" label="Priority">
          <Select
            id="priority"
            options={PRIORITY_OPTIONS}
            value={ticket.priority}
            disabled={busy}
            onChange={({ target }) =>
              change(
                { priority: target.value as Priority },
                'Priority',
                target.selectedOptions[0]?.text,
              )
            }
          />
        </FormField>
        <p className="flex items-center gap-1.5 text-xs text-slate-500">
          <Sparkles className="size-3.5 text-violet-500" aria-hidden />
          {ticket.classifiedBy
            ? `Category and priority set by ${PROVIDER_LABELS[ticket.classifiedBy]}. Change them to override.`
            : 'AI classification is in progress…'}
        </p>
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="text-sm">
            <p className="text-xs text-slate-500">Assigned to</p>
            <p className="font-medium text-slate-900">
              {mine ? 'You' : (ticket.assignedTo?.name ?? 'Unassigned')}
            </p>
          </div>
          {!mine && (
            <Button size="sm" onClick={actions.assignToMe} disabled={busy}>
              <UserRoundCheck className="size-4" aria-hidden />
              Assign to me
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

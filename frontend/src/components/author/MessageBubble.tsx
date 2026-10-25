import { cn } from '@/lib/cn';
import { formatDateTime } from '@/lib/format';

interface MessageBubbleProps {
  author: string;
  body: string;
  createdAt: string;
  fromTeam: boolean;
}

export function MessageBubble({ author, body, createdAt, fromTeam }: MessageBubbleProps) {
  return (
    <div className={cn('flex gap-3', !fromTeam && 'flex-row-reverse')}>
      <span
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
          fromTeam ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-700',
        )}
      >
        {fromTeam ? 'BL' : 'You'}
      </span>
      <div className={cn('max-w-[85%] space-y-1', !fromTeam && 'items-end text-right')}>
        <p className="text-xs text-slate-500">
          <span className="font-medium text-slate-700">{author}</span> · {formatDateTime(createdAt)}
        </p>
        <div
          className={cn(
            'rounded-xl px-4 py-3 text-left text-sm leading-relaxed whitespace-pre-line',
            fromTeam ? 'bg-white ring-1 ring-slate-200' : 'bg-brand-50 text-slate-800',
          )}
        >
          {body}
        </div>
      </div>
    </div>
  );
}

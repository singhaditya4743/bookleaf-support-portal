import { AuthorTicketDetail } from '@/types/ticket.types';

export const MOCK_TICKETS: AuthorTicketDetail[] = [
  {
    id: 'ticket-1',
    subject: 'Royalty for Q3 not received yet',
    description:
      'My dashboard shows Rs 3,690 pending for Ctrl+Alt+Delete My Ex but I have not received the October payout. Could you please check?',
    status: 'IN_PROGRESS',
    category: 'ROYALTY_PAYMENTS',
    book: { id: 'book-bk012', title: 'Ctrl+Alt+Delete My Ex' },
    attachmentName: 'bank-statement-oct.pdf',
    resolvedAt: null,
    createdAt: '2026-10-24T06:30:00.000Z',
    updatedAt: '2026-10-25T10:15:00.000Z',
    messages: [
      {
        id: 'msg-1',
        body: 'Hi Sneha, thank you for flagging this. Your pending royalty of Rs 3,690 is due in the current quarterly payout. I have asked our finance team to confirm the transfer date and will update you within 48 hours.\n\nWarm regards,\nTeam BookLeaf',
        senderName: 'Support Team',
        senderRole: 'ADMIN',
        createdAt: '2026-10-25T10:15:00.000Z',
      },
    ],
  },
  {
    id: 'ticket-2',
    subject: 'When will the cover design be ready?',
    description:
      'It has been three weeks since I sent my feedback on the cover for Midnight in Mysore. Is there an updated timeline?',
    status: 'OPEN',
    category: 'BOOK_STATUS_PRODUCTION',
    book: { id: 'book-bk013', title: 'Midnight in Mysore' },
    attachmentName: null,
    resolvedAt: null,
    createdAt: '2026-10-25T07:05:00.000Z',
    updatedAt: '2026-10-25T07:05:00.000Z',
    messages: [],
  },
  {
    id: 'ticket-3',
    subject: 'Book showing unavailable on Amazon US',
    description:
      'The Algorithm of Love shows "Currently unavailable" on Amazon US since last week. Readers are asking me where to buy it.',
    status: 'RESOLVED',
    category: 'DISTRIBUTION_AVAILABILITY',
    book: { id: 'book-bk011', title: 'The Algorithm of Love' },
    attachmentName: null,
    resolvedAt: '2026-10-22T14:40:00.000Z',
    createdAt: '2026-10-20T09:10:00.000Z',
    updatedAt: '2026-10-22T14:40:00.000Z',
    messages: [
      {
        id: 'msg-2',
        body: 'Hi Sneha, this was a stock sync issue with Amazon US. We have triggered a re-sync and the listing is live again.\n\nWarm regards,\nTeam BookLeaf',
        senderName: 'BookLeaf Admin',
        senderRole: 'ADMIN',
        createdAt: '2026-10-22T14:40:00.000Z',
      },
    ],
  },
];

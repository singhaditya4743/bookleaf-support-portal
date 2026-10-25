import { BookOpen, MessageSquarePlus, Ticket } from 'lucide-react';
import { NavItem, Panel } from '@/types/ui.types';

export const NAV_ITEMS: Record<Panel, NavItem[]> = {
  author: [
    { label: 'My Books', href: '/author/books', icon: BookOpen },
    { label: 'New Query', href: '/author/new-query', icon: MessageSquarePlus },
    { label: 'My Tickets', href: '/author/tickets', icon: Ticket },
  ],
  admin: [],
};

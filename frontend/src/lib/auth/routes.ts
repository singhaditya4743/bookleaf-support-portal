import { Panel } from '@/types/ui.types';
import { Role } from '@/types/user.types';

export const LOGIN_ROUTE = '/login';

export const HOME_BY_ROLE: Record<Role, string> = {
  AUTHOR: '/author/books',
  ADMIN: '/admin/tickets',
};

export const PANEL_ROLE: Record<Panel, Role> = {
  author: 'AUTHOR',
  admin: 'ADMIN',
};

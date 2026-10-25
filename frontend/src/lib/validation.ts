import { LoginCredentials } from '@/types/user.types';
import { CreateTicketInput } from '@/types/ticket.types';
import { FieldErrors } from '@/types/ui.types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin({
  email,
  password,
}: LoginCredentials): FieldErrors<LoginCredentials> {
  const errors: FieldErrors<LoginCredentials> = {};
  if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Please enter a valid email address';
  if (password.length < 6) errors.password = 'Password must be at least 6 characters';
  return errors;
}

export const SUBJECT_LIMITS = { min: 5, max: 150 };
export const DESCRIPTION_LIMITS = { min: 20, max: 5000 };

export function validateTicket({
  subject,
  description,
}: CreateTicketInput): FieldErrors<CreateTicketInput> {
  const errors: FieldErrors<CreateTicketInput> = {};
  const subjectLength = subject.trim().length;
  const descriptionLength = description.trim().length;
  if (subjectLength < SUBJECT_LIMITS.min || subjectLength > SUBJECT_LIMITS.max) {
    errors.subject = `Subject must be between ${SUBJECT_LIMITS.min} and ${SUBJECT_LIMITS.max} characters`;
  }
  if (descriptionLength < DESCRIPTION_LIMITS.min || descriptionLength > DESCRIPTION_LIMITS.max) {
    errors.description = `Description must be between ${DESCRIPTION_LIMITS.min} and ${DESCRIPTION_LIMITS.max} characters`;
  }
  return errors;
}

export const hasErrors = <T>(errors: FieldErrors<T>): boolean => Object.keys(errors).length > 0;

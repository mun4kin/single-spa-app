import { createTypedAction } from 'redux-actions-ts';
import { IFeedback } from '../types/feedback.types';

export const sendFeedbackPending = createTypedAction<IFeedback>('[Pending] Отправить обратную связь');
export const sendFeedbackSuccess = createTypedAction<void>('[Success] Отправить обратную связь');

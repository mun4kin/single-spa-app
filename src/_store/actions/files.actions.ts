import { createTypedAction } from 'redux-actions-ts';
import { IAttachment } from "../types/worktime.types";

export const downloadFilePending = createTypedAction<IAttachment>('[Pending] Скачать файл');
export const downloadFileSuccess = createTypedAction<void>('[Success] Скачать файл');

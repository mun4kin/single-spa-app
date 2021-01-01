import { IOption } from 'root-front/dist/types';
import { IUser } from './user.types';
import { IDictionaryState } from '../reducers/dictionary.reducer';

//--------------------------------------график рабочего времени---------------------------------------------------------
export interface IScheduleItem {
  wiId?: string;
  idWorkTemplate?: string;
  /** id дня недели*/
  dayId: string;
  /** начало работы в минутах 9:00 = 9*60 = 540*/
  start: number;
  /** конец работы в минутах*/
  end: number;
  /** доступно ли поле для изменения*/
  editable?: boolean;
}
interface IFlags {
  wiId?: string;
  field?: string;
  editable: boolean;
  show: boolean;
  required: boolean;
}
export interface IScheduleItemForm extends IScheduleItem {
  endFlags: IFlags;
  startFlags: IFlags;
}

export interface IBasicWorkTime {
  wiId?: string;
  /** id рабочего графика из справочника*/
  idWorkTemplate: string;
  /** имя рабочего графика из справочника*/
  nameWorkTemplate: string;
  /** массив деталей рабочего времени по дням недели*/
  workTime: IScheduleItem[];
  /** начало действия расписания*/
  startDate?: string;
  /** окончание действия расписания*/
  endDate?: string;
  /** число рабочего времени в минутах*/
  timePerWeek: number;
  /** Вид перерыва на кормление (1 - 30 мин. / 2 - 60 мин. / 3 - 30/60 мин.)*/
  breakFeedType?: string;
  /** Вид перерыва на кормление (описание)*/
  breakFeedTypeDesc?: string;
  /** Период перерыва на кормление (1 - Суммарно в начале дня / 2 - Суммарно к обеденному перерыву / 3 - Суммарно в конце дня / 4 - Каждые 3 часа*/
  breakFeedPer?: string;
  /** Период перерыва на кормление (описание)*/
  breakFeedPerDesc?: string;
  /** перерыв в минутах*/
  break: number;
  /** процент рабочего времени*/
  percentage?: number;
  /** комментарий*/
  comment?: string;
  /** существующая в системе заявка*/
  createdTask?: {
    procGuid: string;
    wiId: string;
    procEmpId: string;
    referenceNumber: string;
    procStatus: string;
    scenarioStage: string;
    stepStatus: string;
  };
}

export interface IBasicWorkTimeForm extends IBasicWorkTime {
  workTemplateFlags: IFlags;
  startDateFlags: IFlags;
  endDateFlags: IFlags;
  breakFlags: IFlags;
  workTime: IScheduleItemForm[];
}
//--------------------------------------процесс-------------------------------------------------------------------------
export interface IProcess {
  referenceNumber?: string;
  '@odata.context'?: string;
  '@odata.metadataEtag'?: string;
  scenarioStage?: string;
  currActArea?: string;
  currPathId?: string;
  currStepId?: string;
  procGuid?: string;
  procStatusText?: string;
  procStatus?: string;
  InitDate?: string;
  procEmpId?: string;
  /** Идентификатор элемента потока операций (техническое поле для фильтрации данных).*/
  wiId: string;
  /** Инициатор заявки */
  initiator: IUser;
  /** на кого заявка */
  user: IUser;
  /** Текущий тип шага (ид)*/
  currentActivityId?: string;
  /** Текущий тип шага (текст)*/
  currentActivityText?: string;
  /** комментарий обоснование ограничение?*/
  comment?: string;
  /** Причина изменнеия графика id*/
  reason: string;
  /** Причина изменнеия графика текст*/
  reasonDesc?: string;
  /** Вложения */
  attachments: IAttachment[];
  /** Путь выполнения заявки */
  path: IRequestPath[];
  /** Код функции (SEND - отправить форму / APPROVE - согласовать форму / REJECT - отклонить форму)*/
  event?: string;
  events: {
    wiId?: string;
    event: string;
  }[];
  /** массив деталей рабочего времени по дням недели*/
  schedule: IBasicWorkTimeForm;
}
/** Приложенный файл */
export interface IAttachment {
  wiId?: string;
  /** GUID приложения */
  attGuid: string;
  /** Вид приложения (ид) */
  attType: string;
  /** Вид приложения (текст) */
  attTypeText: string;
  /** Имя файла */
  attFileName: string;
  /** Операция над вложением (I - добвить / D - удалить)*/
  attAction?: string;
  attBase64?: string;
  procGuid?: string;
}
//--------------------------------------Путь согласования---------------------------------------------------------------
export interface IRequestPath {
  /** Шаг маршрута*/
  stepId: string;
  /** Тип шаг (ид)*/
  activityId: string;
  /** Тип шаг (текст)*/
  activityText: string;
  /** Агент (ид)*/
  agent: string;
  /** Агент (текст)*/
  agentName: string;
  /** Фактический исполнитель*/
  user: IUser[] | null;
  /** Статус (ид)*/
  statusId: string;
  /** Статус (текст)*/
  statusText: string;
  /** Критичность (0 - None (no color) / 1 - Error (red) / 2 - Warning (yellow) / 3 - Success (green))*/
  criticality: string;
  date?: number;
  comment?: string;
}
//--------------------------------------интерфейс селетора--------------------------------------------------------------
export interface IWorkTimeStruct {
  worktime: IBasicWorkTimeForm;
  dict: IDictionaryState;
  process: IProcess;
  /** я ли просматриваю заявку*/
  isMe: boolean;
  /**текущий щаг процесса*/
  currentStep: string;
}

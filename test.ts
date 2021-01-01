interface IProcess {
  /** Ссылочный номер процесса - ключ процесса (техническое поле для фильтрации данных).*/
  processRefNumber: string;
  /** Код функции (SEND - отправить форму / APPROVE - согласовать форму / REJECT - отклонить форму)*/
  event?: string;
  events: string[];
  /** комментарий обоснование ограничение?*/
  comment?: string;
  /** массив деталей рабочего времени по дням недели*/
  schedule: IBasicWorkTime;
}

interface IScheduleItem {
  /** id дня недели*/
  dayId: string;
  /** начало работы в минутах 9:00 = 9*60 = 540*/
  start: number;
  startFlags: IFlags;
  /** конец работы в минутах*/
  end: number;
  endFlags: IFlags;
  /** доступно ли поле для изменения*/
  editable: boolean;
}

interface IFlags {
  editable: boolean;
  show: boolean;
  required: boolean;
}
interface IBasicWorkTime {
  /** id рабочего графика из справочника*/
  idWorkTemplate: string;
  workTemplateFlags: IFlags;
  /** имя рабочего графика из справочника*/
  nameWorkTemplate: string;
  /** массив деталей рабочего времени по дням недели*/
  workTime: IScheduleItem[];
  /** начало действия расписания*/
  startDate: string;
  startDateFlags: IFlags;
  /** окончание действия расписания*/
  endDate: string;
  endDateFlags: IFlags;
  /** число рабочего времени в минутах*/
  timePerWeek: number;
  /** перерыв в минутах*/
  break: number;
  breakFlags: IFlags;
  /** процент рабочего времени*/
  percentage: number;
}

const workChart: IProcess = {
  processRefNumber: '',
  event: '',
  events: ['SEND', 'APPROVE'],
  comment: '',
  schedule: {
    idWorkTemplate: 'main40',
    nameWorkTemplate: 'НОРМАТИВНЫЙ 40 часов',
    workTemplateFlags: {
      editable: true,
      show: true,
      required: true
    },
    workTime: [
      {
        dayId: '1',
        start: 540,
        end: 1080,
        startFlags: {
          editable: true,
          show: true,
          required: true
        },
        endFlags: {
          editable: true,
          show: true,
          required: true
        },
        editable: true
      },
      {
        dayId: '2',
        start: 540,
        startFlags: {
          editable: true,
          show: true,
          required: true
        },
        endFlags: {
          editable: true,
          show: true,
          required: true
        },
        end: 1080,
        editable: true
      },
      {
        dayId: '3',
        start: 540,
        startFlags: {
          editable: true,
          show: true,
          required: true
        },
        endFlags: {
          editable: true,
          show: true,
          required: true
        },
        end: 1080,
        editable: true
      },
      {
        dayId: '4',
        start: 540,
        startFlags: {
          editable: true,
          show: true,
          required: true
        },
        endFlags: {
          editable: true,
          show: true,
          required: true
        },
        end: 1080,
        editable: true
      },
      {
        dayId: '5',
        start: 540,
        startFlags: {
          editable: true,
          show: true,
          required: true
        },
        endFlags: {
          editable: true,
          show: true,
          required: true
        },
        end: 1080,
        editable: true
      },
      {
        dayId: '6',
        start: 0,
        startFlags: {
          editable: true,
          show: true,
          required: true
        },
        endFlags: {
          editable: true,
          show: true,
          required: true
        },
        end: 0,
        editable: false
      },
      {
        dayId: '7',
        start: 0,
        startFlags: {
          editable: true,
          show: true,
          required: true
        },
        endFlags: {
          editable: true,
          show: true,
          required: true
        },
        end: 0,
        editable: false
      }
    ],
    startDate: '01.10.2020',
    startDateFlags: {
      editable: true,
      show: true,
      required: true
    },
    endDate: '',
    endDateFlags: {
      editable: true,
      show: true,
      required: true
    },
    timePerWeek: 2400,
    break: 60,
    breakFlags: {
      editable: true,
      show: true,
      required: true
    },
    percentage: 100
  }
};

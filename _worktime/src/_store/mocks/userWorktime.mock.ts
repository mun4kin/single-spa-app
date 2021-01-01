// на домашнем эране подгрузка текущего графика
import { IBasicWorkTime } from '../types/worktime.types';

export const workChart_sap: IBasicWorkTime = {
  idWorkTemplate: 'N35R0000',
  nameWorkTemplate: ' название графика',
  startDate: '05.09.2019',
  endDate: '',
  timePerWeek: 2400,
  break: 60,
  percentage: 100,
  workTime: [
    {
      dayId: '1',
      start: 0,
      end: 200,
      editable: false
    },
    {
      dayId: '2',
      start: 444,
      end: 555,
      editable: false
    },
    {
      dayId: '3',
      start: 0,
      end: 0,
      editable: false
    },
    {
      dayId: '4',
      start: 0,
      end: 0,
      editable: false
    },
    {
      dayId: '5',
      start: 0,
      end: 0,
      editable: false
    },
    {
      dayId: '6',
      start: 0,
      end: 0,
      editable: false
    },
    {
      dayId: '7',
      start: 0,
      end: 0,
      editable: false
    }
  ]
  // createdTask: {
  //   wiId: '000000001',
  //   isEditable: false
  // }
};

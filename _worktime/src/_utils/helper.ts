export const customEqual = (a: any, b: any): boolean => JSON.stringify(a) === JSON.stringify(b);

const shortDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const fullDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
/** принимает номер дня недели и возвращает короткое название*/
export const getShortDays = (i: number): string => shortDays[i - 1];
/** принимает номер дня недели и возвращает короткое название*/
export const getFullDays = (i: number): string => fullDays[i - 1];
/** принимает время в формате hh:mm и возвращает минуты*/
export const getMinuteTime = (time: string): number => {
  const t = time.split(':');
  return +t[0] * 60 + +t[1];
};

/** переводит из минут в часы и минуты*/
export const getFormatTime = (i: number, full: number = 0): string => {
  const hour = Math.floor(i / 60);
  const min = i % 60;
  if (full === 0) {
    if (!hour && !min) return '0 часов';
    return `${hour ? hour + ' ' + declOfNum(hour, ['час', 'часа', 'часов']) : ''} ${min ? min + ' мин.' : ''}`;
  } else if (full === 1) {
    return `${('000' + hour).slice(-2)}:${('000' + min).slice(-2)}`;
  } else if (full === 3) {
    return `${hour ? hour + ' ч. ' : '0 ч.'} ${min ? min + ' мин.' : ' 00 мин.'}`;
  } else {
    return `${(i / 60).toFixed(2)}`.replace('.', ',');
  }
};

/** правильно склоняет слова*/
const declOfNum = (n: number, text_forms: string[]) => {
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_forms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1];
  }
  if (n1 === 1) {
    return text_forms[0];
  }
  return text_forms[2];
};
export const addZero = (text: string | number) => ('0' + text).slice(-2);
export const getDateFromString = (date: string) => {
  if (!date) return;
  const t = date.split('.');
  return new Date(+t[2], +t[1] - 1, +t[0]);
};
export const getDate = (date?: Date, plus: number = 0, ret: string = 'date'): string | Date => {
  const newDate = date || new Date();
  newDate.setDate(newDate.getDate() + plus);

  if (ret === 'date') {
    return newDate;
  } else {
    return `${addZero(newDate.getDate())}.${addZero(newDate.getMonth() + 1)}.${newDate.getFullYear()}`;
  }
};

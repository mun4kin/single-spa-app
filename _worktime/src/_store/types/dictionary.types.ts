import { IOption } from 'root-front/dist/types';

export interface ICausesOptions extends IOption {
  /** Метка "Свободный график". При наличии данной метки, может быть изменено количество рабочих часов в неделю*/
  workTempPart: boolean;
  /** Метка "Перерыв на кормление". При наличии данной метки, используеться выбор граффика с перерывом на кормление*/
  workTempFeed: boolean;
  /** число рабочего времени в минутах. При заполнение данного поля, количество рабочих часов в неделю должно быть равно этому количеству*/
  timePerWeek: number;
  /** Вид приложения (ид). При заполнение данного поля, необходимо проверять на наличие вложения с данным типом */
  attType: string;
  /** Вид приложения текстовое описание*/
  attTypeText: string;
  /** Доступность*/
  available: boolean;
}

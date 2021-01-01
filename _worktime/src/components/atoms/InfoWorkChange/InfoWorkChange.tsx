import React, { useEffect, useRef, useState } from 'react';
import './InfoWorkChange.scss';
import { IBasicWorkTimeForm } from '../../../_store/types/worktime.types';
import { ICausesOptions } from '../../../_store/types/dictionary.types';

interface IProps {
  schedule: IBasicWorkTimeForm;
  cause: ICausesOptions;
}

const InfoWorkChange: React.FC<IProps> = ({ schedule, cause }: IProps) => {
  const [fields, setFields] = useState<string[]>([]);

  const fieldsMap = useRef<Record<string, string>>({
    // startDate: 'Дата начала рабочего периода',
    // endDate: 'Дата окончания рабочего периода',
    break: 'Длина перерыва',
    // workTemplate: 'График рабочего времени',
    workDays: 'Рабочие дни',
    start: 'Время начала рабочего дня',
    end: 'Время окончания рабочего дня'
  });

  useEffect(() => {
    const fields: string[] = [];

    const traverse = (schedule: any) => {
      if (!schedule) return;

      for (const k in schedule) {
        if (k.includes('Flags')) {
          fields.push(k.replace('Flags', ''));
        }

        if (k === 'workTime') {
          traverse(schedule[k][0]);
        }
      }
    };

    traverse(schedule);
    cause.workTempPart && fields.push('workDays');
    setFields(fields);
  }, [schedule, cause]);

  // -------------------------------------------------------------------------------------------------------------------

  const fieldsJSX = fields.map((f: string) => (
    <p className='info-tile__text' key={f}>
      {fieldsMap.current[f] ? `-${fieldsMap.current[f]}` : ''}
    </p>
  ));

  return (
    <div className='info-tile__wrapper'>
      <h3 className='info-tile__header'>Доступно для изменения:</h3>
      {fieldsJSX}
      {cause.attType && (
        <>
          <h3 className='info-tile__header info-tile__header-padding'>Обязательное вложение:</h3>
          <p className='info-tile__text'>- {cause.attTypeText}</p>
        </>
      )}
    </div>
  );
};
export default InfoWorkChange;

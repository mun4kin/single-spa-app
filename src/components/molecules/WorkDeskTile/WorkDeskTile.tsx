import React, { useEffect, useState } from 'react';
import './WorkDeskTile.scss';
import { IBasicWorkTime, IBasicWorkTimeForm } from '../../../_store/types/worktime.types';
import { getFormatTime, getShortDays } from '../../../_utils/helper';
import { IUser } from '../../../_store/types/user.types';
import { Message } from 'root-front';

interface IProps {
  /** данные для отображения */
  data: IBasicWorkTime;
  /** данные для сравнения */
  data1?: IBasicWorkTime;
  className?: string;
  initiator?: IUser;
  setIsApprove?: (val: boolean) => void;
  values?: IBasicWorkTimeForm;
  cause?: string;
}

const WorkDeskTile: React.FC<IProps> = ({
  data,
  className,
  initiator,
  data1,
  setIsApprove = () => {},
  values,
  cause
}: IProps) => {
  const [diff, setDiff] = useState<IBasicWorkTime | null>(null);
  //делаем объект сравнения
  useEffect(() => {
    const basic: IBasicWorkTime = {
      idWorkTemplate: '',
      nameWorkTemplate: '',
      workTime: [],
      /** число рабочего времени в минутах*/
      timePerWeek: 0,
      /** перерыв в минутах*/
      break: 0,
      // /** процент рабочего времени*/
      // percentage: 0,
      breakFeedPerDesc: '',
      breakFeedTypeDesc: ''
    };
    const result = { ...basic, workTime: [...basic.workTime] };

    if (data && data1) {
      data.break !== data1.break && (result.break = data1.break);
      data.timePerWeek !== data1.timePerWeek && (result.timePerWeek = data1.timePerWeek);
      // data.percentage !== data1.percentage && (result.percentage = data1.percentage);

      if (
        data.breakFeedPer !== data1.breakFeedPer ||
        (data.breakFeedType !== data1.breakFeedType && data1.breakFeedType !== '3')
      ) {
        result.breakFeedPerDesc = data1.breakFeedPerDesc;
        result.breakFeedTypeDesc = data1.breakFeedTypeDesc;
      }

      data.workTime.forEach((_, i) => {
        if (data.workTime[i].start !== data1.workTime[i].start || data.workTime[i].end !== data1.workTime[i].end) {
          result.workTime.push(data1.workTime[i]);
        }
      });
      if (JSON.stringify(result) !== JSON.stringify(basic) || !data1.idWorkTemplate) {
        setDiff(result);
        setIsApprove(false);
      } else {
        setDiff(null);
        setIsApprove(true);
      }
    }
  }, [data1]);

  /* рабочее раписание*/
  const workDayTime = (data: IBasicWorkTime) =>
    data.workTime
      .filter((dataItem) => dataItem.start !== dataItem.end)
      .map((dataItem) => {
        const t = dataItem.end - dataItem.start;
        return (
          <p key={dataItem.dayId} className='work-tile__info-text'>
            {`${getShortDays(+dataItem.dayId)}  ${getFormatTime(dataItem.start, 1)} - ${getFormatTime(
              dataItem.end,
              1
            )} ( ${getFormatTime(t >= 240 ? t - data.break : t, 0)} ${t < 240 ? 'без перерыва' : ''})`}
          </p>
        );
      });

  /* доп инфо*/
  const additionInfo = (text: string, info: string, classname: string = '') => {
    return (
      <div className={`work-tile__info-wrapper ${classname}`}>
        <h3 className='work-tile__info-title'>{text}</h3>
        <p className='work-tile__info-body'>{info}</p>
      </div>
    );
  };
  //--------------------------------------------------------------------------------------------------------------------
  const title =
    data.idWorkTemplate && data.idWorkTemplate !== '-'
      ? ` ${data.nameWorkTemplate} (${data.idWorkTemplate})`
      : 'Самостоятельно сформированный график';
  //---------------------------аппрув от Hr в случае совпадения графиков------------------------------------------------
  const hrApprove =
    !diff && data1 ? (
      <Message variant='success'>
        <p>Графики совпадают</p>
      </Message>
    ) : (
      <></>
    );
  //----------------------------если графики не совпадают---------------------------------------------------------------
  const diffHtml = (
    <div>
      <p className='work-tile__hr-message'>Проведение мероприятия невозможно.</p>
      <p className='work-tile__hr-message'>Выбранный график не соответствует заявке сотрудника.</p>
      <p className='work-tile__hr-message'>Различия:</p>
    </div>
  );
  //---------------------------------кормление--------------------------------------------------------------------------
  const feedBreak = () => {
    const breakFeedTypeDesc = !diff ? data.breakFeedTypeDesc : diff.breakFeedTypeDesc;
    const breakFeedPerDesc = !diff ? data.breakFeedPerDesc : diff.breakFeedPerDesc;
    return (data.breakFeedPer !== '0' && !data1) || (diff && (breakFeedTypeDesc||breakFeedPerDesc)) ? (
      additionInfo('Время на кормление: ', `${breakFeedTypeDesc} ${breakFeedPerDesc?.toLowerCase()}`)
    ) : (
      <></>
    );
  };
  const breakTime =
    (diff && diff.break) || !diff ? (
      additionInfo('Перерыв: ', `${getFormatTime(!diff ? data.break : diff.break, 0)} `)
    ) : (
      <></>
    );

  return (
    <div className={`work-tile__wrapper ${className || ''}`}>
      {(!data1 || diff) && (
        <Message variant={diff ? `danger` : 'info'}>
          {diff && diffHtml}
          {initiator && additionInfo('Инициатор заявки: ', `${initiator?.fullName} (ТН ${initiator?.id})`)}
          {cause && additionInfo('Причина изменения: ', `${cause}`)}
          {!data1 && <h1 className='work-tile__title work-tile__tpadding'>{title}</h1>}
          <h1 className='work-tile__title'>Рабочие дни:</h1>
          {workDayTime(diff ? diff : data)}
          {!data1 &&
            additionInfo(
              'Период действия: ',
              `${values?.startDate || data.startDate} - ${values?.endDate || data.endDate || 'Бессрочно'}`
            )}
          {!data1 && additionInfo('Время в неделю: ', `${getFormatTime(data.timePerWeek, 0)} `)}
          {breakTime}
          {feedBreak()}
          {!data1 && additionInfo('Доля рабочего времени: ', `${data.percentage}%`)}
        </Message>
      )}

      {/*{!data1 && (*/}
      {/*  <Message variant='info'>*/}
      {/*    {initiator && additionInfo('Инициатор заявки: ', `${initiator?.fullName} (ТН ${initiator?.id})`)}*/}
      {/*    {cause &&*/}
      {/*      additionInfo('Причина изменения: ', `${cause}`, data.breakFeedPer === '0' ? 'work-tile__padding' : '')}*/}
      {/*    {data.breakFeedPer !== '0' &&*/}
      {/*      additionInfo(*/}
      {/*        'Время на кормление: ',*/}
      {/*        `${data.breakFeedTypeDesc} ${data.breakFeedPerDesc?.toLowerCase()}`,*/}
      {/*        'work-tile__padding'*/}
      {/*      )}*/}
      {/*    <h1 className='work-tile__title'>{title}</h1>*/}
      {/*    <h1 className='work-tile__title'>Рабочие дни:</h1>*/}
      {/*    {workDayTime(data)}*/}
      {/*    {additionInfo(*/}
      {/*      'Период действия: ',*/}
      {/*      `${values?.startDate || data.startDate} - ${values?.endDate || data.endDate || 'Бессрочно'}`*/}
      {/*    )}*/}
      {/*    {additionInfo('Время в неделю: ', `${getFormatTime(data.timePerWeek, 0)} `)}*/}
      {/*    {additionInfo('Перерыв: ', `${getFormatTime(data.break, 0)} `)}*/}
      {/*    {additionInfo('Доля рабочего времени: ', `${data.percentage}%`)}*/}
      {/*  </Message>*/}
      {/*)}*/}
      {/*{diff && (*/}
      {/*  <Message variant='danger'>*/}
      {/*    <div>*/}
      {/*      <p className='work-tile__hr-message'>Проведение мероприятия невозможно.</p>*/}
      {/*      <p className='work-tile__hr-message'>Выбранный график не соответствует заявке сотрудника</p>*/}
      {/*    </div>*/}
      {/*    <h1 className='work-tile__title'>Рабочие дни:</h1>*/}
      {/*    {workDayTime(diff)}*/}
      {/*    {diff.timePerWeek ? additionInfo('Время в неделю: ', `${getFormatTime(diff.timePerWeek, 0)} `) : ''}*/}
      {/*    {diff.break ? additionInfo('Перерыв: ', `${getFormatTime(diff.break, 0)} `) : ''}*/}
      {/*    {diff.percentage ? additionInfo('Доля рабочего времени: ', `${diff.percentage}%`) : ''}*/}
      {/*    {diff.breakFeedPerDesc ? additionInfo('Время на кормление: ', `${diff.breakFeedPerDesc}`) : ''}*/}
      {/*    {diff.breakFeedTypeDesc ? additionInfo('Тип перерыва на кормление: ', `${diff.breakFeedTypeDesc}`) : ''}*/}
      {/*  </Message>*/}
      {/*)}*/}

      {hrApprove}
    </div>
  );
};

export default WorkDeskTile;
/*
<div className={`work-tile__wrapper ${className || ''}`}>
      {!data1 && (
        <Message variant='info'>
          {initiator && additionInfo('Инициатор заявки: ', `${initiator?.fullName} (ТН ${initiator?.id})`)}
          {cause && additionInfo('Причина изменения: ', `${cause}`,data.breakFeedPer === '0'?'work-tile__padding':'')}
          {data.breakFeedPer !== '0' &&
            additionInfo(
              'Время на кормление: ',
              `${data.breakFeedTypeDesc} ${data.breakFeedPerDesc?.toLowerCase()}`,
              'work-tile__padding'
            )}
          <h1 className='work-tile__title'>{title}</h1>
          <h1 className='work-tile__title'>Рабочие дни:</h1>
          {workDayTime(data)}
          {additionInfo(
            'Период действия: ',
            `${values?.startDate || data.startDate} - ${values?.endDate || data.endDate || 'Бессрочно'}`
          )}
          {additionInfo('Время в неделю: ', `${getFormatTime(data.timePerWeek, 0)} `)}
          {additionInfo('Перерыв: ', `${getFormatTime(data.break, 0)} `)}
          {additionInfo('Доля рабочего времени: ', `${data.percentage}%`)}
        </Message>
      )}
      {diff && (
        <Message variant='danger'>
          <div>
            <p className='work-tile__hr-message'>Проведение мероприятия невозможно.</p>
            <p className='work-tile__hr-message'>Выбранный график не соответствует заявке сотрудника</p>
          </div>
          <h1 className='work-tile__title'>Рабочие дни:</h1>
          {workDayTime(diff)}
          {diff.timePerWeek ? additionInfo('Время в неделю: ', `${getFormatTime(diff.timePerWeek, 0)} `) : ''}
          {diff.break ? additionInfo('Перерыв: ', `${getFormatTime(diff.break, 0)} `) : ''}
          {diff.percentage ? additionInfo('Доля рабочего времени: ', `${diff.percentage}%`) : ''}
          {diff.breakFeedPer ? additionInfo('Время на кормление: ', `${diff.breakFeedPer}`) : ''}
          {diff.breakFeedType ? additionInfo('Тип перерыва на кормление: ', `${diff.breakFeedType}`) : ''}

        </Message>
      )}
      {!diff && data1 && (
        <Message variant='success'>
          <p>Графики совпадают</p>
        </Message>
      )}
    </div>
*/

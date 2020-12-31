import React from 'react';
import './WorkTimeWidget.scss';
import { IBasicWorkTime, IScheduleItem } from '../../../_store/types/worktime.types';
import WorkTile from '../../atoms/WorkTile';
import { getFormatTime } from '../../../_utils/helper';

interface IProps {
  data: IBasicWorkTime;
}

const WorkTimeWidget: React.FC<IProps> = ({ data }: IProps) => {
  const statinfo = (title: string, content: string) => (
    <div className='worktime__stats-wrapper'>
      <div className='worktime__stats-title'>{title}</div>
      <div className='worktime__stats-content'>{content}</div>
    </div>
  );

  // -------------------------------------------------------------------------------------------------------------------

  const workTiles = data.workTime.map((item: IScheduleItem) => (
    <WorkTile key={item.dayId} break_={data.break} data={item} />
  ));

  return (
    <>
      <div className='worktime__week-text'>Рабочая неделя</div>
      <div className='worktime__week-tiles'>{workTiles}</div>
      <div className='worktime__stats'>
        {statinfo('Период действия', `${data.startDate} - ${data.endDate || 'Бессрочно'}`)}
        {statinfo('Время в неделю', `${getFormatTime(data.timePerWeek, 0)} `)}
        {statinfo('Перерыв', `${getFormatTime(data.break, 0)} `)}
        {statinfo('Доля рабочего времени', `${data.percentage}%`)}
      </div>
    </>
  );
};

export default WorkTimeWidget;

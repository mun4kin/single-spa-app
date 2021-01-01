import React from 'react';
import './WorkTile.scss';
import { IScheduleItem } from '../../../_store/types/worktime.types';
import { getFormatTime, getShortDays } from '../../../_utils/helper';

interface IProps {
  data: IScheduleItem;
  break_: number;
}

const WorkTile: React.FC<IProps> = ({ data, break_ }: IProps) => {
  // -------------------------------------------------------------------------------------------------------------------
  const workDay = (
    <div className='week-tile__wrapper'>
      <div className='week-tile__text'>{`${getShortDays(+data.dayId)} ${getFormatTime(data.start, 1)} - ${getFormatTime(
        data.end,
        1
      )} `}</div>
      <div className='week-tile__text'>{getFormatTime(data.end - data.start - break_, 0)}</div>
    </div>
  );
  const weekend = (
    <div className={'week-tile__weekend'}>
      <div>{getShortDays(+data.dayId)} </div>
    </div>
  );

  return <>{data.start !== data.end ? workDay : weekend}</>;
};

export default WorkTile;

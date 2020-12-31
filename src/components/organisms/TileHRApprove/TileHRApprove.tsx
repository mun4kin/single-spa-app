import React from 'react';
import './TileHRApprove.scss';
import WorkDeskTile from '../../molecules/WorkDeskTile';
import { FormGroup, Message, Select } from 'root-front';
import { IOption } from 'root-front/dist/types';
import { IWorkTimeStruct } from '../../../_store/types/worktime.types';

import { useDispatch } from 'react-redux';

import { getWorkTimePending } from '../../../_store/actions/worktime.actions';

interface IProps {
  setIsApprove: (val: boolean) => void;
  workTime: IWorkTimeStruct;
}
const TileHRApprove: React.FC<IProps> = ({ workTime, setIsApprove }: IProps) => {
  const dispatch = useDispatch();
  const onChangeSelect = (data: IOption) => {
    dispatch(getWorkTimePending(data.value));
  };
  return (
    <>
      <FormGroup className='tile-hr-app__group' label='График для проведения мероприятия'>
        <Select
          options={workTime.dict.allWork?workTime.dict.allWork:[]}
          placeholder='Выберите значение'
          value={workTime.worktime.idWorkTemplate}
          getValue={onChangeSelect}
        />
      </FormGroup>
      {workTime.worktime.idWorkTemplate ? (
        <WorkDeskTile data1={workTime.worktime} data={workTime.process.schedule} setIsApprove={setIsApprove} />
      ) : (
        <Message variant='warning'>
          Выбран график не из справочника, для проведения в системе необходимо сопоставить выбранный график с значениями
          из справочника
        </Message>
      )}
    </>
  );
};

export default TileHRApprove;

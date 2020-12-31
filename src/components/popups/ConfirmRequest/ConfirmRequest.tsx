import React from 'react';
import './ConfirmRequest.scss';
import PopupTemplate from '../../templates/PopupTemplate';
import { PopupFooter } from 'root-front';
import WorkDeskTile from '../../molecules/WorkDeskTile';
import {  IProcess } from '../../../_store/types/worktime.types';

interface IProps {
  data: IProcess;
  onSubmit: () => void;
  onClose?: () => void;
}

const ConfirmRequest: React.FC<IProps> = ({ data, onSubmit, onClose }: IProps) => {
  const onClick = () => {
    onSubmit();
    onClose && onClose();
  };

  return (
    <>
      <PopupTemplate title='Подтвердите отправку заявки' subtitle='Вы собираетесь изменить график рабочего времени.'>
        <div className='confirm-request__schedule'>
          <WorkDeskTile data={data.schedule}     initiator={ data.initiator}
            cause={data.reasonDesc || ''}/>
        </div>
        <p className='confirm-request__text'> Отслеживать статус заявки вы сможете на главной странице сервиса. </p>

        <PopupFooter onSubmit={onClick} onClose={onClose} textAccept='Отправить' />
      </PopupTemplate>
    </>
  );
};

export default ConfirmRequest;

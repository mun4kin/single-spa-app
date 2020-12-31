import React from 'react';
import './HomeRequestCard.scss';

import { useSelector } from 'react-redux';
import { IStore } from '../../../_store';
import { Button, formatDate } from 'root-front';
import { useHistory } from 'react-router-dom';
import { IProcess } from '../../../_store/types/worktime.types';
import { customEqual } from '../../../_utils/helper';
import Preloader from '../../templates/Preloader';

interface IProps {}

const HomeRequestCard: React.FC<IProps> = () => {
  const request: IProcess | null = useSelector((store: IStore) => store.process.mainProcess, customEqual);
  const history = useHistory();

  // -------------------------------------------------------------------------------------------------------------------
  const date = request?.path[0]?.date;
  const currentPath =
    request && request.path[request.path.findIndex((item) => +item.stepId === +(request.currStepId || 0)) - 1];
  const onClickHandler = () => {
    history.push('/request/' + request?.wiId + '/0/' + request?.procGuid);
  };

  const d = date ? formatDate(date).date : '__.__.____';
  const lastUpdate = currentPath?.date ? formatDate(currentPath.date).date : '__.__.____';

  const name =
    currentPath && currentPath.user && currentPath.user[0].id !== '0'
      ? currentPath.user[0].fullName
      : currentPath?.agentName;
  return (
    <>
      {request && ( request.wiId !== '0' || request.procGuid!=='0') ? (
        <div className='home-card__wrapper'>
          <div className='home-card__title'>
            <p className='home-card__title-name'>{`Заявка на изменение графика ${request.referenceNumber} от ${d}`}</p>
            {/*<p className='home-card__title-status'>{currentPath?.statusText}</p>*/}
          </div>
          <p className='home-card__text-info'>{`Инициатор: ${request.initiator.fullName} (ТН ${request.initiator.id})`}</p>
          <p className='home-card__text-info'>{`Текущий шаг: ${currentPath?.activityText}`}</p>
          <p className='home-card__text-info'>{`Исполнитель: ${name}`}</p>
          <p className='home-card__text-info'>{`Последнее обновление: ${lastUpdate}`}</p>
          <Button className='home-card__button' buttonType='text' onClick={onClickHandler}>
            Подробнее
          </Button>
        </div>
      ) : (
        <Preloader size='large' />
      )}
    </>
  );
};

export default HomeRequestCard;

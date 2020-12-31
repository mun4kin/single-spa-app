import React, { ReactNode } from 'react';
import './HistoryList.scss';
import { useSelector } from 'react-redux';
import { IStore } from '../../../_store';

import { Button, Preloader, UserPhoto } from 'root-front';

import CardContainer from '../../atoms/CardContainer';

import { IProcess } from '../../../_store/types/worktime.types';
import { useHistory } from 'react-router-dom';

interface IProps {}

const HistoryList: React.FC<IProps> = () => {
  const historyReq = useSelector((store: IStore) => store.history.history);
  const history = useHistory();
  
  const getActions = (process: IProcess) => {
    const cl =
      process.procStatus === 'COMPLETED'
        ? 'history-req__status-green'
        : process.procStatus === 'WITHDRAWN'
          ? 'history-req__status-red'
          : 'history-req__status-yellow';
    
    const actionMap: Record<string, ReactNode> = {
      DISPLAY: <div className={`history-req__status ${cl}`}>{process.procStatusText}</div>,
      ZSIGNITURE: <Button buttonType="outlinePrimary"> Подписать документы</Button>,
      APPROVE: <Button buttonType="outlinePrimary"> Обработать </Button>,
      REQUEST: <Button buttonType="outlinePrimary"> Доработать заявку</Button>
    }

    return process.scenarioStage ? actionMap[process.scenarioStage] : null;
  };
  
  const goToView = (item: IProcess) => {
    //
    // if (['WITHDRAWN', 'COMPLETED'].includes(item.procStatus || '')) {
    if (item.wiId ==='0' || !item.wiId) {
      history.push(`/request/0/0/${item.procGuid}`);
    } else {
      history.push(`/request/${item.wiId}`);
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  const historyHTML = historyReq.map((item: IProcess) => (
    <div className={'history-req__card'} key={item.referenceNumber} onClick={() => goToView(item)}>
      <CardContainer
        user={<UserPhoto url={item.user.photo} radius='56px' />}
        content={
          <>
            <h3 className='history-req__user-name'>{`${item.user.fullName} (ТН ${item.user.id})`}</h3>
            <p className='history-req__info'>{`Заявка ${item.referenceNumber} oт ${item.InitDate}`}</p>
            <p className='history-req__info'>{`Инициатор: ${item.initiator.fullName} (ТН ${item.initiator.id})`}</p>
          </>
        }
        action={getActions(item)}
      />
    </div>
  ));

  return (
    <>
      {historyReq.length ? (
        <div className='history-req__wrapper'>{historyHTML}</div>
      ) : (
        <div className='preloader__wrapper'>
          <Preloader size='large' />
        </div>
      )}
    </>
  );
};

export default HistoryList;

import React, { ReactNode } from 'react';
import './Tasks.scss';
import { useSelector } from 'react-redux';
import { IStore } from '../../../_store';
import { IProcess } from '../../../_store/types/worktime.types';
import CardContainer from '../../atoms/CardContainer';
import { Button, Preloader, UserPhoto } from 'root-front';
import { useHistory } from 'react-router-dom';

interface IProps {}

const Tasks: React.FC<IProps> = () => {
  const history = useHistory();
  const tasks: IProcess[] = useSelector((store: IStore) => store.history.tasks);

  // -------------------------------------------------------------------------------------------------------------------

  const goToView = (item: IProcess) => {
    //
    // if (['WITHDRAWN', 'COMPLETED'].includes(item.procStatus || '')) {
    if (item.wiId === '0' || !item.wiId) {
      history.push(`/request/0/0/${item.procGuid}`);
    } else {
      history.push(`/request/${item.wiId}`);
    }
  };

  const getAction = (item: IProcess): ReactNode => {

    const action: Record<string, ReactNode> = {
      ZSIGNITURE: <Button buttonType='outlinePrimary'> Подписать документы</Button>,
      APPROVE: <Button buttonType='outlinePrimary'> Согласовать </Button>,
      REQUEST: <Button buttonType='outlinePrimary'> Доработать заявку</Button>,
      PROCESS: <Button buttonType='outlinePrimary'> Провести мероприятие </Button>,
    };

    return item.scenarioStage ? action[item.scenarioStage] : null;
  };

  const tasksJSX = tasks.map((item: IProcess) => (
    <div className='task__card' key={item.referenceNumber} onClick={() => goToView(item)}>
      <CardContainer
        user={<UserPhoto url={item.user.photo} radius='56px' />}
        content={
          <>
            <h3 className='task__user-name'>{`${item.user.fullName} (ТН ${item.user.id})`}</h3>
            <p className='task__info'>{`Заявка ${item.referenceNumber} oт ${item.InitDate}`}</p>
            <p className='task__info'>{`Инициатор: ${item.initiator.fullName} (ТН ${item.initiator.id})`}</p>
          </>
        }
        action={getAction(item)}
      />
    </div>
  ));

  return <div className='tasks__page'>{tasks ? <>{tasksJSX}</> : <Preloader size='large' />}</div>;
};

export default Tasks;

import React from 'react';
import './WorkTimeCard.scss';
import UserCard from '../../molecules/UserCard';
import { IUser } from '../../../_store/types/user.types';
import { IBasicWorkTime } from '../../../_store/types/worktime.types';
import { Button } from 'root-front';
import WorkTimeWidget from '../../molecules/WorkTimeWidget';
import { useHistory } from 'react-router-dom';

interface IProps {
  worktime: IBasicWorkTime;
  user: IUser;
  showButtons?: boolean;
}

const WorkTimeCard: React.FC<IProps> = ({ worktime, user, showButtons = true }) => {
  const history = useHistory();

  const condition = worktime.createdTask?.scenarioStage === 'ZSIGNITURE';
  const condition1 = worktime.createdTask?.scenarioStage === 'REQUEST';

  const onClickHandler = (id: string) => {
    history.push(`/request/${id}`);
  };

  const task =
    !condition && !condition1 ? (
      <div className='worktime__notify'>
        <p>У вас уже есть активная заявка. Изменение графика не доступно.</p>
      </div>
    ) : (
      <Button type='button' buttonType='primary' onClick={() => onClickHandler(worktime.createdTask?.wiId || '')}>
        {!condition1 ? 'Подписать документы' : 'Внести корректировки'}
      </Button>
    );

  // -------------------------------------------------------------------------------------------------------------------
  return (
    <div className='worktime__container'>
      <UserCard user={user} />
      <div className='worktime__schedule-text'>{worktime.nameWorkTemplate}</div>
      <WorkTimeWidget data={worktime} />
      {!!showButtons &&
        (worktime.createdTask ? (
          task
        ) : (
          <div className='worktime__buttons'>
            <Button buttonType={'primary'} onClick={() => onClickHandler('0')}>
              Изменить
            </Button>
          </div>
        ))}
    </div>
  );
};

export default WorkTimeCard;

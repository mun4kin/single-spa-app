import React from 'react';
import './MyTeam.scss';
import { useSelector } from 'react-redux';
import { IStore } from '../../../_store';
import { Button, UserPhoto, openPopup } from 'root-front';
import CardContainer from '../../atoms/CardContainer/CardContainer';
import { ITeam } from '../../../_store/types/team.types';
import Position from '../../atoms/Position';
import WorkTimeCard from '../WorkTimeCard';
import { useHistory } from 'react-router';

interface IProps {}

const MyTeam: React.FC<IProps> = () => {
  const team = useSelector((store: IStore) => store.team.myTeam);

  const history = useHistory();

  const showButtonHandle = (user: ITeam) => {
    openPopup(<WorkTimeCard user={user.user} worktime={user.schedule} showButtons={false} />, '');
  };

  const selectUserButtonHandle = (user: ITeam) => {
    history.push(`/request/0/${user.empId}`);
    // dispatch(getWorkTimePending(user.schedule.idWorkTemplate));
  };

  const teamHTML = team.map((item: ITeam) => {
    const user = <UserPhoto url={item.user.photo} radius='56px' />;
    const action = item.schedule.createdTask ? (
      <></>
    ) : (
      <Button onClick={() => selectUserButtonHandle(item)} buttonType='outlinePrimary'>
        Изменить
      </Button>
    );
    const content = (
      <>
        <h3 className='team-item__name'>{`${item.user.fullName} (ТН ${item.user.id})`}</h3>
        <p className='team-item__text'>{`${item.user.position}`}</p>
        <div className='team-item__text'>
          <Position department={item.user.department} path={item.user.departmentPath} />
        </div>
        <div className='team-item__text'>
          Текущий график:{' '}
          <Button onClick={() => showButtonHandle(item)} className='team-item__text--button' buttonType='text'>
            {item.schedule.nameWorkTemplate}
          </Button>
        </div>
      </>
    );
    return <CardContainer key={item.empId} user={user} content={content} action={action} />;
  });

  // -------------------------------------------------------------------------------------------------------------------

  return <div className=''>{teamHTML}</div>;
};

export default MyTeam;

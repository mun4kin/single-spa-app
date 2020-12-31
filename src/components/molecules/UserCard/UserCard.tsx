import React from 'react';
import './UserCard.scss';
import { IUser } from '../../../_store/types/user.types';
import { UserPhoto } from 'root-front';
import Position from '../../atoms/Position';
interface IProps {
  user: IUser | null;
}

const UserCard: React.FC<IProps> = ({ user }: IProps) => {
  return (
    <>
      {!!user && (
        <div className='worktime__user-wrapper'>
          <UserPhoto url={user?.photo} radius='80px' />
          <div className='worktime__user-texts'>
            <div className='worktime__user-fio'>{`${user?.fullName} (ТН ${user?.id})`}</div>
            <div className='worktime__user-text'>{user?.position}</div>
            <div className='worktime__user-text'>
              <Position department={user?.department || ''} path={user?.departmentPath || ''} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;

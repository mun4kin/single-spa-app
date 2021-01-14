import React, { useEffect } from 'react';
import './MyInfo.scss';
import { Tile } from 'root-front';
import WorkTimeCard from '../WorkTimeCard';
import HomeRequestCard from '../../molecules/HomeRequestCard';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from 'root-front/dist/utils/setTitle';
import { getMyWorkTimePending } from '../../../_store/actions/worktime.actions';

import { IUser } from '../../../_store/types/user.types';
import { IBasicWorkTime } from '../../../_store/types/worktime.types';
import { userWithWorkTime } from '../../../_store/selectors/userWithWorktime.selectors';
import Preloader from '../../templates/Preloader';

const MyInfo: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTitle('График рабочего времени - Мой график');
    // dispatch(getMyWorkTimePending());
  }, []);

  const { user, worktime }: { user: IUser | null; worktime: IBasicWorkTime | null } = useSelector(userWithWorkTime);
  // -------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <Tile>{user && worktime ? <WorkTimeCard user={user} worktime={worktime} /> : <Preloader size='large' />}</Tile>
      {worktime?.createdTask && (
        <Tile>
          <HomeRequestCard />
        </Tile>
      )}
    </>
  );
};

export default MyInfo;

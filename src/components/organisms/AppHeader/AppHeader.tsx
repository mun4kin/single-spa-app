import React, { useCallback, useEffect } from 'react';
import './AppHeader.scss';
import { Button, FeedbackPopup, openPopup, Switch, AppHeader as Header } from 'root-front';
import { IFeedback, IUser as IRFUser } from 'root-front/dist/types/projects.types';
import { sendFeedbackPending } from '../../../_store/actions/feedback.actions';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../../_store/types/user.types';
import { IStore } from '../../../_store';
import { customEqual } from '../../../_utils/helper';

interface IProps {
  setReady: (tmp: boolean) => void;
}
const AppHeader: React.FC<IProps> = ({ setReady }) => {
  const dispatch = useDispatch();

  const ready = Boolean(+(localStorage.getItem('ready') || '0'));
  useEffect(() => {
    setReady(ready);
  }, []);
  const onChange = () => {
    const tmp = localStorage.getItem('ready') || 0;
    localStorage.setItem('ready', Number(!+tmp) + '');
    setReady(!+tmp);
  };
  // -------------------------------------------------------------------------------------------------------------------

  const user: IUser | null = useSelector((store: IStore) => store.user.currentUser, customEqual);

  // todo Привести к единому интерфесу
  const rfUser: IRFUser | null = user
    ? {
      ...user,
      lastName: user.secondName
    }
    : null;

  const sendFeedback = (data: IFeedback) => {
    dispatch(sendFeedbackPending(data));
  };

  const openModal = useCallback(() => {
    if (user) {
      openPopup(
        <FeedbackPopup
          user={{
            ...user,
            lastName: user.secondName,
            department: user.departmentPath,
            email: user.email || ''
          }}
          sendFeedback={sendFeedback}
        />
      );
    }
  }, [user]);

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <Header
      appName='График рабочего времени'
      homeUrl='/home/me'
      user={rfUser}
      showShadow={true}
      className={ready ? 'new-year' : ''}>
      <div className='app-header__container'>
        <Switch label='К зиме готов!' state={Boolean(ready)} onChange={onChange} />
        <Button buttonType='text' onClick={openModal} className='app__header-feedback'>
          Обратная связь
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;

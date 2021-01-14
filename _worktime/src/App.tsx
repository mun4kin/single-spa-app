import React, { useEffect, useState } from 'react';
import './App.scss';

import { routes } from './router/config';
import Router from './router/Router';
import { Notifications, PopupMaker } from 'root-front';
import AppHeader from './components/organisms/AppHeader';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoPending, userInfoSuccess } from './_store/actions/user.actions';
import cloud1 from './assets/img/cloud1.png';
import cloud2 from './assets/img/cloud2.png';
import cloud3 from './assets/img/cloud3.png';
import cloud4 from './assets/img/cloud4.png';
import cloud5 from './assets/img/cloud5.png';
import { getTeamPending } from './_store/actions/team.actions';
import { getHistoryPending, getTasksPending } from './_store/actions/history.actions';
import { IStore } from './_store';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
// @ts-ignore
import sound from './assets/mp3/1.mp3';
import ReactAudioPlayer from 'react-audio-player';

const App = (props: any) => {
  // -------------------------------------------------------------------------------------------------------------------
  const dispatch = useDispatch();
  // при входе сразу запрашиваем кто зашел и справочники
  const [ready, setReady] = useState(false);
  const stop = useSelector((state: IStore) => state.stopApp.stopApplication);

  useEffect(() => {
    if (props.user) {
      dispatch(userInfoSuccess(props.user));
    } else {
      dispatch(userInfoPending());
    }
  }, [props.user]);

  useEffect(() => {
    if (!stop) {
      dispatch(getTeamPending());
      dispatch(getHistoryPending());
      dispatch(getTasksPending());
      //запрашиваем раз в 20 сек изменения
    }
    const tmp = interval(20000)
      .pipe(takeWhile((_) => !stop))
      .subscribe(() => {
        dispatch(getTasksPending());
      });
    return () => {
      tmp.unsubscribe();
    };
  }, [stop]);

  return (
    <>
      {ready && (
        <div className='banner__wrapper'>
          <ReactAudioPlayer src={sound} volume={0.1} autoPlay={true} />
          <div className='banner'>
            <div className='clouds'>
              <img alt='' className='id1' src={cloud1} />
              <img alt='' className='id2' src={cloud2} />
              <img alt='' className='id3' src={cloud3} />
              <img alt='' className='id4' src={cloud4} />
              <img alt='' className='id5' src={cloud5} />
            </div>
          </div>
        </div>
      )}
      <div className={`app ${ready ? 'winter' : ''}`}>
        <AppHeader setReady={setReady} />
        <Router routes={routes} />
        <Notifications />
        <PopupMaker />
      </div>
    </>
  );
};

export default App;

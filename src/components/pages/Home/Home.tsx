import React, { useEffect } from 'react';
import './Home.scss';
import { PageTemplate, Tabs, useLocation } from 'root-front';

import Router from '../../../router/Router';
import { ITab } from 'root-front/dist/types';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStore } from '../../../_store';
import Badge from 'root-front/dist/components/atoms/Badge';
import { IRoute } from "../../../router/config";

interface IProps {
  routes: IRoute[];
}

const Home: React.FC<IProps> = ({ routes }: IProps) => {
  const location = useLocation();
  const history = useHistory();
  const team = useSelector((store: IStore) => store.team.myTeam);
  let h = useSelector((store: IStore) => store.history.history);
  const tasks = useSelector((store: IStore) => store.history.tasks);
  const tasksCount = tasks.filter((item) => item.scenarioStage !== 'DISPLAY').length;

  useEffect(() => {
    if (location.pathname === '/home') {
      history.push('/home/me');
    }
  }, []);
  const tabs = (): ITab[] => {
    const result = [];

    result.push({
      url: '/home/me',
      label: 'Мой график'
    });
    team.length &&
      result.push({
        url: '/home/command',
        label: 'Моя команда'
      });

    h.length > 0 &&
      result.push({
        url: '/home/history',
        label: 'История заявок'
      });

    tasks.length > 0 &&
      result.push({
        url: '/home/tasks',
        label: (
          <Badge position='text' display={tasksCount > 0} badgeContent={tasksCount} variant='complement'>
            Задачи
          </Badge>
        )
      });

    return result;
  };

  return (
    <div className='home'>
      <PageTemplate title='' breadcrumbs={[]} onlyTitle className='home__page'>
        <Tabs list={tabs()} type='buttons'>
          <div className='home__content'>
            <Router routes={routes} />
          </div>
        </Tabs>
      </PageTemplate>
    </div>
  );
};

export default Home;

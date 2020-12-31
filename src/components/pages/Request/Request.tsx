import React, { useEffect } from 'react';
import './Request.scss';

import { formatDate, PageTemplate, Preloader } from 'root-front';
import { useDispatch, useSelector } from 'react-redux';
import { getProcessPending } from '../../../_store/actions/process.actions';
import { IWorkTimeStruct } from '../../../_store/types/worktime.types';
import { useParams } from 'react-router-dom';
import MainProcess from '../../organisms/MainProcess';
import { workWithDict } from '../../../_store/selectors/allStepProcess.selectors';
import { setTitle } from 'root-front/dist/utils/setTitle';

interface IProps {}

interface IBreadcrumb {
  label: string;
  url: string;
  disabled?: boolean;
}

const Request: React.FC<IProps> = () => {
  // -------------------------------------------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const params = useParams<{ id: string; user: string; pid: string }>();

  useEffect(() => {
    dispatch(getProcessPending(params));
  }, []);

  const workTime: IWorkTimeStruct | null = useSelector(workWithDict);
  // const hideNavigation = workTime?.isMe;

  const d = workTime?.process.path[0]?.date ? formatDate(workTime?.process.path[0].date).date : '__.__.____';

  const map: Record<string, string> = {
    NEW: 'Создание заявки',
    APPROVE: `Согласование заявки ${workTime?.process.referenceNumber} от ${d}`,
    DISPLAY: `Заявка ${workTime?.process.referenceNumber} от ${d}`,
    PROCESS: `Обработка заявки ${workTime?.process.referenceNumber} от ${d}`,
    REQUEST: `Заявка ${workTime?.process.referenceNumber} от ${d}`,
    ZSIGNITURE: `Подписание документов согласно заявке ${workTime?.process.referenceNumber} от ${d}`
  };

  const title =
    workTime?.isMe && workTime?.currentStep === 'NEW'
      ? 'Изменение графика рабочего времени'
      : map[workTime?.currentStep || 'REQUEST'];

  const breadcrumbs: IBreadcrumb[] = [
    {
      label: 'Главная',
      url: '/home'
    },
    {
      label: title,
      url: '/request',
      disabled: true
    }
  ];

  useEffect(() => {
    if (workTime) {
      setTitle(map[workTime.currentStep]);
    }
  }, [workTime]);

  return (
    <PageTemplate
      title={workTime ? title : ''}
      onlyTitle={!workTime}
      breadcrumbs={workTime ? breadcrumbs : []} //{hideNavigation ? breadcrumbs : []}
      backUrl='/home'>
      {workTime && workTime.process.schedule ? <MainProcess workTime={workTime} /> : <Preloader size='large' />}
    </PageTemplate>
  );
};

export default Request;

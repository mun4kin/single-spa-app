import React from 'react';
import './MessageTile.scss';
import { Button, Message } from 'root-front';
import { IWorkTimeStruct } from '../../../_store/types/worktime.types';
import { downloadFilePending } from '../../../_store/actions/files.actions';
import { useDispatch } from 'react-redux';

interface IProps {
  workTime: IWorkTimeStruct;
}

const MessageTile: React.FC<IProps> = ({ workTime }: IProps) => {
  // -------------------------------------------------------------------------------------------------------------------
  const dispatch = useDispatch();

  const map: Record<string, string> = {
    NEW: 'Выберете причину изменения и новый график из справочника',
    DISPLAY: 'Заявка находится в работе.',
    APPROVE: 'Согласуйте или верните на доработку заявку сотрудника.',
    ZSIGNITURE: 'Скачайте, подпишите и приложите скан-копию изменений к трудовому договору.',
    PROCESS: 'Выберите график для проведения мероприятия в кадровой системе.',
    REQUEST: 'Заявка был возвращен на доработку. Внесите корректировки согласно комментариям в истории.'
  };
  const downloadHandler = () => {
    dispatch(
      downloadFilePending({
        wiId: workTime.process.wiId,
        attGuid: '',
        attType: 'ZDOP',
        attTypeText: 'Общие приложения',
        attFileName: 'Изменения к трудовому договору.pdf',
        attBase64: 'data:;base64,',
        attAction: 'downloadDOP'
      })
    );
  };
  return (
    <>
      <Message variant={['DISPLAY', 'REQUEST'].includes(workTime.currentStep) ? 'warning' : 'success'}>
        {map[workTime.currentStep]}
      </Message>
      {workTime.currentStep === 'ZSIGNITURE' && (
        <Button className='request__download-document' onClick={downloadHandler}>
          Скачать
        </Button>
      )}
    </>
  );
};

export default MessageTile;

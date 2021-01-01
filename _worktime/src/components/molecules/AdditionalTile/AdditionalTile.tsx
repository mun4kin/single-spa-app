import React, { useState } from 'react';
import './AdditionalTile.scss';
import { Button, FileInput, FormGroup, Message, sendNotification, Textarea } from 'root-front';
import { IWorkTimeStruct } from '../../../_store/types/worktime.types';
import { IFileData } from 'root-front/dist/types';

export type IRequestType = 'SEND' | 'APPROVE' | 'BACKTO' | 'REJECT' | 'ZSIGNITURE' | 'WITHDRAW';

interface IProps {
  workTime: IWorkTimeStruct;
  file: IFileData[];
  setFile: (files: IFileData[]) => void;
  formFunction: (type: string, comment: string) => void;
  approve: boolean;
}

const AdditionalTile: React.FC<IProps> = ({ workTime, file, setFile, formFunction, approve }: IProps) => {
  const [comment, setComment] = useState('');

  // -------------------------------------------------------------------------------------------------------------------

  const clickHandle = (type: string) => {
    formFunction(type, comment);
  };

  const onKeyUpHandle = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setComment((event.target as HTMLInputElement).value);
  };

  const signHandle = (type: string) => {
    if (file.length || workTime.process.scenarioStage !== 'ZSIGNITURE') {
      clickHandle(type);
    } else {
      sendNotification({
        message: 'Необходимо приложить подписанное изменения к трудовому договору',
        variant: 'danger'
      });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------

  const newButtons = workTime.process.events
    .map((item) => {
      switch (item.event) {
        case 'SEND':
          return (
            <Button
              key={1}
              type='submit'
              disabled={(workTime.dict.currentCause?.attType || '') !== '' && !file.length}
              className='additional__footer-button'
              onClick={() => signHandle(item.event)}>
              {workTime.process.scenarioStage === 'PROCESS' ? 'Провести мероприятие' : 'Отправить'}
            </Button>
          );
        case 'BACKTO':
          return (
            <Button
              key={3}
              type='button'
              className='additional__footer-button'
              buttonType='outlinePrimary'
              onClick={() => clickHandle(item.event)}>
              Вернуть на доработку
            </Button>
          );
        case 'APPROVE':
          return (
            <Button type='button' key={2} className='additional__footer-button' onClick={() => clickHandle('APPROVE')}>
              Согласовать
            </Button>
          );
        case 'REJECT':
          return (
            <Button
              key={4}
              type='button'
              variant={'danger'}
              buttonType='outlinePrimary'
              className='additional__footer-button'
              onClick={() => clickHandle(item.event)}>
              Отклонить
            </Button>
          );
        case 'SEND_VAR_A':
          return (
            <Button
              key={5}
              disabled={!approve}
              type='submit'
              className='additional__footer-button '
              onClick={() => clickHandle(item.event)}>
              Провести мероприятие
            </Button>
          );
        case 'SEND_VAR_B':
          return (
            <Button
              key={6}
              type='submit'
              disabled={!approve}
              className='additional__footer-button '
              onClick={() => clickHandle(item.event)}>
              Запланировать мероприятие
            </Button>
          );
        case 'WITHDRAW':
          return (
            <Button
              key={7}
              type='button'
              variant={'danger'}
              buttonType='outlinePrimary'
              className='additional__footer-button '
              onClick={() => clickHandle(item.event)}>
              Отозвать
            </Button>
          );
      }
      return <></>;
    })
    .sort((a: any, b: any) => (+a.key >= +b.key ? 1 : -1));

  return (
    <>
      <div>
        {workTime.currentStep !== 'DISPLAY' ? (
          <>
            <FormGroup className='additional__group' label='Комментарий'>
              <Textarea
                name='comment'
                placeholder='Введите комментарий'
                autoResize={true}
                maxLength={255}
                onKeyUp={onKeyUpHandle}
              />
            </FormGroup>

            {workTime.dict.currentCause?.attType && workTime.currentStep === 'NEW' && (
              <Message className='additional__message' variant='warning'>
                Не забудьте приложить файл: {workTime.dict.currentCause.attTypeText}
              </Message>
            )}
            <FileInput
              className='additional__fileinput'
              buttonType='outlinePrimary'
              placeholder='Выберите файлы'
              setFile={setFile}
              multiple
            />
          </>
        ) : (
          <Message className='additional__message' variant={'warning'}>
            Заявка находится в работе, но вы можете отозвать ее.
          </Message>
        )}

        <footer className='additional__footer'>{newButtons}</footer>
      </div>
    </>
  );
};

export default AdditionalTile;

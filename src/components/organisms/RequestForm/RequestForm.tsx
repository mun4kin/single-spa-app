import React, { forwardRef, ReactElement, useImperativeHandle, useMemo, useRef } from 'react';
import './RequestForm.scss';
import { useReactiveForm } from 'use-reactive-form';
import { object, string } from 'yup';
import { openPopup, sendNotification } from 'root-front';
import WorkDeskTile from '../../molecules/WorkDeskTile';

import { IAttachment, IBasicWorkTimeForm, IProcess, IWorkTimeStruct } from '../../../_store/types/worktime.types';
import { MESSAGES } from '../../../_utils/messages';
import { useDispatch } from 'react-redux';
import { saveProcessPending } from '../../../_store/actions/process.actions';
import ConfirmRequest from '../../popups/ConfirmRequest';
import UserCard from '../../molecules/UserCard';
import FormDates from '../../molecules/FormDates';

import FormWorkTimeSelect from '../../molecules/FormWorkTimeSelect';
import FormCustomSelection from '../../molecules/FormCustomSelection/FormCustomSelection';
import { IRequestType } from '../../molecules/AdditionalTile/AdditionalTile';
import ConfirmPopup from '../../popups/ConfirmPopup';
import FormCauseSelect from '../../molecules/FormCauseSelect';
import FormFeedSelect from '../../molecules/FormFeedSelect/FormFeedSelect';
import { IFileData } from 'root-front/dist/types';

interface IProps {
  data: IWorkTimeStruct;
  isEdit?: boolean;
}
export interface IRef {
  onSubmit: (files: IFileData[], comment: string, type: string) => void;
}
//передаем функцию для проверки времени
export const correctContext = React.createContext<(isCorrect: boolean, val: number) => void>(() => {});

export interface IFormContext {
  data: IWorkTimeStruct;
  values: IBasicWorkTimeForm;
  update: (data: IBasicWorkTimeForm) => void;
  errors: any;
}

export const formContext = React.createContext<IFormContext | any>({});

const RequestForm = forwardRef(({ data, isEdit = true }: IProps, refParent: any) => {
  const dispatch = useDispatch();
  /** Показать / Скрыть кастомную форму */
  const correctTime = useRef<boolean>(true);
  const currentTime = useRef<number>(data.process.schedule.timePerWeek);
  const setCorrectTime = (isCorrect: boolean, val: number) => {
    correctTime.current = isCorrect;
    currentTime.current = val;
  };

  // -----------------------------------Инициализация формы и андо компонента-------------------------------------------
  /** Сохраняем начальное состояние формы */
  const initialValues = useMemo<IBasicWorkTimeForm>(
    () =>
      JSON.parse(
        JSON.stringify({
          idWorkTemplate: data.worktime.idWorkTemplate || '',
          nameWorkTemplate: data.worktime.nameWorkTemplate || '',
          startDate: data.process.schedule.startDate || '',
          endDate: data.process.schedule.endDate || '',
          timePerWeek: data.process.schedule.timePerWeek || 0,
          break: data.process.schedule.break || 0,
          percentage: data.process.schedule.percentage || 0,
          workTime: [...data.process.schedule.workTime] || [],
          breakFeedPer: data.process.schedule.breakFeedPer || ''
        })
      ),
    [data]
  );

  const config = {
    fields: {
      ...initialValues
    },
    schema: object().shape({
      startDate: data.process.schedule.startDateFlags.required
        ? string().required(MESSAGES.REQUIRED_FIELD)
        : string().notRequired(),
      endDate: data.process.schedule.endDateFlags.required
        ? string().required(MESSAGES.REQUIRED_FIELD)
        : string().notRequired(),
      break: data.process.schedule.breakFlags.required
        ? string().required(MESSAGES.REQUIRED_FIELD)
        : string().notRequired(),
      idWorkTemplate: data.process.schedule.workTemplateFlags.required
        ? string().required(MESSAGES.REQUIRED_FIELD)
        : string().notRequired()
    })
  };

  const { ref, values, errors, update, validate } = useReactiveForm<IBasicWorkTimeForm>(config);

  // -------------------------------------------------------------------------------------------------------------------
  // -----------------------------------сабмит формы--------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------------
  useImperativeHandle(
    refParent,
    () => ({
      onSubmit(files: IFileData[], comment: string, type: IRequestType) {
        //то что в итоге отправим в бек
        const resultValues: IBasicWorkTimeForm = JSON.parse(JSON.stringify(values));

        //===============================
        // если кастомный график и сумма рабочего времени не совпадает
        if (!correctTime.current && ['-', ''].includes(resultValues.idWorkTemplate)) {
          sendNotification({ message: 'Рабочее время выбрано не корректно', variant: 'danger' });
          return;
        }
        //===============================

        if (validate()) {
          //===============================
          //  если шаблон кастомный то обнуляем значение иначе берем данные из стандартного графика
          if (['-', ''].includes(resultValues.idWorkTemplate)) {
            resultValues.idWorkTemplate = '';
            resultValues.timePerWeek = currentTime.current;
          } else {
            resultValues.workTime = data.worktime.workTime.map((i) => {
              delete i.idWorkTemplate;
              return i;
            });
            resultValues.break = data.worktime.break;
            resultValues.timePerWeek = data.worktime.timePerWeek;
            // обработка типа перерыва на кормление

            resultValues.breakFeedPer = data.dict.currentCause?.workTempFeed
              ? resultValues.breakFeedPer !== '0'
                ? resultValues.breakFeedPer
                : '1'
              : '0';
          }
          resultValues.breakFeedTypeDesc = data.process.schedule.breakFeedTypeDesc;
          resultValues.breakFeedType = data.process.schedule.breakFeedType;
          resultValues.breakFeedPerDesc = data.dict.feedBreaks?.find(
            (i) => i.value === resultValues.breakFeedPer
          )?.label;
          //===============================
          //тип файлов
          let typeFiles = '';
          data.currentStep === 'ZSIGNITURE' && (typeFiles = 'ZDOP');
          data.currentStep === 'NEW' && (typeFiles = data.dict.currentCause?.attType || '');

          const result: IProcess = {
            ...data.process,
            schedule: resultValues,
            reason: data.dict.currentCause?.value || data.process.reason,
            reasonDesc: data.dict.currentCause?.label || data.process.reasonDesc,
            comment: comment,
            event: type,
            attachments: files.map(
              (item, id) =>
                ({
                  attGuid: `$${id}`,
                  attType: typeFiles,
                  attTypeText: '',
                  attFileName: item.file.name,
                  attAction: 'I',
                  attBase64: item.base64
                } as IAttachment)
            )
          };
          //===============================
          console.log('Form:', result.schedule);
          console.log('all:', result);
          const oldSchedule = JSON.stringify({
            ...data.process.schedule.workTime,
            tmp: data.process.schedule.idWorkTemplate
          });
          const newSchedule = JSON.stringify({ ...resultValues.workTime, tmp: resultValues.idWorkTemplate });

          if (data.currentStep === 'NEW' && oldSchedule === newSchedule) {
            sendNotification({ message: 'График рабочего времени не изменился.', variant: 'warning' });
          } else {
            const handleSubmit = (comment?: string) => {
              comment && (result.comment = comment);
              dispatch(saveProcessPending(result));
            };

            const modalsMap: Record<string, ReactElement> = {
              SEND: <ConfirmRequest data={result} onSubmit={handleSubmit} />,
              APPROVE: <ConfirmPopup action='Согласовать' onAction={handleSubmit} comment={result.comment} />,
              BACKTO: <ConfirmPopup action='Вернуть на доработку' onAction={handleSubmit} comment={result.comment} />,
              REJECT: <ConfirmPopup action='Отклонить' onAction={handleSubmit} comment={result.comment} />,
              ZSIGNITURE: <ConfirmPopup action='Отправить' onAction={handleSubmit} comment={result.comment} />,
              SEND_VAR_A: <ConfirmPopup action='Отправить' onAction={handleSubmit} comment={result.comment} />,
              SEND_VAR_B: <ConfirmPopup action='Отправить' onAction={handleSubmit} comment={result.comment} />,
              WITHDRAW: (
                <ConfirmPopup
                  action='Отправить'
                  onAction={handleSubmit}
                  customText={' Вы уверены что хотите отозвать заявку?'}
                />
              )
            };
            !['NEW', 'REQUEST'].includes(data.currentStep) &&
              (modalsMap.SEND = <ConfirmPopup action='Отправить' onAction={handleSubmit} comment={result.comment} />);

            openPopup(modalsMap[type], type === 'SEND' ? 'confirm__request' : 'confirm__popup');
          }
        }
      }
    }),
    [values, correctTime, data.worktime]
  );
  // -------------------------------------------------------------------------------------------------------------------
  return (
    <div className='request-form'>
      <formContext.Provider
        value={{
          data,
          values,
          update,
          errors
        }}>
        <form className='' ref={ref}>
          <UserCard user={data.process.user} />
          {isEdit && (
            <>
              <FormDates />
              <FormCauseSelect />
              <FormWorkTimeSelect />
              <FormFeedSelect />
            </>
          )}
          {values.idWorkTemplate !== '-' ? (
            <WorkDeskTile
              values={values}
              data={['NEW', 'REQUEST'].includes(data.currentStep) ? data.worktime : data.process.schedule}
              initiator={ data.process.initiator ?? undefined}
              cause={data.currentStep === 'NEW' ? undefined : data.process.reasonDesc || undefined}
            />
          ) : (
            <correctContext.Provider value={setCorrectTime}>
              <FormCustomSelection initialValues={initialValues} />
            </correctContext.Provider>
          )}
        </form>
      </formContext.Provider>
    </div>
  );
});

export default RequestForm;

import React, { useContext, useEffect, useState } from 'react';
import './FormDates.scss';
import { Checkbox, Datepicker, FormGroup } from 'root-front';
import { addZero, getDateFromString, getDate } from '../../../_utils/helper';
import { formContext, IFormContext } from '../../organisms/RequestForm/RequestForm';

const FormDates: React.FC = () => {
  const [endTime, setEndTime] = useState(false);
  const { data, values, update, errors } = useContext<IFormContext>(formContext);
  const corrDate = data.currentStep !== 'REQUEST';
  useEffect(() => {
    if (corrDate) {
      values.startDate = getDate(new Date(), 1, 'string') as string;
      values.endDate = '';
      update(values);
    } else {
      values.endDate && setEndTime(true);
    }
  }, []);
  /** при изменении дат действия*/
  const onChangeStartDate = (date: Date | null, name?: string) => {
    if (date && name) {
      const d = date as Date;
      values[name as 'startDate' | 'endDate'] = `${addZero(d.getDate())}.${addZero(
        d.getMonth() + 1
      )}.${d?.getFullYear()}`;
      update(values);
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  const isVisibleDates = !data.process.schedule.endDateFlags.show && !data.process.schedule.startDateFlags.show;
  /** если надо выбарть срок действия графика*/
  const getChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(!e.target.checked);
    if (e.target.checked) {
      values.endDate = '';
    } else {
      const val = document.querySelector<HTMLInputElement>('[name=endDate]')?.value;
      if (val) {
        const splitVal = val.split('-');
        values.endDate = `${splitVal[2]}.${splitVal[1]}.${splitVal[0]}`;
      }
    }
    update(values);
  };
  const initStart = getDate(new Date(), 1) as Date;
  const initEnd = getDate(new Date(), 2) as Date;
  const initDateStart = corrDate ? initStart : getDateFromString(values.startDate || '');
  const initDateEnd = corrDate ? initEnd : getDateFromString(values.endDate || '');

  return (
    <div className={`request-form__dates-wrapper ${isVisibleDates ? 'request-form__non-visible' : ''}`}>
      {data.process.schedule.startDateFlags.show && (
        <FormGroup
          className='request-form__group request-form__group-date'
          errorMessage={errors.startDate.error}
          label='Действует с'
          required={data.process.schedule.startDateFlags.required}>
          <Datepicker
            name='startDate'
            onChange={onChangeStartDate}
            value={initDateStart}
            minDate={new Date()}
            disabled={!data.process.schedule.startDateFlags.editable}
          />
        </FormGroup>
      )}
      {data.process.schedule.endDateFlags.show && (
        <FormGroup
          className={`request-form__group request-form__group-date ${!endTime && 'request-form__group-disabled'}`}
          errorMessage={errors.endDate.error}
          required={data.process.schedule.endDateFlags.required}
          label='Действует по'>
          <Datepicker
            name='endDate'
            disabled={!endTime || !data.process.schedule.startDateFlags.editable}
            minDate={getDate(getDateFromString(values.startDate || ''), 1) as Date}
            onChange={onChangeStartDate}
            value={initDateEnd}
          />
        </FormGroup>
      )}
      <Checkbox
        name='radioSecondDate'
        value={'1'}
        label={'Бессрочно'}
        defaultChecked={!endTime}
        onChange={getChecked}
      />
    </div>
  );
};

export default FormDates;

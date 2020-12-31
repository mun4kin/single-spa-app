import React, { useContext } from 'react';
import './FormWorkTimeSelect.scss';
import { FormGroup, Select } from 'root-front';
import { IOption } from 'root-front/dist/types';
import { getWorkTimePending } from '../../../_store/actions/worktime.actions';
import { useDispatch } from 'react-redux';
import { formContext, IFormContext } from "../../organisms/RequestForm/RequestForm";
import { IBasicWorkTimeForm } from "../../../_store/types/worktime.types";

interface IProps {

  // setAddition: (value: boolean) => void;
}

const FormWorkTimeSelect: React.FC<IProps> = () => {
  const { data, values, update, errors } = useContext<IFormContext>(formContext);
  // ----------------------------------селект с графиком работы---------------------------------------------------------
  let list = data.dict.allWork ? [...data.dict.allWork] : [];
  ['NEW'].includes(data.currentStep) && (list = [{ value: '-', label: 'Сформировать график самостоятельно' }, ...list]);
  const dispatch = useDispatch();

  /** если выбран кастомный график меняем стейт*/
  const onChangeSelect = (val: IOption) => {
    const v= JSON.parse(JSON.stringify(values)) as IBasicWorkTimeForm
    v.idWorkTemplate = val.value
    v.nameWorkTemplate= val.label
    update(v)
    dispatch(getWorkTimePending(val.value))
  };
  // -------------------------------------------------------------------------------------------------------------------

  return (
    <>
      {data.process.schedule.workTemplateFlags.show && (
        <FormGroup
          className='request-form__group'
          errorMessage={errors.idWorkTemplate.error}
          label='График рабочего времени'
          required={data.process.schedule.workTemplateFlags.required}>
          <Select
            // name='idWorkTemplate'
            options={list}
            placeholder='Выберите значение'
            value={values.idWorkTemplate}
            getValue={onChangeSelect}
            disabled={!data.process.schedule.workTemplateFlags.editable}
          />
        </FormGroup>
      )}
    </>
  );
};

export default FormWorkTimeSelect;

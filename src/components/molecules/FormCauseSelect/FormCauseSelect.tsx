import React, { useContext } from 'react';
import './FormCauseSelect.scss';
import { FormGroup, Select, Tooltip } from 'root-front';
import { IOption } from 'root-front/dist/types';
import { useDispatch } from 'react-redux';
import { ReactComponent as Info } from '../../../assets/svg/info.svg';

import { workTimeDictPending } from '../../../_store/actions/dictionary.actions';
import { formContext, IFormContext } from '../../organisms/RequestForm/RequestForm';

const FormCauseSelect: React.FC = () => {
  // ----------------------------------селект с графиком работы---------------------------------------------------------
  const { data, errors } = useContext<IFormContext>(formContext);
  const dispatch = useDispatch();
  /** если выбран кастомный график меняем стейт*/
  const onChangeSelect = ({ value }: IOption) => {
    dispatch(workTimeDictPending(value));
  };

  // -------------------------------------------------------------------------------------------------------------------

  const options: IOption[] =
    data.dict.causes?.map(
      (i) =>
        ({
          value: i.value,
          label: i.label,
          disabled: !i.available,
          node: i.available ? (
            i.label
          ) : (
            <div className='select__cause-node'>
              {i.label}
              <Tooltip>
                <Info className='select__cause-node-icon' />
                <div className='select__cause-node-text'>
                  <p>Вам недоступна эта опция.</p>
                  <p>Обратитесь к HR-администратору.</p>
                </div>
              </Tooltip>
            </div>
          )
        } as IOption)
    ) || [];

  options.sort((a: IOption, b: IOption) => {
    const x = a.disabled ? 0 : 1;
    const y = b.disabled ? 0 : 1;
    return y - x;
  });

  return (
    <>
      {data.process.schedule.workTemplateFlags.show && (
        <FormGroup
          className='request-form__group'
          errorMessage={errors.idWorkTemplate.error}
          label='Причина изменения графика'
          required={data.process.schedule.workTemplateFlags.required}>
          <Select
            options={options}
            placeholder='Выберите значение'
            value={data.process.reason || ''}
            getValue={onChangeSelect}
            disabled={data.currentStep !== 'NEW'}
            readOnly={true}
          />
        </FormGroup>
      )}
    </>
  );
};

export default FormCauseSelect;

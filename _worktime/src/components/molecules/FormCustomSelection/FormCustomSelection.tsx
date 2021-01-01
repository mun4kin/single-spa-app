import React, { useContext, useEffect, useRef } from 'react';
import './FormCustomSelection.scss';
import InfoWorkChange from '../../atoms/InfoWorkChange';
import { FormGroup, Select } from 'root-front';
import { breakTime } from '../../organisms/RequestForm/breakTime';
import WorkTimeMenu from '../WorkTimeMenu';
import TimeTable from '../../organisms/TimeTable';
import { IBasicWorkTime, IBasicWorkTimeForm } from '../../../_store/types/worktime.types';
import { useUndo } from 'root-front/dist/hooks/useUndo';
import { IOption } from 'root-front/dist/types';
import { getMinuteTime } from '../../../_utils/helper';
import { ICausesOptions } from '../../../_store/types/dictionary.types';
import { formContext, IFormContext } from '../../organisms/RequestForm/RequestForm';

interface IProps {
  initialValues: IBasicWorkTimeForm;
}

const FormCustomSelection: React.FC<IProps> = ({ initialValues }: IProps) => {
  const { data, values, update, errors } = useContext<IFormContext>(formContext);
  const { undo, redo, pushUndo, dispatchUndo, dispatchRedo, state, reset } = useUndo({ state: initialValues });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    state.endDate = values.endDate;
    state.startDate = values.startDate;
    state.idWorkTemplate = values.idWorkTemplate;
    state.nameWorkTemplate = values.idWorkTemplate;
    state.breakFeedPer = values.breakFeedPer;
    update(state);
  }, [state]);

  // -------------------------------------------------------------------------------------------------------------------

  /** при изменении селекта c перерывом пересчитываем график*/
  const onChangeBreakSelect = ({ value }: IOption) => {
    const tmp_val: IBasicWorkTime = JSON.parse(JSON.stringify(values));
    tmp_val.break = +value;
    pushUndo(tmp_val);
  };

  /** при изменении времени начала и окончания(flag = true) дня пересчитываем график*/
  const changeValue = (value: string, domId: string, flag?: boolean) => {
    const tmp_val: IBasicWorkTime = JSON.parse(JSON.stringify(values));
    const id: number = +domId.split('_')[0];

    if (flag) {
      tmp_val.workTime[id].end = getMinuteTime(value);
    } else {
      tmp_val.workTime[id].start = getMinuteTime(value);
    }
    pushUndo(tmp_val);
  };

  /** Сбрасываем только рабочие часы */
  const resetForm = () => {
    // todo Не изящно, нужно подумать, как обыграть это в форме
    const select = ref?.current?.querySelectorAll('[name=break]');
    select &&
      select.forEach((item) => {
        const input = item as HTMLInputElement;
        input.checked = +input.value === initialValues.break;
      });

    reset({
      ...values,
      break: initialValues.break,
      workTime: [...initialValues.workTime]
    });
  };

  return (
    <div ref={ref}>
      <InfoWorkChange schedule={data.process.schedule} cause={data.dict.currentCause as ICausesOptions} />
      {data.process.schedule.breakFlags.show && (
        <FormGroup
          className='request-form__group'
          errorMessage={errors.break.error}
          label='Перерыв'
          required={data.process.schedule.breakFlags.required}>
          <Select
            name='break'
            className='select-break'
            options={breakTime}
            key={values.break}
            placeholder='Выберите значение'
            value={values.break.toString()}
            getValue={onChangeBreakSelect}
            disabled={!data.process.schedule.breakFlags.editable}
          />
        </FormGroup>
      )}

      <FormGroup className='request-form__group request-form__group--wide' label='Рабочая неделя'>
        <WorkTimeMenu
          undo={[...undo]}
          redo={[...redo]}
          dispatchUndo={dispatchUndo}
          dispatchRedo={dispatchRedo}
          resetForm={resetForm}
        />
        <TimeTable
          changePicker={changeValue}
          workTime={data.process.schedule}
          values={values}
          cause={data.dict.currentCause as ICausesOptions}
          pushUndo={pushUndo}
        />
      </FormGroup>
    </div>
  );
};

export default FormCustomSelection;

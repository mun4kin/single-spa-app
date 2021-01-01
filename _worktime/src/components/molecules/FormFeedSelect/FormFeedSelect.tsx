import React, { useContext, useEffect } from 'react';
import './FormFeedSelect.scss';
import { FormGroup, Select } from 'root-front';

import { useDispatch } from 'react-redux';
import { feedBreaksPending } from '../../../_store/actions/dictionary.actions';
import { formContext, IFormContext } from '../../organisms/RequestForm/RequestForm';

const FormFeedSelect: React.FC = () => {
  const { data } = useContext<IFormContext>(formContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(feedBreaksPending());
  }, []);

  const selected = data.dict.feedBreaks && data.dict.feedBreaks.length ? data.dict.feedBreaks[0].value : '';
  const options =
    data.dict.feedBreaks?.map((item) => ({
      value: item.value,
      label: `${data.process.schedule.breakFeedTypeDesc} ${item.label.toLowerCase()}`
    })) || [];
  // -------------------------------------------------------------------------------------------------------------------
  // /** если выбран кастомный график меняем стейт*/

  return (
    <>
      {data.dict.currentCause?.workTempFeed && (
        <FormGroup className='request-form__group' label='Время на кормление'>
          <Select
            name='breakFeedPer'
            options={options}
            placeholder='Выберите значение'
            value={selected}
            readOnly={true}
            // getValue={onChangeSelect}
          />
        </FormGroup>
      )}
    </>
  );
};

export default FormFeedSelect;

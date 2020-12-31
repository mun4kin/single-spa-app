import React from 'react';
import './ConfirmPopup.scss';
import { PopupFooter, FormGroup, Textarea } from 'root-front';


interface IProps {
  action: string;
  onAction: (val?: string) => void;
  onClose?: () => void;
  comment?: string;
  customText?: string;
}

const ConfirmPopup: React.FC<IProps> = ({ action, onAction, comment, onClose, customText }: IProps) => {
  const handleSubmit = () => {
    onAction(comment);
    onClose && onClose();
  };
  const changeText = (val: string) => {
    comment = val;
  };
  return (
    <div className='confirm-popup'>
      <h2 className='confirm-popup__title'>Подтвердите действие</h2>
      {customText ? (
        <div className='confirm-popup__text'>{customText}</div>
      ) : (
        <FormGroup label='Комментарий' className='confirm-popup__comment'>
          <Textarea getValue={changeText} placeholder='Добавьте комментарий' defaultValue={comment} maxLength={255} />
        </FormGroup>
      )}
      <PopupFooter onSubmit={handleSubmit} onClose={onClose} textAccept={action} />
    </div>
  );
};

export default ConfirmPopup;

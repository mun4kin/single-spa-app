import React, { ReactNode } from 'react';
import './PopupTemplate.scss';

interface IProps {
  title: string;
  subtitle?: string;
  children: ReactNode | ReactNode[];
}

const PopupTemplate: React.FC<IProps> = ({ title, subtitle, children }: IProps) => {
  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='popup-template'>
      <h2 className='popup-template__title'>{title}</h2>
      {subtitle && <p className='popup-template__subtitle'>{subtitle}</p>}
      <div className='popup-template__separator' />

      <div className='popup-template__content'>{children}</div>
    </div>
  );
};

export default PopupTemplate;

import React, { ReactNode } from 'react';
import './CardContainer.scss';
import { Tile } from 'root-front';

interface IProps {
  user: ReactNode;
  content: ReactNode;
  action: ReactNode;
}

const CardContainer: React.FC<IProps> = ({ user, content, action }: IProps) => {
  // -------------------------------------------------------------------------------------------------------------------

  return (
    <Tile>
      <div className='card-container__wrapper'>
        <div className='card-container__item'>{user}</div>
        <div className='card-container__item'>{content}</div>
        <div className='card-container__item'>{action}</div>
      </div>
    </Tile>
  );
};

export default CardContainer;

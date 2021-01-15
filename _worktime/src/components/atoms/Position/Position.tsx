import React from 'react';
import './Position.scss';
import { Button, Tooltip } from 'root-front';
// import { ReactComponent as Info } from '../../../assets/svg/info.svg';
import Info from '../../../assets/svg/info';

interface IProps {
  department: string;
  path: string;
}

const Position: React.FC<IProps> = ({ department, path }: IProps) => {
  // -------------------------------------------------------------------------------------------------------------------

  const pathHTML = path
    .split(' -> ')
    .filter((s: string) => s)
    .map((item, i) => (
      <div key={i}>
        {!!i && (
          <span key={i} className='arrow-separator'>
            {` > `}
          </span>
        )}
        <span key={i + 1000}> {item}</span>
      </div>
    ));

  return (
    <div className='position__dep-block'>
      <div className='position__user-text'>{department}</div>
      <Tooltip className='position__tooltip-main' position='right'>
        <Button className='position__user-info' buttonType='text'>
          <Info />
        </Button>
        <div className='position__tooltip'>{pathHTML}</div>
      </Tooltip>
    </div>
  );
};

export default Position;

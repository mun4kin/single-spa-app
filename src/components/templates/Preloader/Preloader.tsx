import React from 'react';
import './Preloader.scss';
import { Preloader as PreloaderBase } from 'root-front';

interface IProps {
  size: 'small' | 'medium' | 'large';
}

const Preloader: React.FC<IProps> = ({ size }: IProps) => {
  return (
    <div className='preloader-wrapper'>
      <PreloaderBase size={size} />
    </div>
  );
};

export default Preloader;

import React from 'react';
import './WorkTimeMenu.scss';
import { Button } from 'root-front';

import { ReactComponent as Undo } from '../../../assets/svg/undo.svg';
import { ReactComponent as Redo } from '../../../assets/svg/redo.svg';
import { ReactComponent as Refresh } from '../../../assets/svg/refresh.svg';

interface IProps {
  dispatchRedo: () => void;
  dispatchUndo: () => void;
  undo: any[];
  redo: any[];
  resetForm: () => void;
}

const WorkTimeMenu: React.FC<IProps> = ({
  dispatchRedo, dispatchUndo, undo, redo, resetForm 
}: IProps) => {
  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className=''>
      <div className='time-menu'>
        <Button className='time-menu__button-undo' buttonType='text' disabled={!undo.length} onClick={dispatchUndo}>
          <Undo />
        </Button>
        <Button className='time-menu__button-undo' buttonType='text' disabled={!redo.length} onClick={dispatchRedo}>
          <Redo />
        </Button>
        <Button className='time-menu__button-undo' buttonType='text' onClick={resetForm}>
          <Refresh /> <div className='time-menu__refresh'>Сбросить</div>
        </Button>
      </div>
    </div>
  );
};

export default WorkTimeMenu;

import React, { useContext, useState } from 'react';
import './TimeTable.scss';
import { IBasicWorkTimeForm, IScheduleItem } from '../../../_store/types/worktime.types';
import { Button, Menu, Switch, Timepicker } from 'root-front';
import { getFormatTime, getFullDays } from '../../../_utils/helper';
import { ReactComponent as ShowMore } from '../../../assets/svg/showMore.svg';
import { IListElement } from 'root-front/dist/types';
import { correctContext } from '../RequestForm/RequestForm';
import { ICausesOptions } from '../../../_store/types/dictionary.types';

interface IProps {
  values: IBasicWorkTimeForm;
  pushUndo: (nextState: any, fromRedo?: boolean | undefined) => void;
  changePicker: (value: string, id: string, flag?: boolean) => void;
  workTime: IBasicWorkTimeForm;
  cause: ICausesOptions;
}

const TimeTable: React.FC<IProps> = ({ changePicker, values, pushUndo, workTime, cause }: IProps) => {
  const parentFunc = useContext(correctContext);
  const [buffer, setBuffer] = useState<IScheduleItem | null>(null);

  const daytime = (start: number, end: number, isBreak: boolean=false): number => {
    //считаем общее рабочее время
    const delta = end - start;
    //если рабочее время меньше 4 часов то без перерыва
    return isBreak ? Number(delta > 0 && delta < 240) : delta - (delta >= 240 ? values.break : 0);
  };
  // ------------------------------------------------------------------------------------------------------------------
  const onPaste = (id: number) => {
    if (buffer) {
      const tmp = JSON.parse(JSON.stringify(values));
      tmp.workTime = tmp.workTime.map((w: IScheduleItem, i: number) => {
        return i === id
          ? {
            ...w,
            start: buffer.start,
            end: buffer.end
          }
          : w;
      });
      pushUndo(tmp);
    }
  };
  // ------------------------------------------------------------------------------------------------------------------
  const applyToAll = (item: IScheduleItem) => {
    const tmp = JSON.parse(JSON.stringify(values));
    tmp.workTime = tmp.workTime.map((work: IScheduleItem, i: number) => {
      const disabled =
        (!workTime.workTime[i].startFlags.editable && !workTime.workTime[i].endFlags.editable) ||
        work.end - work.start <= 0;

      return disabled
        ? work
        : {
          ...work,
          start: item.start,
          end: item.end
        };
    });

    pushUndo(tmp);
  };

  // ------------------------------------------------------------------------------------------------------------------
  //считает общее рабочее время
  const allTime = values.workTime.reduce((prev, current) => {
    if (!current.editable || current.end === current.start) return prev;
    return prev + daytime(current.start, current.end);
  }, 0);

  const correctTime = (): boolean => {
    let val = (cause.timePerWeek ? cause.timePerWeek : values.timePerWeek) === allTime;
    cause.workTempPart && (val = true);
    parentFunc(val, allTime);
    return val;
  };
  const switchHandle = (i: number, switchStatus: boolean) => {
    const tmp = JSON.parse(JSON.stringify(values));
    if (switchStatus) {
      tmp.workTime[i].end = 1080;
      tmp.workTime[i].start = 540;
    } else {
      tmp.workTime[i].end = 0;
      tmp.workTime[i].start = 0;
    }

    pushUndo(tmp);
  };
  const tableRows = values.workTime.map((dataItem: IScheduleItem, id) => {
    const disabledRow = id >= 5;

    const list: IListElement[] = [
      {
        label: 'Копировать',
        handler: () => setBuffer(dataItem)
      },
      {
        label: 'Вставить',
        handler: () => onPaste(id),
        disabled: !buffer
      },
      {
        label: 'Применить ко всем',
        handler: () => applyToAll(dataItem)
      }
    ];

    return (
      <tr key={dataItem.dayId} className={`time-table__tr ${disabledRow ? 'time-table__tr--disabled' : ''}`}>
        <td className='time-table__td'>
          <Switch
            disable={!cause.workTempPart}
            onChange={(status) => switchHandle(id, status)}
            state={dataItem.start !== dataItem.end}
          />
        </td>
        <td className='time-table__td'>{getFullDays(+dataItem.dayId)}</td>
        <td className='time-table__td'>
          {workTime.workTime[id].startFlags.show && (
            <Timepicker
              readOnly={true}
              initialValue={getFormatTime(dataItem.start, 1)}
              className='time-table__picker'
              max={getFormatTime(dataItem.end - 15 - values.break, 1)}
              min={getFormatTime(360, 1)}
              onChangeValue={changePicker}
              disabled={disabledRow}
              id={`${id}_start`}
            />
          )}
        </td>
        <td className={`time-table__td ${workTime.workTime[id].endFlags.editable ? '' : 'time-table__td--disabled'}`}>
          {workTime.workTime[id].endFlags.show && (
            <Timepicker
              initialValue={getFormatTime(dataItem.end, 1)}
              min={getFormatTime(dataItem.start + 15 + values.break, 1)}
              max={getFormatTime(1320, 1)}
              className='time-table__picker'
              onChangeValue={(v: string, id: string) => changePicker(v, id, true)}
              disabled={disabledRow}
              id={`${id}_end`}
            />
          )}
        </td>
        <td className='time-table__td'>
          <div className='time-table__td-right time-table__td--disabled'>
            {!disabledRow && daytime
              ? getFormatTime(daytime(dataItem.start, dataItem.end), 3) +
                (daytime(dataItem.start, dataItem.end,true)  ? ' без перерыва' : '')
              : '-'}
          </div>
        </td>
        <td className='time-table__td'>
          {dataItem.editable && (
            <div className='time-table__td-right time-table__td--shrink'>
              <Menu list={list} position='right'>
                <Button buttonType='text'>
                  <ShowMore />
                </Button>
              </Menu>
            </div>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className='time-table__wrapper'>
      <table cellSpacing={'0px'} className='time-table__main'>
        <tbody>
          <tr>
            <th style={{ width: '80px' }} />
            <th className='time-table__th'>День недели</th>
            <th className='time-table__th'>Время начала</th>
            <th className='time-table__th'>Время окончания</th>
            <th style={{ width: '220px' }} className='time-table__th'>
              Рабочих часов
            </th>
            <th />
          </tr>
          {tableRows}
        </tbody>
      </table>
      <div className='time-table__footer'>
        {`Итоговое рабочее время:`}{' '}
        <span className={`${correctTime() ? 'time-table__green' : 'time-table__red'}`}>
          {`${getFormatTime(allTime, 3)}`}{' '}
        </span>{' '}
        {!cause.workTempPart && `/ ${getFormatTime(cause.timePerWeek ? cause.timePerWeek : values.timePerWeek, 3)}`}
      </div>
    </div>
  );
};

export default TimeTable;

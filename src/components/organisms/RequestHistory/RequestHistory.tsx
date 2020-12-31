import React, { useEffect, useState } from 'react';
import './RequestHistory.scss';
import { IAttachment, IProcess, IRequestPath } from '../../../_store/types/worktime.types';
import { ReactComponent as EmptyUser } from '../../../assets/svg/empty-user.svg';
import { Chips, ContentExpander, formatDate, FormGroup, UserPhoto, Tooltip, Button } from 'root-front';
import { useDispatch } from 'react-redux';
import { downloadFilePending } from '../../../_store/actions/files.actions';
import { IChips, IFormattedDate } from 'root-front/dist/types';
import { ReactComponent as Info } from '../../../assets/svg/info.svg';
import { IUser } from '../../../_store/types/user.types';


interface IProps {
  request: IProcess;
}

const RequestHistory: React.FC<IProps> = ({ request }: IProps) => {
  const dispatch = useDispatch();

  // -------------------------------------------------------------------------------------------------------------------

  /** Показать / Скрыть историю */
  const [expanded, setExpanded] = useState<boolean>(false);

  const onExpand = () => {
    setExpanded(!expanded);
  };

  // -------------------------------------------------------------------------------------------------------------------

  /** Фильтруем историю */
  const onPathFilter = (): IRequestPath[] => {
    const find = request.path.findIndex((i) => !i.statusId);
    const step = ~find ? find : request.path.length;
    return expanded ? request.path : [request.path[step - 1]];
  };

  const [path, setPath] = useState(onPathFilter());

  useEffect(() => {
    setPath(onPathFilter());
  }, [expanded]);

  // -------------------------------------------------------------------------------------------------------------------
  const users = (users: IUser[] | null) => {
    return users?.map((item, i) => (
      <React.Fragment key={i}>
        {i < 5 ? (
          <div className='tooltip-users__wrapper'>
            <UserPhoto radius='40px' url={item.photo} />
            <div className='tooltip-users__info'>
              <p className='tooltip-users__name'>{item.fullName}</p>
              <p className='tooltip-users__position'>{item.department}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </React.Fragment>
    ));
  };
  const historyJSX = path.map((r: IRequestPath, i: number) => {
    const d: IFormattedDate | null = r.date ? formatDate(r.date + new Date().getTimezoneOffset() * 60 * 1000) : null;

    return (
      <div className='request__history-element' key={r.stepId}>
        <div className='history__user-photo'>
          {r.user && r.user.length === 1 ? <UserPhoto radius='48px' url={r.user[0].photo} /> : <EmptyUser />}
          {i !== path.length - 1 && (
            <div className='history__user-line'>
              <div className='history__user-line-inner' />
            </div>
          )}
        </div>

        <div className='history__details'>
          <div className='history__details-row'>
            <h4 className='history__details-name'>
              {(r.user && r.user.length === 1 && r.user[0].fullName) || r.agentName || request.initiator.fullName}
            </h4>
            {!(r.user && r.user.length < 2) && (
              <Tooltip>
                <Button className='history__info' buttonType='text'>
                  <Info />
                </Button>
                <div className='tooltip__wrapper'>
                  {users(r.user)}
                </div>
              </Tooltip>
            )}

            {d && (
              <span className='history__details-date'>
                {d.dayOfMonth} {d.monthShort} {d.year} в {d.hour}:{d.minutes}
              </span>
            )}
          </div>
          <div className='history__details-row'>
            <span className='history__details-info'>{r.activityText}</span>
            <span className={`history__details-status history__details-status--${r.criticality}`}>{r.statusText}</span>
          </div>

          <div className={`history__details-row ${r.comment ? '' : 'history__details-row--ext'}`}>
            {r.comment && <div className='history__details-comment'>{r.comment}</div>}
          </div>
        </div>
      </div>
    );
  });

  // -------------------------------------------------------------------------------------------------------------------

  /** Приложенные файлы */
  const fileChips: IChips[] = request.attachments.map((a: IAttachment, i: number) => ({
    id: a.attGuid,
    name: a.attFileName || a.attTypeText || `Файл ${i}`
  }));

  /** Скачать файл */
  const onDownload = (item: IChips) => {
    const attachment: IAttachment | undefined = request.attachments.find((a: IAttachment) => a.attGuid === item.id);
    if (attachment) {
      dispatch(downloadFilePending(attachment));
    }
  };

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <ContentExpander title='История' onExpand={onExpand} expanded={expanded}>
      <div className='request__history'>{historyJSX}</div>
      {!!fileChips.length && (
        <FormGroup className='request__history-attachments' label='Приложенные файлы'>
          <Chips items={fileChips} onClick={onDownload} />
        </FormGroup>
      )}
    </ContentExpander>
  );
};

export default RequestHistory;

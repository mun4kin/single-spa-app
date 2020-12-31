import React, { useCallback, useRef, useState } from 'react';
import './MainProcess.scss';
import {  IWorkTimeStruct } from '../../../_store/types/worktime.types';
import AdditionalTile from '../../molecules/AdditionalTile';
import RequestForm from '../RequestForm';
import { Tile } from 'root-front';

import { IFileData } from 'root-front/dist/types';
import { IRef } from '../RequestForm/RequestForm';
import MessageTile from '../../atoms/MessageTile';
import RequestHistory from '../RequestHistory';
import TileHRApprove from '../TileHRApprove';
import ContentExpander from 'root-front/dist/components/molecules/ContentExpander';

interface IProps {
  workTime: IWorkTimeStruct;
}

const MainProcess: React.FC<IProps> = ({ workTime }: IProps) => {
  const [approve, setIsApprove] = useState<boolean>(workTime.currentStep !== 'PROCESS');
  const [file, setFile] = useState<IFileData[]>([]);

  const formRef = useRef<IRef>(null);

  const formFunction = useCallback(
    (type: string, comment: string) => {
      formRef?.current?.onSubmit(file, comment, type);
    },
    [file]
  );

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='main-process__wrapper'>
      {(workTime.process.procStatus === 'STARTED' || workTime.currentStep === 'NEW') && (
        <Tile>
          <MessageTile workTime={workTime} />
        </Tile>
      )}
      {!!workTime.process.path.length && (
        <Tile>
          <RequestHistory request={workTime.process} />
        </Tile>
      )}
      <Tile>
        <ContentExpander title='Заявка на изменение графика' defaultValue={true}>
          <RequestForm ref={formRef} data={workTime} isEdit={['NEW', 'REQUEST'].includes(workTime.currentStep)} />
        </ContentExpander>
      </Tile>

      {workTime.currentStep === 'PROCESS' && (
        <Tile>
          <TileHRApprove setIsApprove={setIsApprove} workTime={workTime} />
        </Tile>
      )}

      { !!workTime.process.events.length  && (
        <Tile>
          <AdditionalTile
            formFunction={formFunction}
            workTime={workTime}
            file={file}
            setFile={setFile}
            approve={approve}
          />
        </Tile>
      )}
    </div>
  );
};

export default MainProcess;
// const newFileArr: IFileData[] = [];
// for (let i = 0; i < file.length; i++) {
//   let newBase64 = undefined;
//   try {
//     newBase64 = await imageCompression.getDataUrlFromFile(
//       await imageCompression(file[i].file, {
//         maxSizeMB: 0.1,
//         useWebWorker: true
//       })
//     );
//   } catch (e) {
//     console.log('not image');
//   }
//
//   newFileArr.push({
//     ...file[i],
//     base64: newBase64 ? newBase64 : file[i].base64
//   });
// }

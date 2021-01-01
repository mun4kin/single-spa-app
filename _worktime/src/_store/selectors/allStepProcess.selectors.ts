import { createSelector } from 'reselect';
import { IStore } from '../index';
import { IBasicWorkTimeForm, IWorkTimeStruct } from '../types/worktime.types';

export const workWithDict = createSelector(
  [
    (state: IStore) => state.process.mainProcess,
    (state: IStore) => state.worktime.selectedWorkTime,
    (state: IStore) => state.dictionary,
    (state: IStore) => state.user.currentUser,
    (state: IStore) => state.process.loaded
  ],
  (process, worktime, dict, user, loaded) => {
    return process && loaded && worktime && dict.allWork && dict.causes && user
      ? ({
          worktime: { ...process.schedule, ...worktime } as IBasicWorkTimeForm,
          dict: dict,
          process,
          isMe: user.id === process.initiator.id,
          currentStep: process.wiId === '0' && !process.procGuid ? 'NEW' : process.scenarioStage
        } as IWorkTimeStruct)
      : null;
  }
);

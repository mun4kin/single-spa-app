import { applyMiddleware, combineReducers, createStore } from 'redux';

import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userInfoEffect$ } from './effects/user.effects';
import userReducer, { IUserState } from './reducers/user.reducer';
import { workTimeDictEffect$, causeDictEffect$, feedBreaksEffect$ } from './effects/dictionary.effects';
import dictionaryReducer, { IDictionaryState } from './reducers/dictionary.reducer';
import { getMyWorkTimeEffect$, getWorkTimeEffect$ } from './effects/worktime.effects';
import worktimeReducer, { IWorktimeState } from './reducers/worktime.reducer';
import { getProcessEffect$, saveProcessEffect$ } from './effects/process.effects';
import processReducer, { IGetProcessState } from './reducers/process.reducer';
import { downloadFileEffect$ } from './effects/files.effects';
import { getTeamEffect$ } from './effects/team.effects';
import teamReducer, { ITeamState } from './reducers/team.reducer';
import { getHistoryEffect$, getTasksEffect$ } from './effects/history.effects';
import historyReducer, { IHistoryState } from './reducers/history.reducer';
import { sendFeedbackEffect$ } from './effects/feedback.effects';
import feedbackReducer, { IFeedbackState } from './reducers/feedback.reducer';
import stopApplicationReducer, { IStopApplicationState } from './reducers/stopApplication.reducer';

/*[imports:end] */

export interface IStore {
  user: IUserState;
  dictionary: IDictionaryState;
  worktime: IWorktimeState;
  process: IGetProcessState;
  team: ITeamState;
  history: IHistoryState;
  feedback: IFeedbackState;
  stopApp: IStopApplicationState;

  /*[types:end] */
}

const observableMiddleware = createEpicMiddleware();
const rootReducer = combineReducers({
  user: userReducer,
  dictionary: dictionaryReducer,
  worktime: worktimeReducer,
  process: processReducer,
  team: teamReducer,
  history: historyReducer,
  feedback: feedbackReducer,
  stopApp: stopApplicationReducer

  /*[reducers:end] */
});
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(observableMiddleware)));

observableMiddleware.run(
  combineEpics(
    userInfoEffect$,
    workTimeDictEffect$,
    getWorkTimeEffect$,
    getMyWorkTimeEffect$,
    getProcessEffect$,
    saveProcessEffect$,
    getTeamEffect$,
    getHistoryEffect$,
    sendFeedbackEffect$,
    downloadFileEffect$,
    getTasksEffect$,
    feedBreaksEffect$, 
    causeDictEffect$
    /*[effects:end] */
  )
);

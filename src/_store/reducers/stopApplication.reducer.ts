
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';
import { errorActions } from '../_commonActions/error.actions';



export interface IStopApplicationState {
  countErrors: number;
  stopApplication:boolean;
}

const initialState: IStopApplicationState = {
  countErrors: 0,
  stopApplication:false
};

const stopApplicationReducer = handleTypedActions(
  [
    /** Увеличиваем каунтер ошибок в приложении  */
    createTypedHandler(errorActions, (state: IStopApplicationState): IStopApplicationState => {
      const count=state.countErrors;
      return {
        ...state,
        countErrors:count + 1 ,
        stopApplication:count > 5
      };
    }),
  ],
  initialState
);

export default stopApplicationReducer;
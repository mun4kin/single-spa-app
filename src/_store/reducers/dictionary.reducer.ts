import { Action } from 'redux-actions';
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';
import { workTimeDictSuccess, causeDictSuccess, setCurrentCauseSuccess, feedBreaksSuccess } from '../actions/dictionary.actions';
import { IOption } from 'root-front/dist/types';
import { ICausesOptions } from '../types/dictionary.types';

export interface IDictionaryState {
  allWork: IOption[] | null;
  causes: ICausesOptions[] | null;
  currentCause: ICausesOptions | null;
  feedBreaks:IOption[] | null;
  isLoadCauses: boolean;
}

const initialState: IDictionaryState = {
  allWork: null,
  causes: null,
  feedBreaks:null,
  currentCause: null,
  isLoadCauses: false
};

const dictionaryReducer = handleTypedActions(
  [
    /** Получение справочника рабочего времени */
    createTypedHandler(
      workTimeDictSuccess,
      (state: IDictionaryState, action: Action<IOption[]>): IDictionaryState => ({ ...state, allWork: action.payload })
    ),

    createTypedHandler(
      setCurrentCauseSuccess,
      (state: IDictionaryState, action: Action<string>): IDictionaryState => ({
        ...state,
        currentCause: state.causes?.find((i) => i.value === action.payload) || null
      })
    ),
    createTypedHandler(
      causeDictSuccess,
      (state: IDictionaryState, action: Action<ICausesOptions[]>): IDictionaryState => ({
        ...state,
        causes: action.payload,
        isLoadCauses: true
      })
    ),
    /** Справочник перерывов на кормление */
    createTypedHandler(feedBreaksSuccess, (state: IDictionaryState, action: Action<IOption[]>): IDictionaryState => {
      return {
        ...state,
        feedBreaks:action.payload
      };
    }),
  ],
  initialState
);

export default dictionaryReducer;

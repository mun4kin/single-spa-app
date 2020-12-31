
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';

import { sendFeedbackSuccess } from '../actions/feedback.actions';

export interface IFeedbackState {
  collection: any;
}

const initialState: IFeedbackState = {
  collection: []
};

const feedbackReducer = handleTypedActions(
  [
    /** Отправить обратную связь */
    createTypedHandler(sendFeedbackSuccess, (state: IFeedbackState) => {
      
      return state;
    }),
  ],
  initialState
);

export default feedbackReducer;
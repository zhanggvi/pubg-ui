import { Reducer } from 'redux';

import * as ActionType from './action-types';
import { Actions } from './action-creators';
import { Region, SquadSize, Perspective } from './types';

export interface State {
  region: Region;
  squadSize: SquadSize;
  perspective: Perspective;
}

export const initialState: State = {
  region: 'na',
  squadSize: 'solo',
  perspective: 'third-person'
};

export const reducer: Reducer<State> = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionType.SET_PERSPECTIVE:
    case ActionType.SET_REGION:
    case ActionType.SET_SQUAD_SIZE: {
      return { ...state, ...action.payload };
    }
    default: return state;
  }
};

export default reducer;

import { Reducer } from 'redux';

import * as ActionType from './action-types';
import { Actions } from './action-creators';
import {
  EngineFriendResponse,
  SocketFriendResponse,
  FriendMap
} from './types';

export interface State {
  loading: boolean;
  friends: FriendMap;
  error: string | null;
}

export const initialState: State = {
  loading: true,
  friends: {},
  error: null
};

const friendsEngineMap = (state: FriendMap, friends: EngineFriendResponse[]) => {
  const newState = { ...state };

  friends.forEach(friend => {
    newState[friend.userSerial] = {
      platformId: friend.userSerial,
      platformName: friend.userDisplayName
    };
  });

  return newState;
};

const friendsSocketMap = (state: FriendMap, friends: SocketFriendResponse[]) =>  {
  const newState = { ...state };

  friends.forEach(friend => {
    const platformId = friend.SteamId;

    state[platformId] = {
      ...state[platformId],
      accountId: friend.AccountId,
      nickname: friend.Nickname,
      avatarUrl: friend.AvatarUrl,
      inviteAllow: friend.InviteAllow,
      friendState: friend.State
    };
  });

  return newState;
};

export const reducer: Reducer<State> = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionType.STEAM_FRIENDS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case ActionType.STEAM_FRIENDS_RESPONSE: {
      return {
        ...state,
        loading: false,
        friends: friendsEngineMap(state.friends, action.payload.friends)
      }
    }
    case ActionType.SOCKET_FRIENDS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case ActionType.SOCKET_FRIENDS_SUCCESS: {
      return {
        ...state,
        loading: false,
        friends: friendsSocketMap(state.friends, action.payload.friends)
      };
    }
    case ActionType.STEAM_FRIENDS_FAILURE:
    case ActionType.SOCKET_FRIENDS_FAILURE: {
      return {
        ...state,
        loading: false,
        ...action.payload
      }
    }
    default: return state;
  }
};

export default reducer;
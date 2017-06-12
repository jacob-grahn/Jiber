import { Action, Reducer, createDictionary } from '../../core/index'
import LoginResult from '../interfaces/login-result'

// Setup
const keyName = 'userId'
export interface UserState {
  actionId: number,                                                             // Starts at 0 and increments with every action sent
  loggedInAt: number,                                                           // Might be useful at some point
  userId: string,                                                               // User id
  account: {[key: string]: any}                                                 // Place to store misc account data
  socketId: string
}

const defaultUserState = {
  loggedInAt: 0,
  actionId: 0,
  userId: '',
  account: {},
  socketId: ''
}

// Actions
const INC_ACTION_COUNT = 'hope/user/INC_ACTION_COUNT'
const LOGIN = 'hope/user/LOGIN'
const UPDATE_ACCOUNT = 'hope/user/UPDATE_ACCOUNT'
const REMOVE = 'hope/user/REMOVE'

// Reducer
function userReducer (
  state: UserState = defaultUserState,
  action: Action
): UserState {
  switch (action.type) {
    case LOGIN:
      if (state.userId) return state                                            // prevent multiple logins
      return {
        ...state,
        loggedInAt: action.loggedInAt,
        userId: action.userId,
        account: action.account,
        socketId: action.socketId
      }

    case UPDATE_ACCOUNT:                                                        // if the account needs to be updated after logging in
      return {
        ...state,
        account: action.account
      }

    case INC_ACTION_COUNT:                                                      // should increment actionId every time the user sends an action
      return {                                                                  // actionId is used to prevent duplicating peer to peer actions
        ...state,
        actionId: state.actionId + 1
      }

    default:
      return state
  }
}

export default createDictionary(userReducer, keyName)
export { Reducer }                                                              // stop the compiler from complaining https://github.com/Microsoft/TypeScript/issues/6307

// Action Creators
export function incActionCount (userId: string): Action {
  return {type: INC_ACTION_COUNT, userId}
}

export function login (socketId: string, result: LoginResult): Action {
  return {type: LOGIN, socketId, userId: result.id, account: result.data}
}

export function updateAccount (result: LoginResult): Action {
  return {type: UPDATE_ACCOUNT, userId: result.id, account: result.data}
}

export function userRemove (userId: String): Action {
  return { type: REMOVE, userId }
}
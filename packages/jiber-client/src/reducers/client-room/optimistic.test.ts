import { Action, SERVER } from 'jiber-core'
import { createOptimistic } from './optimistic'
import { ClientRoomState } from './client-room'

const adder = (state: any = '', action: Action): any => {
  return state + action.value
}
const optimistic = createOptimistic(adder)

test('user generated actions are used on the optimistic state', () => {
  const state: any = undefined
  const action = {
    type: 'bet',
    value: '123',
    $actionId: 1
  }
  const roomState: ClientRoomState = {
    optimisticActions: [],
    confirmed: undefined,
    optimistic: state,
    members: {},
    lastUpdatedAt: 0
  }
  expect(optimistic(roomState, action)).toEqual('123')
})

test('optimistic state is rebased when confirmed state is updated', () => {
  const roomState: ClientRoomState = {
    optimisticActions: [
      {
        type: 'test',
        value: '123',
        $actionId: 4,
        $userId: 'sally',
        $roomId: 'testRoom'
      },
      {
        type: 'test',
        value: '456',
        $actionId: 5,
        $userId: 'sally',
        $roomId: 'testRoom'
      }
    ],
    confirmed: 'abc',
    optimistic: '',
    members: {},
    lastUpdatedAt: 0
  }
  const action: Action = {
    type: 'test',
    value: 'abc',
    $roomId: 'testRoom',
    $userId: 'sally',
    $actionId: 3,
    $source: SERVER
  }

  const newState = optimistic(roomState, action)
  expect(newState).toEqual('abc123456')
})
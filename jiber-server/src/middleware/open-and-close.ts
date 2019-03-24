import { Action } from '../action'
import { JiberServer } from '../jiber-server'
import { OPEN, CLOSE } from '../constants'

export const openAndClose = (server: JiberServer) => (next: Function) => (action: Action) => {
  const doc = server.getDoc(action.doc)
  if (action.type === OPEN) {
    doc.join(action.conn)
  } else if (action.type === CLOSE) {
    doc.leave(action.conn)
  } else {
    next(action)
  }
}

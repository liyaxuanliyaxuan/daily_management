import { ADD, MINUS } from '../constants/counter'

const INITIAL_STATE = {
  num: 0
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: action.value + 1
      }
     case MINUS:
       return {
         ...state,
         num: action.value - 1
       }
     default:
       return state
  }
}

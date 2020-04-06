import {  CHECK_ADMIN, SET_USER, SET_IMG } from '../constants/logger'


const INITIAL_STATE = {
    userImg:'',
  ifAdmin: false || localStorage.getItem('ifAdmin'),
  userName: localStorage.getItem('userName')?localStorage.getItem('userName') : ''
}

export default function logger (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHECK_ADMIN:
      return {
        ...state,
        ifAdmin: action.value
      }
      case SET_USER:
          return {
              ...state,
              userName: action.value
          }
          case SET_IMG:
              return {
                  ...state,
                  userImg: action.value
              }
     default:
       return state
  }
}

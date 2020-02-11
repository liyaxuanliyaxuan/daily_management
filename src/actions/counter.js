import {
    ADD,
    MINUS
  } from '../constants/counter'
  
  export const add = (num) => {
    return {
      type: ADD,
      value: num
    }
  }
  export const minus = (num) => {
    return {
      type: MINUS,
      value: num
    }
  }
    
  
  
  
  
  
  // 异步的action
  export function asyncAdd () {
    return dispatch => {
      setTimeout(() => {
        dispatch(add())
      }, 2000)
    }
  }
  
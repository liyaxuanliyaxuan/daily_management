import {
    MEET_SHOW,
    MEET_SEARCH
  } from '../constants/meeter'
  
  export const meetShow = (num) => {
    return {
      type: MEET_SHOW,
      value: num
    }
  }
  export const meetSearch = (num) => {
    return {
      type: MEET_SEARCH,
      value: num
    }
  }
    
  
  
  
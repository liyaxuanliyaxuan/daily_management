import {
    CHECK_ADMIN,
    SET_USER,
    SET_IMG
   
  } from '../constants/logger'
  
  export const checkAdmin = ( ifAdmin ) => {
    return {
      type: CHECK_ADMIN,
      value: ifAdmin
    }
  }
 
    
  export const setUser = ( name ) => {
    return {
      type: SET_USER,
      value: name
    }
  }  
  

  export const setImg = ( url ) => {
    return {
      type: SET_IMG,
      value: url
    }
  }
  

  
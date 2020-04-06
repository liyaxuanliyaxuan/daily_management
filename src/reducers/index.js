import { combineReducers } from 'redux'
import counter from './counter'
import logger from './logger'


export default combineReducers({
  counter,
  logger

})

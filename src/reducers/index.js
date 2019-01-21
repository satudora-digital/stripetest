import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import auth from './auth'
import sources from './sources'
export default combineReducers({
  todos,
  visibilityFilter,
  auth,
  sources
})
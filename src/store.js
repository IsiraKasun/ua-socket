import { configureStore } from '@reduxjs/toolkit'
import userDetailsReducer from './Reducers/user-details-reducer'

export default configureStore({
  reducer: {
    userDetailsReducer: userDetailsReducer
  }
})
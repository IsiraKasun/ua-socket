import { configureStore } from '@reduxjs/toolkit'
import socketStateReducer from './Reducers/socket-state-reducer'

export default configureStore({
  reducer: {
    socketStateReducer: socketStateReducer
  }
})
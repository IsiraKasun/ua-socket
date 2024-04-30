import { createSlice } from '@reduxjs/toolkit'

const socketStateSlice = createSlice({
    name: 'socketState',
    initialState: {
        userId: '',
        sessionId: '',
    },
    reducers: {
        setUserAndSessionId: (state, action) => {
            state.userId = action.payload.userId;
            state.sessionId = action.payload.sessionId;
        },
        removeUserAndSessionId: (state) => {
            state.userId = '';
            state.sessionId = '';
        }
    }
})

export const { setUserAndSessionId, removeUserAndSessionId } = socketStateSlice.actions
export default socketStateSlice.reducer;
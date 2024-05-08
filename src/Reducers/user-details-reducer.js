import { createSlice } from '@reduxjs/toolkit'

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState: {
        userId: '',
        sessionId: '',
        channelId: '',
    },
    reducers: {
        setUserAndSessionId: (state, action) => {
            state.userId = action.payload.userId;
            state.sessionId = action.payload.sessionId;
            state.channelId = action.payload.channelId;
        },
        removeUserAndSessionId: (state) => {
            state.userId = '';
            state.sessionId = '';
            state.channelId = '';
        }
    }
})

export const { setUserAndSessionId, removeUserAndSessionId } = userDetailsSlice.actions
export default userDetailsSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: null,
    token: null,
    id: null,
    loadingStatus: 'idle'
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        setLoadingStatus(state, action) {
            state.loadingStatus = action.payload;
        }
    }
});

const { reducer, actions } = userSlice;
export const { setUser, setLoadingStatus } = actions;
export default reducer;
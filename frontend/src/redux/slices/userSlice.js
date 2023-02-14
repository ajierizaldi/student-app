import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        user: {},
    },

    reducers: {
        login: (state, action) => {
            state.isLogin = true;
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.isLogin = false;
            state.user = action.payload;
        },
    }
})

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;

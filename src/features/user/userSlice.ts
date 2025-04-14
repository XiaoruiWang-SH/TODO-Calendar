/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-27 14:24:52
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-14 11:45:35
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */


import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../data/api_user';
import { RootState } from '../../app/store';
export interface UserState {
    userData: UserData | null;
    showSignInBar: boolean;
}

const initialUserState: UserState = {
    userData: null,
    showSignInBar: false
};

export const selectUser = (state: RootState) => state.user.userData;
export const selectShowSignInBar = (state: RootState) => state.user.showSignInBar;

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;
            console.log("setUser: ", state.userData);
            state.showSignInBar = false;
        },
        logout: (state) => {
            state.userData = null;
        },
        setShowSignInBar: (state, action) => {
            state.showSignInBar = action.payload;
        }
    }
});

export const { setUser, logout, setShowSignInBar } = userSlice.actions;

export const userReducer = userSlice.reducer;
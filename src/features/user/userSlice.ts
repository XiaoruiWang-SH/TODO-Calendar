/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-27 14:24:52
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-14 08:32:57
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */


import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../data/api_user';
import { RootState } from '../../app/store';
export interface UserState {
    userData: UserData | null;
}

const initialUserState: UserState = {
    userData: null
};

export const selectUser = (state: RootState) => state.user.userData;

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;
            console.log("setUser: ", state.userData);
        },
        logout: (state) => {
            state.userData = null;
        }
        
    }
});

export const { setUser, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
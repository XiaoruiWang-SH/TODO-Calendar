/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-17 11:45:25
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-19 14:06:18
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { createSlice } from '@reduxjs/toolkit';
import { TaskState } from './task.types';
import { PayloadAction } from '@reduxjs/toolkit';
import {ItemData} from '../../data/ItemData';
import { RootState } from '../../app/store';

const initialNormalTasksState: TaskState = {
    tasks: []
};

const initialCompletedTasksState: TaskState = {
    tasks: []
};

export const selectNormalTasks = (state: RootState) => state.normalTasks.tasks;
export const selectCompletedTasks = (state: RootState) => state.completedTasks.tasks;

export const normalTasksSlice = createSlice({
    name: 'normalTasks',
    initialState: initialNormalTasksState,
    reducers: {
        add_normal: (state, action: PayloadAction<ItemData>) => {
            state.tasks.push(action.payload);
            state.tasks = [...state.tasks].sort((a, b) => {
                // First sort by importance
                if (a.important !== b.important) {
                    return a.important ? -1 : 1;
                }
                // Then sort by updateTime (most recent first)
                return new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime();
            });
        },
        change_importance: (state, action: PayloadAction<ItemData>) => {
            state.tasks = state.tasks.filter((t: ItemData) => t.id !== action.payload.id);
            state.tasks.push(action.payload);
            state.tasks = [...state.tasks].sort((a, b) => {
                // First sort by importance
                if (a.important !== b.important) {
                    return a.important ? -1 : 1;
                }
                // Then sort by updateTime (most recent first)
                return new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime();
            });
        },
        complete: (state, action: PayloadAction<ItemData>) => {
            state.tasks = state.tasks.filter((t: ItemData) => t.id !== action.payload.id);
        },
        add_normalTasks: (state, action: PayloadAction<ItemData[]>) => {
            const newTasks = action.payload
                .filter((item) => !item.checked);
            state.tasks = [...newTasks].sort((a, b) => {
                // First sort by importance
                if (a.important !== b.important) {
                    return a.important ? -1 : 1;
                }
                // Then sort by updateTime (most recent first)
                return new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime();
            });
        },
        sort_tasks: (state) => {
            state.tasks.sort((a, b) => {
                // First sort by importance
                if (a.important !== b.important) {
                    return a.important ? -1 : 1;
                }
                // Then sort by updateTime (most recent first)
                return new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime();
            });
        }
    }
});

export const { add_normal, change_importance, complete, add_normalTasks, sort_tasks } = normalTasksSlice.actions;
export const normalTasksReducer = normalTasksSlice.reducer;

export const completedTasksSlice = createSlice({
    name: 'completedTasks',
    initialState: initialCompletedTasksState,
    reducers: {
        add_completed: (state, action: PayloadAction<ItemData>) => {
            state.tasks.push(action.payload);
            state.tasks = [...state.tasks].sort((a, b) => {
                // First sort by importance
                if (a.important !== b.important) {
                    return a.important ? -1 : 1;
                }
                // Then sort by updateTime (most recent first)
                return new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime();
            });
        },
        undo: (state, action: PayloadAction<ItemData>) => {
            state.tasks = state.tasks.filter((t:ItemData) => t.id !== action.payload.id);
        },
        add_completedTasks: (state, action: PayloadAction<ItemData[]>) => {
            const newTasks = action.payload
                .filter((item) => item.checked);
            
            state.tasks = [...newTasks].sort((a, b) => {
                // First sort by importance
                if (a.important !== b.important) {
                    return a.important ? -1 : 1;
                }
                // Then sort by updateTime (most recent first)
                return new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime();
            });
        }
    }
});

export const { add_completed, undo, add_completedTasks } = completedTasksSlice.actions;
export const completedTasksReducer = completedTasksSlice.reducer;
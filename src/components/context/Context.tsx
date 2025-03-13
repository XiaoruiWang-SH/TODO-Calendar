/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-13 12:07:29
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { useState, useReducer, useContext, createContext, ReactNode, JSX } from 'react';
import ItemData from '../../data/ItemData';
import { DataContextType, DataAction, TasksProviderProps} from './Context.types'


const NormalTasksContext = createContext<DataContextType | undefined>(undefined);
const CompletedTasksContext = createContext<DataContextType | undefined>(undefined);

export const NormalTasksProvider = ({ children }: TasksProviderProps): JSX.Element => {
    
    function tasksReducer(tasks: ItemData[], action: DataAction): ItemData[] {
        switch (action.type) {
            case 'add': {
                return [
                    ...tasks,
                    action.task
                ];
            }
            case 'addtotop': {
                return [
                    action.task,
                    ...tasks
                ];
            }
            case 'liftup': {
                const newlist = tasks.filter((t) => t.id !== action.task.id);
                return [action.task, ...newlist];
            }
            case 'liftdown': {
                const newlist = tasks.filter((t) => t.id !== action.task.id);
                return [...newlist, action.task];
            }
            case 'complete': {
                return tasks.filter((t) => t.id !== action.task.id);
            }
            default: {
                throw Error('unknown action: ' + action.type);
            }
        }
    }  

    const [tasks, dispatch] = useReducer(tasksReducer, []);

    return (
        <NormalTasksContext.Provider value={{ tasks, dispatch }}>
            {children}
        </NormalTasksContext.Provider>
    );
  };

  export const CompletedTasksProvider = ({children}: TasksProviderProps): JSX.Element => {
    function tasksReducer(tasks: ItemData[], action: DataAction) {
        switch (action.type) {
            case 'add': {
                return [
                    action.task,
                    ...tasks
                ];
            }
            case 'undo': {
                return tasks.filter((t) => t.id !== action.id);
            }
            default: {
                throw Error('unknown action: ' + action.type);
            }
        }
    }

    const [tasks, dispatch] = useReducer(tasksReducer, []);

    return (
        <CompletedTasksContext.Provider value={{ tasks, dispatch }}>
          {children}
        </CompletedTasksContext.Provider>
      );
  }  
 
  export function useNormalTasks(): DataContextType  {
    const context = useContext(NormalTasksContext);
    if (!context) {
        throw new Error("useNormalTasks must be used within a <NormalTasksProvider>");
    }
    return context;
  }

  export function useCompletedTasks(): DataContextType {
    const context = useContext(CompletedTasksContext);
    if (!context) {
        throw new Error("CompletedTasksContext must be used within a <CompletedTasksProvider>");
    }
    return context; 
  }
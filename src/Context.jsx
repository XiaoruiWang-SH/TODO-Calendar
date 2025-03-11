import { useState, useReducer, useContext, createContext } from 'react';


const NormalTasksContext = createContext(null)
const CompletedTasksContext = createContext(null)


export function NormalTasksProvider({ children }) {
    const [normalTasks, normalDispatch] = useReducer(normalTasksReducer, []);
    
    function normalTasksReducer(tasks, action){
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

    return (
        <NormalTasksContext.Provider value={{ normalTasks, normalDispatch }}>
        {children}
        </NormalTasksContext.Provider>
    );
  }

  export function CompletedTasksProvider({ children }) {
    const [completedTasks, completedDispatch] = useReducer(completeTasksReducer, []);

    function completeTasksReducer(tasks, action) {
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

    return (
        <CompletedTasksContext.Provider value={{ completedTasks, completedDispatch }}>
          {children}
        </CompletedTasksContext.Provider>
      );
  }
  
 
  export function useNormalTasks() {
    return useContext(NormalTasksContext);
  }

  export function useCompletedTasks() {
    return useContext(CompletedTasksContext);
  }
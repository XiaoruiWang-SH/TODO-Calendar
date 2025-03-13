/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-13 21:53:05
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { useState, useRef, JSX, FC } from 'react';
import './input.css';
import  icon_plus from '../../assets/icon_plus.svg';
import ItemData from '../../data/ItemData';
import { useNormalTasks, useCompletedTasks } from '../context/Context'
import { ComponentInputProps } from './Input.types'

export const Input: FC = () => {
    const [task, setTask] = useState<string>('');
    const {tasks: normalTasks, dispatch: normalDispatch} = useNormalTasks();
    const taskid = useRef<number>(0);

    const addTask = () => {
        if (task === '') {
            return;
        }
        console.log(`add task ${task}`);
        taskid.current = taskid.current + 1;
        const newItem = new ItemData(taskid.current, task, false, false, new Date(), null, new Date());
        if (newItem.important) {
            normalDispatch({
                type: 'addtotop',
                task: newItem,
                id: newItem.id
            });
        } else {
            normalDispatch({
                type: 'add',
                task: newItem,
                id: newItem.id
            });
        }
        setTask('');
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          addTask();
        }
    }

    return (
    <div className='input-area'>
        <ComponentInput task={task} handleInputChange={handleInputChange} handleKeyDown={handleKeyDown}/>
        <hr className='divider' />
        <button className='p-1 text-xs outline-none border-1 ' onClick={addTask}>Add to</button>
    </div>
    );
}

const ComponentInput: React.FC<ComponentInputProps> = ({task, handleInputChange, handleKeyDown}: ComponentInputProps): JSX.Element => {
    return (
        <div className='componentInput'>
        <img src={icon_plus} className='icon_plus' alt='icon_plus' />
        <input className='addtask' type="text" placeholder="Add a task" value={task} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
        </div>
    );
}

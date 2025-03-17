/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-17 14:54:57
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { useState, useRef, JSX, FC } from 'react';
import './input.css';
import  icon_plus from '../../assets/icon_plus.svg';
import {ItemData} from '../../data/ItemData';
import { ComponentInputProps } from './Input.types'
import { useAppDispatch } from '../../app/hooks';
import { add_normal, addtotop } from '../../features/task/taskSlice';

export const Input: FC = () => {
    const [task, setTask] = useState<string>('');
    const taskid = useRef<number>(0);
    const dispatch = useAppDispatch();

    const addTask = () => {
        if (task === '') {
            return;
        }
        console.log(`add task ${task}`);
        taskid.current = taskid.current + 1;
        const newItem: ItemData = {
            id: taskid.current,
            name: task,
            checked: false,
            important: false,
            createTime: new Date().toISOString(),
            expireTime: null,
            updateTime: new Date().toISOString()
        };
        if (newItem.important) {
            dispatch(addtotop(newItem));
        } else {
            dispatch(add_normal(newItem));
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
        <button className='addbtn' onClick={addTask}>Add to</button>
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

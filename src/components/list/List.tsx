/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-13 16:42:18
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { JSX, useContext, useState, FC } from 'react';
import './List.css';
import star_unselected from '../../assets/star-unselected.svg';
import star_selected from '../../assets/star-selected.svg';
import checkbox_unchecked from '../../assets/checkbox-unselected.svg';
import checkbox_checked from '../../assets/checkbox-selected.svg';
import arrow_up from '../../assets/arrow_up.svg';
import arrow_down from '../../assets/arrow_down.svg';
import { useNormalTasks, useCompletedTasks} from '../context/Context';
import ItemData from '../../data/ItemData';
import { ListItemProps, ItemChangeProps, ComponentCompleteHeaderProps } from './List.type';


export const List: FC = () => {

    const {tasks: normalTasks, dispatch: normalDispatch} = useNormalTasks();
    const {tasks: completedTasks, dispatch: completedDispatch} = useCompletedTasks();

    const taskchange = (item: ItemData) => {
        if (item.checked) {
            normalDispatch({
                type: 'complete',
                id: item.id,
                task: item
            });

            completedDispatch({
                type: 'add',
                id: item.id,
                task: item
            });
        } else {
            completedDispatch({
                type: 'undo',
                id: item.id,
                task: item
            });
            if (item.important) {
                normalDispatch({
                    type: 'addtotop',
                    task: item,
                    id: item.id
                });
            } else {
                normalDispatch({
                    type: 'add',
                    task: item,
                    id: item.id
                });
            }
        }
    }

    const handleImportanceChange = (item: ItemData) => { 
        if (item.important) {
            normalDispatch({
                type: 'liftup',
                task: item,
                id: item.id
            });
        } else {
            normalDispatch({
                type: 'liftdown',
                task: item,
                id: item.id
            });
        }
    }

    return (
        <div className='container'>
        {normalTasks.length == 0 ? <></> : 
        <ul className='list-area'>
            {normalTasks.map((item) => 
            <li className={item.checked ? 'list-checked' : 'list-unchecked'} key={item.id}>
                <ListItem item={item} taskChange={taskchange} handleImportanceChange={handleImportanceChange} />
                </li>
            )}
        </ul>
        }
        {completedTasks.length == 0 ? 
        <></>
        :
        <ComponentComplete />}
        </div>
    );

}


const ListItem = ({item, taskChange, handleImportanceChange}: ListItemProps) => {

    const handleChange = (e: React.MouseEvent) => {
        item.setChecked(!item.checked);
        taskChange(item);
        e.stopPropagation();
    }

    const handleLiftUp = (e: React.MouseEvent) => {
        item.setImportant(!item.important);
        handleImportanceChange(item);
        e.stopPropagation();
    }

    return (
        <div className='list-item'>
            <CheckBox change={item.checked} handleChange={handleChange} />
            <span>{item.name}</span>
            <LiftUPBtn change={item.important} handleChange={handleLiftUp} />

        </div>
    );
}

const CheckBox = ({change: checked, handleChange: handleChange}: ItemChangeProps) => { // 参数本质上是一个对象，这里是结构赋值

    return (
        <div className='round-checkbox' onClick={handleChange}>
            <img src={checked ? checkbox_checked : checkbox_unchecked} className='icon_checkbox' alt='icon_checkbox'/>
        </div>
    );
}

const LiftUPBtn = ({change: important,handleChange: handleLiftUp}: ItemChangeProps) => {
    return (
        <div className='liftup-btn' onClick={handleLiftUp}> 
            <img src={important ? star_selected : star_unselected} className='icon_liftup' alt='icon_liftup' />
        </div>
    );
}


const ComponentComplete = () => {
    const [hiden, setHiden] = useState<boolean>(true);
    const {tasks: normalTasks, dispatch: normalDispatch} = useNormalTasks();
    const {tasks: completedTasks, dispatch: completedDispatch} = useCompletedTasks();

    const listShowClick = () => {
        setHiden(!hiden);
    }

    const taskchange = (item: ItemData) => {
        if (item.checked) {
            normalDispatch({
                type: 'complete',
                task: item,
                id: item.id
            });

            completedDispatch({
                type: 'add',
                task: item,
                id: item.id
            });
        } else {
            completedDispatch({
                type: 'undo',
                task: item,
                id: item.id
            });
            if (item.important) {
                normalDispatch({
                    type: 'addtotop',
                    task: item,
                    id: item.id
                });
            } else {
                normalDispatch({
                    type: 'add',
                    task: item,
                    id: item.id
                });
            }
        }
    }

    return (
        <div className='container-complete'>
            <ComponentCompleteHeader num={completedTasks.length} hiden={hiden} listShowClick={listShowClick}/>
            {hiden ? <></> : 
            <ul className='list-area'>
                {completedTasks.map((item) => 
                <li className={item.checked ? 'list-checked' : 'list-unchecked'}
                key={item.id}>
                    <ListItem item={item} taskChange={taskchange} handleImportanceChange={()=>{}} />
                    </li>
                )}
            </ul>}
        </div>
    );
}

const ComponentCompleteHeader: FC<ComponentCompleteHeaderProps> = ({num, hiden, listShowClick}) => {
    return (
        <div className='container-complete-header' onClick={listShowClick}>
            <div className='arrow-icon'>
                <img src={hiden ? arrow_up : arrow_down} className='icon_checkbox' alt='icon_checkbox' />
            </div>
            <div>Completed</div>
             <div className='container-complete-header-num'>{num}</div>
        </div>
    );
}

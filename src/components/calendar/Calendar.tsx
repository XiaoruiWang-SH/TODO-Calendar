/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-15 14:27:06
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-18 15:02:17
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { DayItemProps, DataItemProps, HeaderProps } from './Calendar.types';
import { ItemData } from '../../data/ItemData';
import star_unselected from '../../assets/star-unselected.svg';
import star_selected from '../../assets/star-selected.svg';
import { getToday, getCurrentWeekDays } from './util';
import { addItem, getItems } from '../../data/api';


const dayTitle: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dayTasks: Map<string, ItemData[]> = new Map([
    ["Sun", []],
    ["Mon", []],
    ["Tue", []],
    ["Wed", []],
    ["Thu", []],
    ["Fri", []],
    ["Sat", []]
]);

const dayData: string[][] = [["你是谁啊你在哪你为什么这样ddd做", "你是谁啊你在哪你为什么这样做你是谁啊你在哪你为什么这样做", "ccc"], ["aaa", "bbb"], ["aaa", "bbb", "ccc"], ["aaa"], ["aaa", "bbb", "ccc", "ddd"], ["aaa", "ccc"], ["aaa", "bbb", "ccc", "ddd", "eee"]];

export const Calendar = () => {

    /**
     * export interface ItemData {
    id: number;
    name: string;
    checked: boolean;
    important: boolean;
    createTime: string;
    expireTime: string | null;
    updateTime: string;
}
     */
    const add_Item = async () => {
        
        const result = await addItem({
            id: 1,
            name: "test", 
            checked: false,
            important: false,
            createTime: new Date().toISOString(),
            expireTime: null,
            updateTime: new Date().toISOString()
        });
        console.log(result);
    };
    const get_Items = async () => {
        const result = await getItems();
        console.log(result);
    };

    return (
        <div>
            
            <Header />
            <WeekTitle />
            {/* <DayBlocks titles={dayTitle} tasks={dayTasks} /> */}

        </div>
    );
};

const WeekTitle = () => {
    return (
        <div className="flex justify-around items-center">
            {dayTitle.map((day, index) => {
                return (
                    <div key={index} className="flex justify-center items-center w-full h-8 bg-gray-200 text-[16px] mx-1.5 rounded-sm">{day}</div>
                );
            })}
        </div>
    );
};

const DayBlocks = ({ titles, tasks }: HeaderProps) => {
    return (
        <div className="flex justify-around items-center h-[75vh] mt-2">
            {/* {titles.map((title, index) => {
                return (
                    <DayItem key={index} item={day} date={title} />
                );
            })} */}
        </div>
    );
};



const DayItem = ({ item, date }: DayItemProps) => {
    return (
        // <div className="flex flex-col justify-start items-start border-s-[1px] border-y-[1px] last:border-e-[1px] border-gray-300 w-full h-full">
        <div className="flex flex-col justify-start items-start bg-gray-50 w-full h-full mx-1.5 rounded-sm text-[14px] leading-4">
            <div className="w-full text-center">{date}</div>
            <div className='my-2 mx-2'>
                {item.map((task, index) => {
                    const itemData: ItemData = {
                        id: 1,
                        name: task,
                        checked: false,
                        important: false,
                        createTime: new Date().toISOString(),
                        expireTime: null,
                        updateTime: new Date().toISOString(),
                    };
                    return (
                        <TaskItem key={index} dataItem={itemData} />
                    );
                }
                )}
            </div>
        </div>
    );
};

const TaskItem = ({ dataItem }: DataItemProps) => {
    return (
        <div className='flex justify-start items-center mt-2 max-h-10'>
            <img src={dataItem.important ? star_unselected : star_unselected} className='w-4' alt='important'></img>
            <div className='ml-1.5 line-clamp-2'>{dataItem.name}</div>
        </div>
    );
};

const Header = () => {
    return (
        <div className='mb-4 ml-1'>
            <div className="text-2xl">Feb 2025</div>
        </div>
    );
};
/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-15 14:27:06
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-19 13:55:03
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { DayTasksProps, TaskItemProps, CurrentDateProps, DateRangeProps } from './Calendar.types';
import { ItemData } from '../../data/ItemData';
import star_unselected from '../../assets/star-unselected.svg';
import star_selected from '../../assets/star-selected.svg';
import { getToday, getCurrentWeekDatesArray, getCurrentDate } from './util';
import { addItem, getItems, getItemsByDayRange } from '../../data/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export const Calendar = () => {

    const [selectDate, setSelectDate] = useState<Date>(new Date());
    const [currentDate, setCurrentDate] = useState<CurrentDateProps>({year: "", month: "", day: ""});
    const [currentWeekDates, setCurrentWeekDates] = useState<Date[]>([]);
    const [tasksMap, setTasksMap] = useState<Map<string, ItemData[]>>(new Map());

    const getTasks = async ({startDate, endDate}: DateRangeProps) => {
        const tasksMap = await getItemsByDayRange(startDate, endDate);
        return tasksMap;
    };

    useEffect(() => {
        const currentDate = getCurrentDate();
        setCurrentDate(currentDate);
        const currentWeekDays = getCurrentWeekDatesArray();
        setCurrentWeekDates(currentWeekDays);
        const fetchTasks = async (currentWeekDays: Date[]) => {
            try {
                const tasks = await getTasks({startDate: currentWeekDays[0].toISOString(), endDate: currentWeekDays[6].toISOString()});
                const tasksMap_ = new Map();
                currentWeekDays.forEach(day => {
                    tasksMap_.set(day.toDateString(), []);
                });
                tasks.forEach(task => {
                    const date = new Date(task.createTime).toDateString();
                    if (tasksMap_.has(date)) {
                        tasksMap_.get(date).push(task);
                    }
                });
                
                setTasksMap(tasksMap_);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks(currentWeekDays);
    }, []);

    return (
        <div>
            
            <Header year={currentDate.year} month={currentDate.month} day={currentDate.day} />
            <WeekTitle />
            <DayBlocks tasks={tasksMap} />

        </div>
    );
};

const WeekTitle = () => {
    const dayTitle: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDay = new Date().getDay();
    return (
        <div className="flex justify-around items-center">
            {dayTitle.map((day, index) => {
                return (
                    <div key={index} className={ `flex justify-center items-center w-full h-8 text-[16px] mx-1.5 bg-gray-200 rounded-sm`}>{day}</div>
                );
            })}
        </div>
    );
};


const DayBlocks = ({ tasks }: DayTasksProps) => {

    const navigate = useNavigate();

    const handleClick = (date: string) => {
        navigate('/task', { state: { date: date } });
    };

    return (
        <div className="flex justify-around items-center h-[75vh] mt-2">
            {Array.from(tasks.entries()).map(([date, daytasks]) => (
                <div className={ `flex flex-col justify-start items-start bg-gray-100 w-full h-full mx-1.5 rounded-sm ${date === new Date().toDateString() ? "border border-gray-400" : ""}`} key={date}
                 onClick={() => handleClick(date)}>
                    <div className="w-full text-center">{date === new Date().toDateString() ? "Today" : new Date(date).toLocaleDateString('en-US', { day: 'numeric' })}</div>
                    <div className='my-2 mx-2'>
                        {
                            daytasks.map((task, index) => (
                                <TaskItem key={index} dataItem={task} />
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

const TaskItem = ({ dataItem }: TaskItemProps) => {
    return (
        <div className='flex justify-start items-center mt-2 max-h-10'>
            <img src={dataItem.important ? star_unselected : star_unselected} className='w-4' alt='important'></img>
            <div className='ml-1.5 line-clamp-2'>{dataItem.name}</div>
        </div>
    );
};

const Header = ({ year, month, day }: CurrentDateProps) => {
    return (
        <div className='mb-4 ml-1'>
            <div className="text-2xl">{month} {year}</div>
        </div>
    );
};
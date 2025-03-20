/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-15 14:27:06
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-20 11:01:12
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { DayTasksProps, TaskItemProps, SwitcherProps, HeaderProps, DisplaySwitcherProps } from './Calendar.types';
import { ItemData } from '../../data/ItemData';
import star_unselected from '../../assets/star-unselected.svg';
import star_selected from '../../assets/star-selected.svg';
import goBack from '../../assets/goback.svg';
import goForward from '../../assets/goforward.svg';
import { getToday, getCurrentDate, getCurrentRangeDatesArray, getLastRangeDatesArray, getNextRangeDatesArray, complementMonthDiaplayDates } from './util';
import { addItem, getItems, getItemsByDayRange } from '../../data/api';
import { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DisplayMode, selectCalendarState, setCurrentDate, setCurrentRangeDates, setTasksMap, setDisplayMode } from '../../features/calendar/calendarSlice';

export const Calendar = () => {
    const dispatch = useAppDispatch();
    const calendarState = useAppSelector(selectCalendarState);
    const { selectDate, currentDate, currentRangeDates, tasksMap, displayMode } = calendarState;
    const [prevDisplayMode, setPrevDisplayMode] = useState(displayMode);
    const [prevRangeDates, setPrevRangeDates] = useState(currentRangeDates);

    const getTasks = async (currentRangeDays: Date[]) => {
        const currentRangeDays_ = complementMonthDiaplayDates(currentRangeDays, displayMode);
        const tasks = await getItemsByDayRange(currentRangeDays_[0].toISOString(), currentRangeDays_[currentRangeDays_.length - 1].toISOString());
        const tasksMap_ = new Map();
        currentRangeDays_.forEach(day => {
            tasksMap_.set(day.toDateString(), []);
        });
        tasks.forEach(task => {
            const date = new Date(task.createTime).toDateString();
            if (tasksMap_.has(date)) {
                tasksMap_.get(date).push(task);
            }
        });
        dispatch(setTasksMap(Object.fromEntries(tasksMap_)));
    };

    useEffect(() => {
        if (currentRangeDates.length === 0 || displayMode !== prevDisplayMode) {
            const currentRangeDays = getCurrentRangeDatesArray(displayMode);
            dispatch(setCurrentRangeDates(currentRangeDays));
            computeTargetDate(currentRangeDays);
            getTasks(currentRangeDays);
        } else if (JSON.stringify(currentRangeDates) !== JSON.stringify(prevRangeDates)) {
            getTasks(currentRangeDates);
        }
        setPrevDisplayMode(displayMode);
        setPrevRangeDates(currentRangeDates);
    }, [dispatch, displayMode, currentRangeDates]);

    const computeTargetDate = (currentWeekDays: Date[]) => {
        const targetDate = currentWeekDays[3];
        const currentDate_ = {
            year: targetDate.getFullYear().toString(),
            month: targetDate.toLocaleString("en-US", { month: "short" }), // "Feb",
            day: targetDate.getDate().toString()
        };
        dispatch(setCurrentDate(currentDate_));
    };

    const handleSwitcher = (action: string) => {
        switch (action) {
            case "goBack": {
                const lastRangeDates = getLastRangeDatesArray(currentRangeDates, displayMode);
                dispatch(setCurrentRangeDates(lastRangeDates));
                computeTargetDate(lastRangeDates);
                getTasks(lastRangeDates);
            }
                break;
            case "goForward": {
                const nextRangeDates = getNextRangeDatesArray(currentRangeDates, displayMode);
                dispatch(setCurrentRangeDates(nextRangeDates));
                computeTargetDate(nextRangeDates);
                getTasks(nextRangeDates);
            }
                break;
            case "today": {
                const currentRangeDays = getCurrentRangeDatesArray(displayMode);
                dispatch(setCurrentRangeDates(currentRangeDays));
                computeTargetDate(currentRangeDays);
                getTasks(currentRangeDays);
            }
                break;
        }
    };

    const handleDisplaySwitcher = (action: string) => {
        switch (action) {
            case DisplayMode.WEEK: {
                dispatch(setDisplayMode(DisplayMode.WEEK));
            }
                break;
            case DisplayMode.MONTH: {
                dispatch(setDisplayMode(DisplayMode.MONTH));
            }
                break;
        }
    };

    return (
        <div>

            <Header year={currentDate.year} month={currentDate.month} day={currentDate.day} handleSwitcher={handleSwitcher} handleDisplaySwitcher={handleDisplaySwitcher} />
            <WeekTitle />
            <DayBlocks tasks={new Map(Object.entries(tasksMap))} displayMode={displayMode} />

        </div>
    );
};

const WeekTitle = () => {
    const dayTitle: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const currentDay = new Date().getDay();
    return (
        <div className="flex justify-around items-center">
            {dayTitle.map((day, index) => {
                return (
                    <div key={index} className={`flex justify-center items-center w-full h-8 text-[16px] mx-1.5 bg-gray-200 rounded-sm`}>{day}</div>
                );
            })}
        </div>
    );
};


const DayBlocks = ({ tasks, displayMode }: DayTasksProps) => {

    const navigate = useNavigate();

    const handleClick = (date: string) => {
        navigate('/task', { state: { date: date } });
    };

    return (
        <>
            {
                displayMode === DisplayMode.WEEK ?
                    <div className="flex justify-around items-start gap-1 h-[75vh] mt-2">
                        {Array.from(tasks.entries()).map(([date, daytasks]) => (
                            <div className={`flex flex-col justify-start items-start bg-gray-100 w-full h-full rounded-sm ${date === new Date().toDateString() ? "border border-gray-400" : ""}`} key={date}
                                onClick={() => handleClick(date)}>
                                <div className="w-full text-center">{date === new Date().toDateString() ? "Today" : new Date(date).toLocaleDateString('en-US', { day: 'numeric' })}</div>
                                <div className='my-2 ml-2 mr-1 overflow-y-auto'>
                                    {
                                        daytasks.map((task, index) => (
                                            <TaskItem key={index} dataItem={task} />
                                        ))
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div className="grid grid-cols-7 grid-rows-6 gap-1 h-[75vh] mt-2">
                        {Array.from(tasks.entries()).map(([date, daytasks]) => (
                            <div className={`flex flex-col justify-start items-start w-full h-full bg-gray-100 rounded-sm ${date === new Date().toDateString() ? "border border-gray-400" : ""}`} key={date}
                                onClick={() => handleClick(date)}>
                                <div className="w-full text-center">{date === new Date().toDateString() ? "Today" : new Date(date).toLocaleDateString('en-US', { day: 'numeric' })}</div>
                                <div className='my-2 ml-2 mr-1 overflow-y-auto'>
                                    {
                                        daytasks.map((task, index) => (
                                            <TaskItem key={index} dataItem={task} />
                                        ))
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
            }
        </>
    );
};

const TaskItem = ({ dataItem }: TaskItemProps) => {
    return (
        <div className='flex justify-start items-center mt-2 mr-1 max-h-10'>
            <img src={dataItem.important ? star_selected : star_unselected} className='w-4' alt='important'></img>
            <div className={`ml-1.5 line-clamp-2 ${dataItem.checked ? 'line-through text-gray-500' : ''}`}>{dataItem.name}</div>
        </div>
    );
};

const Header = ({ year, month, day, handleSwitcher, handleDisplaySwitcher }: HeaderProps) => {
    return (
        <div className='flex justify-between items-center mb-4 ml-1'>
            <div className="text-2xl">{month} {year}</div>
            <DirectionSwitcher onGoBack={() => handleSwitcher("goBack")} onGoForward={() => handleSwitcher("goForward")} onToday={() => handleSwitcher("today")} />
            <DisplaySwitcher onList={() => handleDisplaySwitcher(DisplayMode.WEEK)} onGrid={() => handleDisplaySwitcher(DisplayMode.MONTH)} />
        </div>
    );
};

const DirectionSwitcher = ({ onGoBack, onGoForward, onToday }: SwitcherProps) => {
    return (
        <div className='flex justify-center items-center'>
            <div onClick={onGoBack} className='w-10 h-8 border border-gray-400 hover:border-gray-950 rounded-md flex justify-center items-center mx-2'>
                <img src={goBack} className='w-4' alt='go back'></img>
            </div>
            <div onClick={onToday} className='w-auto h-8 border border-gray-400 hover:border-gray-950 rounded-md flex justify-center items-center mx-1 px-2'>
                <span>Today</span>
            </div>
            <div onClick={onGoForward} className='w-10 h-8 border border-gray-400 hover:border-gray-950 rounded-md flex justify-center items-center mx-2'>
                <img src={goForward} className='w-4' alt='go forward'></img>
            </div>
        </div>
    );
};

const DisplaySwitcher = ({ onList, onGrid }: DisplaySwitcherProps) => {
    const calendarState = useAppSelector(selectCalendarState);
    const { displayMode } = calendarState;
    return (
        <div className='flex justify-center items-center ml-5'>
            <div onClick={onGrid} className={`w-auto h-8 border border-gray-400 hover:border-gray-950 hover:border-1 flex justify-center items-center px-2 rounded-l-md ${displayMode === DisplayMode.MONTH ? "bg-gray-600 text-white" : ""}`}>
                <span>Month</span>
            </div>
            <div onClick={onList} className={`w-auto h-8 border border-l-0 border-gray-400 hover:border-gray-950 hover:border-1 flex justify-center items-center px-2 rounded-r-md ${displayMode === DisplayMode.WEEK ? "bg-gray-600 text-white" : ""}`}>
                <span>Week</span>
            </div>
        </div>
    );
};
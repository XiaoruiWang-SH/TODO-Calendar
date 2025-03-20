/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-17 15:15:11
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-20 11:31:15
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { DisplayMode } from '../../features/calendar/calendarSlice';
import { CurrentDateProps } from './Calendar.types';


enum NumberDaysForMonth {
    JANUARY = 31,
    FEBRUARY = 28,
    MARCH = 31,
    APRIL = 30,
    MAY = 31,
    JUNE = 30,
    JULY = 31,
    AUGUST = 31,
    SEPTEMBER = 30,
    OCTOBER = 31,
    NOVEMBER = 30,
    DECEMBER = 31
}

export const getToday = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};


export const getCurrentDate = (): CurrentDateProps => {
    const today = new Date();
    return {
        year: today.getFullYear().toString(),
        month: today.toLocaleString("en-US", { month: "short" }), // "Feb",
        day: today.getDate().toString()
    };
};

export const getCurrentRangeDatesArray = (displayMode: DisplayMode): Date[] => {
    let rangeDates: Date[] = [];
    const today = new Date();

    switch (displayMode) {
        case DisplayMode.WEEK:
            {
                const monday = new Date(today);
                // Get the previous Monday (1 = Monday, so we subtract until we get to Monday)
                const daysSinceMonday = today.getDay() === 0 ? 6 : today.getDay() - 1;
                monday.setDate(today.getDate() - daysSinceMonday);

                const dates: Date[] = [];
                for (let i = 0; i < 7; i++) {
                    const day = new Date(monday);
                    day.setDate(monday.getDate() + i);
                    dates.push(day);
                }
                rangeDates = dates;
            }
            break;
        case DisplayMode.MONTH:
            {
                const monthUpperCase = today.toLocaleString('en-US', { month: 'long' }).toUpperCase();
                const numberOfDays = NumberDaysForMonth[monthUpperCase as keyof typeof NumberDaysForMonth];

                const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                const dates: Date[] = [];
                for (let i = 0; i < numberOfDays; i++) {
                    const day = new Date(firstDayOfMonth);
                    day.setDate(firstDayOfMonth.getDate() + i);
                    dates.push(day);
                }
                rangeDates = dates;
            }
            break;
    }
    return rangeDates;
};

export const getLastRangeDatesArray = (currentRangeDates: Date[], displayMode: DisplayMode): Date[] => {

    const lastRangeDates: Date[] = [];

    switch (displayMode) {
        case DisplayMode.WEEK:
            {
                for (let i = 0; i < 7; i++) {
                    const day = new Date(currentRangeDates[i]);
                    day.setDate(currentRangeDates[i].getDate() - 7);
                    lastRangeDates.push(day);
                }
            }
            break;
        case DisplayMode.MONTH:
            {
                const firstDayOfCurrentMonth = new Date(currentRangeDates[0]);
                // Get the first day of the previous month
                const firstDayOfLastMonth = new Date(firstDayOfCurrentMonth.getFullYear(), firstDayOfCurrentMonth.getMonth() - 1, 1);
                
                // Get the month name in uppercase for the previous month
                const lastMonthUpperCase = firstDayOfLastMonth.toLocaleString('en-US', { month: 'long' }).toUpperCase();
                const numberOfDays = NumberDaysForMonth[lastMonthUpperCase as keyof typeof NumberDaysForMonth];

                // Generate array for all days in the previous month
                for (let i = 0; i < numberOfDays; i++) {
                    const day = new Date(firstDayOfLastMonth);
                    day.setDate(firstDayOfLastMonth.getDate() + i);
                    lastRangeDates.push(day);
                }
            }
            break;
    }
    return lastRangeDates;
}

export const getNextRangeDatesArray = (currentRangeDates: Date[], displayMode: DisplayMode): Date[] => {
    const nextRangeDates: Date[] = [];

    switch (displayMode) {
        case DisplayMode.WEEK:
            {
                for (let i = 0; i < 7; i++) {
                    const day = new Date(currentRangeDates[i]);
                    day.setDate(currentRangeDates[i].getDate() + 7);
                    nextRangeDates.push(day);
                }
            }
            break;
        case DisplayMode.MONTH:
            {
                const firstDayOfCurrentMonth = new Date(currentRangeDates[0]);
                // Get the first day of the next month
                const firstDayOfNextMonth = new Date(firstDayOfCurrentMonth.getFullYear(), firstDayOfCurrentMonth.getMonth() + 1, 1);
                
                // Get the month name in uppercase for the next month
                const nextMonthUpperCase = firstDayOfNextMonth.toLocaleString('en-US', { month: 'long' }).toUpperCase();
                const numberOfDays = NumberDaysForMonth[nextMonthUpperCase as keyof typeof NumberDaysForMonth];

                // Generate array for all days in the next month
                for (let i = 0; i < numberOfDays; i++) {
                    const day = new Date(firstDayOfNextMonth);
                    day.setDate(firstDayOfNextMonth.getDate() + i);
                    nextRangeDates.push(day);
                }
            }
            break;
    }
    return nextRangeDates;
}

export const complementMonthDiaplayDates = (dates: Date[], displayMode: DisplayMode) => {
    if (displayMode !== DisplayMode.MONTH) {
        return dates;
    }
    const newDates: Date[] = [...dates];  // Create a new array by spreading the input dates
    const firstDayOfMonth = new Date(dates[0]);
    const lastDayOfMonth = new Date(dates[dates.length - 1]);
    
    // Add dates before the first day of the month
    const daysSinceMonday = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
    for (let i = 1; i <= daysSinceMonday; i++) {
        const day = new Date(firstDayOfMonth);
        day.setDate(firstDayOfMonth.getDate() - i);
        newDates.unshift(day);
    }

    // Add dates after the last day of the month
    const dayToSunday = lastDayOfMonth.getDay() === 0 ? 0 : 7 - lastDayOfMonth.getDay();
    for (let i = 1; i <= dayToSunday; i++) {
        const day = new Date(lastDayOfMonth);
        day.setDate(lastDayOfMonth.getDate() + i);
        newDates.push(day);
    }

    if (newDates.length !== 42) {
        const lastDayOfRange = newDates[newDates.length - 1];
        for (let i = 1; i <= 7; i++) {
            const day = new Date(lastDayOfRange);
            day.setDate(lastDayOfRange.getDate() + i);
            newDates.push(day);
        }
    }
    
    return newDates;
}
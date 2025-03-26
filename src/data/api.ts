/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-17 16:49:10
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-26 21:38:20
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import axios, { AxiosError } from "axios";
import { ItemData } from "./ItemData";
import moment from "moment";

const API_URL = "http://localhost:8080/api/tasks";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
}

export const getItems = async (): Promise<ItemData[]> => {
    try {
        const response = await axios.get<ItemData[]>(`${API_URL}`);
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error("Failed to fetch items");
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error fetching items:", axiosError.message);
        throw new Error(`Failed to fetch items: ${axiosError.message}`);
    }
};

export const addItem = async (item: ItemData): Promise<number> => {
    const purgedItem = {
        name: item.name,
        checked: item.checked,
        important: item.important,
        createTime: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
        expireTime: item.expireTime ? moment(item.expireTime).format('YYYY-MM-DD HH:mm:ss') : null,
        updateTime: moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss'),
        createDate: moment(item.createDate).format('YYYY-MM-DD')
    };

    console.log(purgedItem);

    try {
        const response = await axios.post<number>(`${API_URL}`, purgedItem);
        
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error("Failed to add item");
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ItemData>;
            if (axiosError.response?.data) {
                throw new Error("Failed to add item");
            }
            throw new Error(`Network error: ${axiosError.message}`);
        }
        throw error;
    }
};

export const updateItem = async (item: ItemData): Promise<ItemData> => {
    const purgedItem = {
        name: item.name,
        checked: item.checked,
        important: item.important,
        updateTime: moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss'),
        expireTime: item.expireTime ? moment(item.expireTime).format('YYYY-MM-DD HH:mm:ss') : null,
        createDate: moment(item.createDate).format('YYYY-MM-DD'),
        createTime: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
    };
    try {
        const response = await axios.post<ItemData>(`${API_URL}/${item.id}`, purgedItem);
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error("Failed to update item");
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error updating item:", axiosError.message);
        throw new Error(`Failed to update item: ${axiosError.message}`);
    }
};

export const getItemsByDate = async (date: Date): Promise<ItemData[]> => {
    try {
        const response = await axios.get<ItemData[]>(`${API_URL}?date=${moment(date).format('YYYY-MM-DD')}`);
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error("Failed to fetch items by day");
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error fetching items by day:", axiosError.message);
        throw new Error(`Failed to fetch items by day: ${axiosError.message}`);
    }
};


export const getItemsByDayRange = async (startDate: Date, endDate: Date): Promise<ItemData[]> => {
    try {
        const response = await axios.get<ItemData[]>(`${API_URL}?startDate=${moment(startDate).format('YYYY-MM-DD HH:mm:ss')}&endDate=${moment(endDate).format('YYYY-MM-DD HH:mm:ss')}`);
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error("Failed to fetch items by day range");
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error fetching items by day range:", axiosError.message);
        throw new Error(`Failed to fetch items by day range: ${axiosError.message}`);
    }
};

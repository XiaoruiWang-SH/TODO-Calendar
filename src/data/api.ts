/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-17 16:49:10
 * @LastEditors: Xiaorui Wang
    * @LastEditTime: 2025-03-18 15:51:26
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import axios, { AxiosError } from "axios";
import { ItemData } from "./ItemData";

const API_URL = "http://localhost:3030";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
}

export const getItems = async (): Promise<ItemData[]> => {
    try {
        const response = await axios.get<ApiResponse<ItemData[]>>(`${API_URL}/allitems`);
        if (response.data.success && response.data.data) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Failed to fetch items");
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error fetching items:", axiosError.message);
        throw new Error(`Failed to fetch items: ${axiosError.message}`);
    }
};

export const addItem = async (item: ItemData): Promise<ItemData> => {
    const purgedItem = {
        name: item.name,
        checked: item.checked,
        important: item.important,
        createTime: item.createTime,
        expireTime: item.expireTime,
        updateTime: item.updateTime
    };

    try {
        const response = await axios.post<ApiResponse<ItemData>>(`${API_URL}/additem`, purgedItem);
        
        if (response.data.success && response.data.data) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Failed to add item");
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ApiResponse<ItemData>>;
            if (axiosError.response?.data) {
                throw new Error(axiosError.response.data.message || "Failed to add item");
            }
            throw new Error(`Network error: ${axiosError.message}`);
        }
        throw error;
    }
};


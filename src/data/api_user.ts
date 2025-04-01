/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-17 16:49:10
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-29 09:18:04
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import axios, { AxiosError } from "axios";
import { ItemData } from "./ItemData";
import moment from "moment";

const API_URL = "http://api.todocalendar.live/api/users";
// const API_URL = "http://140.238.222.115:8080/api/users";

export interface UserData {
    id: number;
    name: string;
    email: string;
    password: string;
}

export const getUsers = async (): Promise<UserData[]> => {
    try {
        const response = await axios.get<UserData[]>(`${API_URL}`);
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

export const addUser = async (user: UserData): Promise<number> => {
    try {
        const response = await axios.post<number>(`${API_URL}/register`, user);
        
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

export const updateUser = async (user: UserData): Promise<number> => {
    try {
        const response = await axios.post<number>(`${API_URL}/${user.id}`, user);
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

export const login = async (email: string, password: string): Promise<UserData> => {
    try {
        const response = await axios.post<UserData>(`${API_URL}/user`, { email, password });
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error("Failed to login");
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error logging in:", axiosError.message);
        throw new Error(`Failed to login: ${axiosError.message}`);
    }
};

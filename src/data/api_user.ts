/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-17 16:49:10
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-08 07:20:59
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import axios, { AxiosError } from "axios";
import { ItemData } from "./ItemData";
import moment from "moment";
import { axiosInstance, HttpResponse, transformResponse, transformError } from "./api";


const API_URL = "/api/users";

export interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
}

export const getUsers = async (): Promise<HttpResponse<UserData[]>> => {
    try {
        const response = await axiosInstance.get<UserData[]>(`${API_URL}`);
        const userResponse = transformResponse<UserData[]>(response);
        if (!userResponse.success) {
            return userResponse;
        }
        return userResponse;
    } catch (error) {
        return transformError<UserData[]>(error);
    }
};


export const updateUser = async (user: UserData): Promise<HttpResponse<Number>> => {
    try {
        const response = await axiosInstance.post<number>(`${API_URL}/${user.id}`, user);
        const userResponse = transformResponse<number>(response);
        if (!userResponse.success) {
            return userResponse;
        }
        return userResponse;
    } catch (error) {
        return transformError<number>(error);
    }
};

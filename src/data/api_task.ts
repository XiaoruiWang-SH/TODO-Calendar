/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-17 16:49:10
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-14 15:39:19
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import axios, { AxiosError } from "axios";
import { ItemData } from "./ItemData";
import moment from "moment";
import env from "../config/env";
import { HttpResponse, axiosInstance, transformResponse, transformError } from "./api";

const API_URL = "/api/tasks";

export const addItem = async (item: ItemData): Promise<HttpResponse<number>> => {
    const purgedItem = {
        title: item.title,
        details: item.details,
        checked: item.checked,
        important: item.important,
        createTime: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
        expireTime: item.expireTime ? moment(item.expireTime).format('YYYY-MM-DD HH:mm:ss') : null,
        updateTime: moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss'),
        createDate: moment(item.createDate).format('YYYY-MM-DD')
    };

    console.log(purgedItem);

    try {
        const response = await axiosInstance.post<number>(`${API_URL}/create`, purgedItem);
        const userResponse = transformResponse<number>(response);
        return userResponse;
    } catch (error) {
        return transformError<number>(error);
    }
};

export const updateItem = async (item: ItemData): Promise<HttpResponse<string>> => {
    const purgedItem = {
        title: item.title,
        details: item.details,
        checked: item.checked,
        important: item.important,
        updateTime: moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss'),
        expireTime: item.expireTime ? moment(item.expireTime).format('YYYY-MM-DD HH:mm:ss') : null,
        createDate: moment(item.createDate).format('YYYY-MM-DD'),
        createTime: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
    };
    try {
        const response = await axiosInstance.post<string>(`${API_URL}/update/${item.id}`, purgedItem);
        const userResponse = transformResponse<string>(response);
        return userResponse;       
    } catch (error) {
        return transformError<string>(error);
    }
};

export const getItemsByDate = async (date: Date): Promise<HttpResponse<ItemData[]>> => {
    try {
        const response = await axiosInstance.post<ItemData[]>(`${API_URL}`, {
            date: moment(date).format('YYYY-MM-DD')
        });
        const userResponse = transformResponse<ItemData[]>(response);
        if (!userResponse.success) {
            return userResponse;
        }
        if (!userResponse.data
            || !Array.isArray(userResponse.data)
        ) {
            userResponse.success = false;
            userResponse.message = "Request succeeded but no data received";
        }
        return userResponse;
    } catch (error) {
        return transformError<ItemData[]>(error);
    }
};

export const getItemsByDayRange = async (startDate: Date, endDate: Date): Promise<HttpResponse<ItemData[]>> => {
    try {
        const response = await axiosInstance.post<ItemData[]>(`${API_URL}`, {
            startDate: moment(startDate).format('YYYY-MM-DD HH:mm:ss'),
            endDate: moment(endDate).format('YYYY-MM-DD HH:mm:ss')
        });
        const userResponse = transformResponse<ItemData[]>(response);
        if (!userResponse.success) {
            return userResponse;
        }
        if (!userResponse.data
            || !Array.isArray(userResponse.data)
        ) {
            userResponse.success = false;
            userResponse.message = "Request succeeded but no data received";
        }
        return userResponse;
    } catch (error) {
        return transformError<ItemData[]>(error);
    }
};

export const deleteItem = async (item: ItemData): Promise<HttpResponse<string>> => {
    try {
        const response = await axiosInstance.post<string>(`${API_URL}/delete/${item.id}`);
        const userResponse = transformResponse<string>(response);
        return userResponse;
    } catch (error) {
        return transformError<string>(error);
    }
};

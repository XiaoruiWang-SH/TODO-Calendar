/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-04-06 08:26:37
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-06 15:29:25
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import axios, { AxiosError } from "axios";
import { ItemData } from "./ItemData";
import moment from "moment";
import env from "../config/env";

const API_URL = env.API_HOST + "/api/auth";

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterResponse {
    accessToken: string;
    expiresIn: number;
}

export interface AuthResponse {
    success: boolean;
    status: number;
    message: string;
    data: RegisterResponse | null;
}

export const register = async (user: RegisterData): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${API_URL}/register`, user);
        const authResponse = {
            success: true,
            status: response.status,
            message: "Registration succeeded",
            data: response.data
        }
        
        if (!response.data 
            || typeof response.data !== 'object' 
            || !('accessToken' in response.data) 
            || !('expiresIn' in response.data)) {
            authResponse.success = false;
            authResponse.message = "Registration succeeded but no data received";  
        } 
        return authResponse;
    } catch (error) {
        const authResponse = {
            success: false,
            status: 500,
            message: "Registration failed",
            data: null
        }
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<string>;
            if (axiosError.response) {
                authResponse.status = axiosError.response.status;
                authResponse.message = axiosError.response.data;
            }
        }
        return authResponse;
    }
};


export const login = async (user: LoginData): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${API_URL}/login`, user, {
            withCredentials: true
        });
        const authResponse = {
            success: true,
            status: response.status,
            message: "Login succeeded",
            data: response.data
        }
        if (!response.data 
            || typeof response.data !== 'object' 
            || !('accessToken' in response.data) 
            || !('expiresIn' in response.data)) {
            authResponse.success = false;
            authResponse.message = "Login succeeded but no data received";  
        } 
        return authResponse;
    } catch (error) {
        const authResponse = {
            success: false,
            status: 500,
            message: "Login failed",
            data: null
        }
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<string>;
            if (axiosError.response) {
                authResponse.status = axiosError.response.status;
                authResponse.message = axiosError.response.data;
            }
        }
        return authResponse;
    }
}


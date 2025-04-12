/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-04-06 08:26:37
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-12 17:22:08
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import axios, { AxiosError } from "axios";
import { HttpResponse, axiosInstance, transformResponse, transformError } from "./api";
import { UserData } from "./api_user";


const API_URL = "/api/auth";
const OAUTH_URL = "/api/oauth2";

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}


export const register = async (user: RegisterData): Promise<HttpResponse<UserData>> => {
    try {
        const response = await axiosInstance.post(`${API_URL}/register`, user);
        const authResponse = transformResponse<UserData>(response);
        if (!authResponse.success) {
            return authResponse;
        }
        
        if (!authResponse.data 
            || typeof authResponse.data !== 'object' 
            || !('id' in authResponse.data) 
            || !('name' in authResponse.data)
            || !('email' in authResponse.data)
            || !('role' in authResponse.data)) {
            authResponse.success = false;
            authResponse.message = "Registration succeeded but no data received";  
        } 
        return authResponse;
    } catch (error) {
        return transformError<UserData>(error);
    }
};


export const login = async (user: LoginData): Promise<HttpResponse<UserData>> => {
    try {
        const response = await axiosInstance.post(`${API_URL}/login`, user);
        const authResponse = transformResponse<UserData>(response);
        if (!authResponse.success) {
            return authResponse;
        }
        
        if (!authResponse.data 
            || typeof authResponse.data !== 'object' 
            || !('id' in authResponse.data) 
            || !('name' in authResponse.data)
            || !('email' in authResponse.data)
            || !('role' in authResponse.data)) {
            authResponse.success = false;
            authResponse.message = "Login succeeded but no data received";  
        } 
        return authResponse;
    } catch (error) {
        return transformError<UserData>(error);
    }
}

export const logout = async (): Promise<HttpResponse<boolean>> => {
    try {
        const response = await axiosInstance.post(`${API_URL}/logout`);
        const authResponse = transformResponse<boolean>(response);
        return authResponse;
    } catch (error) {
        return transformError<boolean>(error);
    }
}

export const loginWithGoogle = async (): Promise<HttpResponse<any>> => {
    try {
        console.log('Starting Google login flow');
        // Instead of using axios which creates CORS issues with OAuth redirects,
        // directly open the authorization URL in a new window or redirect
        const authUrl = `${window.location.origin}/api/oauth2/authorize`;
        console.log('Redirecting to:', authUrl);
        
        // Redirect the browser to the auth page
        window.location.href = authUrl;
        
        // Return a success response
        return {
            success: true,
            data: { redirectUrl: authUrl },
            message: 'Redirecting to Google OAuth',
            status: 302
        };
    } catch (error) {
        console.error('Google login error:', error);
        return transformError<UserData>(error);
    }
}


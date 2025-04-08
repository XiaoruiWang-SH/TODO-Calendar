/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-04-07 14:35:33
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-07 15:00:42
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import axios, { AxiosError } from "axios";
import env from '../config/env';

export interface HttpResponse<T> {
    success: boolean;
    status: number;
    message: string;
    data: T | null;
}


// Create a custom axios instance with default configuration
export const axiosInstance = axios.create({
  baseURL: env.API_HOST,
  withCredentials: true, // Set withCredentials globally
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add token here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Process data if needed but return the original response
    return response;
  },
  (error) => {
    // Handle global error responses (e.g., 401 Unauthorized)
    return Promise.reject(error);
  }
);

// Helper function to transform Axios response to HttpResponse
export const transformResponse = <T>(response: any): HttpResponse<T> => {
    const httpResponse: HttpResponse<T> = {
        success: true,
        status: response.status,
        message: "Request succeeded",
        data: response.data
    };
    if (!response.data ) {
        httpResponse.success = false;
        httpResponse.message = "Request succeeded but no data received";
    }
    return httpResponse;
};

export const transformError = <T>(error: any): HttpResponse<T> => {
    const errorResponse = {
        success: false,
        status: 500,
        message: "Request failed",
        data: null
    }
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<string>;
        if (axiosError.response) {
            errorResponse.status = axiosError.response.status;
            errorResponse.message = axiosError.response.data;
        }
    }
    return errorResponse;
  };

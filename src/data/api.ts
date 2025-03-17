/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-17 16:49:10
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-17 16:51:20
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import axios from "axios";
import { ItemData } from "./ItemData";

const API_URL = "http://localhost:3030";

export const getItems = async () => {

    try {
        const response = await axios.get(`${API_URL}/allitems`);
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
};

export const addItem = async (item: ItemData) => {
    try {
        const response = await axios.post(`${API_URL}/additem`, item);
        return response.data;
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
};


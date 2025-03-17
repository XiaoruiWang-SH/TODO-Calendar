/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-17 17:12:20
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

export interface ItemData {
    taskId: number;
    name: string;
    checked: boolean;
    important: boolean;
    createTime: string;
    expireTime: string | null;
    updateTime: string;
}

export const isExpired = (taskItem:ItemData): boolean => {
    if (!taskItem.expireTime) {
        return false;
    }
    const expireTime = new Date(taskItem.expireTime);
    return expireTime < new Date();
}

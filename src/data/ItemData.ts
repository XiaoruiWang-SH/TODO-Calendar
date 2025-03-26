/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-26 17:34:57
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

export interface ItemData {
    id: number;
    name: string;
    checked: boolean;
    important: boolean;
    createTime: string;
    expireTime: string | null;
    updateTime: string;
    createDate: string;
}

export const isExpired = (taskItem:ItemData): boolean => {
    if (!taskItem.expireTime) {
        return false;
    }
    const expireTime = new Date(taskItem.expireTime);
    return expireTime < new Date();
}

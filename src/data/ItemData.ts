/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-08 09:45:45
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

/**
 * public class Task {
    private int id;
    private String title;
    private String details;
    private boolean checked;
    private boolean important;
    private String createTime;
    private String expireTime;
    private String updateTime;
    private String createDate;
    private String userName;

}
 */
export interface ItemData {
    id: number;
    title: string;
    details: string;
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

/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 10:48:47
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-13 12:06:08
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */


export default class ItemData {
    public id: number;
    public name: string;
    public checked: boolean;
    public important: boolean;
    public createTime: Date;
    public expireTime: Date | null;
    public updateTime: Date;

    constructor(id: number, name: string, checked: boolean, important: boolean, createTime: Date, expireTime: Date | null, updateTime: Date) {
        this.id = id;
        this.name = name;
        this.checked = checked;
        this.important = important;
        this.createTime = createTime;
        this.expireTime = expireTime;
        this.updateTime = updateTime;
    }

    public setChecked(checked: boolean): void {
        this.checked = checked;
    }

    public setImportant(important: boolean): void {
        this.important = important;
    }

    public setExpireTime(expireTime: Date): void {
        this.expireTime = expireTime;
    }

    public setUpdateTime(updateTime: Date): void {
        this.updateTime = updateTime;
    }

    public isExpired(): boolean {
        if (!this.expireTime) {
            return false;
        }
        else {
            return this.expireTime < new Date();
        }
    }

};

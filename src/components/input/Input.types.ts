/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 16:45:32
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-13 16:45:39
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

export interface ComponentInputProps {
    task: string;
    handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
    handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}
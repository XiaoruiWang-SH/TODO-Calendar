/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-13 11:12:52
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-03-18 16:00:56
 * @Description: 
 * 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */

import { ItemData } from '../../data/ItemData';

export interface ListItemProps {
    item: ItemData;
    taskChange: (item: ItemData) => void;
    handleImportanceChange: (item: ItemData) => void;
}

export interface ItemChangeProps {
    change: boolean;
    handleChange: (e: React.MouseEvent) => void;
}

export interface ComponentCompleteHeaderProps {
    num: number;
    hiden: boolean;
    listShowClick: () => void;
}

export interface ListProps {
    day: string;
}
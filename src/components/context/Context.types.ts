import { ReactNode } from 'react';
import ItemData from '../../data/ItemData';

export interface DataAction {
    type: string;
    id: number;
    task: ItemData;
} 

export interface DataContextType {
    tasks: ItemData[];
    dispatch: React.Dispatch<DataAction>;
}

export interface TasksProviderProps {
    children: ReactNode;
}
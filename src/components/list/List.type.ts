import ItemData from '../../data/ItemData';

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
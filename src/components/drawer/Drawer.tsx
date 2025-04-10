/*
 * @Author: Xiaorui Wang
 * @Email: xiaorui.wang@usi.ch
 * @Date: 2025-03-21 11:29:33
 * @LastEditors: Xiaorui Wang
 * @LastEditTime: 2025-04-10 09:05:30
 * @Description: 
 * Copyright (c) 2025 by Xiaorui Wang, All Rights Reserved. 
 */
import React, { useEffect, useRef } from 'react';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    position?: 'left' | 'right';
    width?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
    isOpen,
    onClose,
    children,
    position = 'left',
    width = '300px'
}) => {
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40
                    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            >

                {/* Drawer */}
                <div
                    ref={drawerRef}
                    className={`fixed top-0 ${position}-0 h-full bg-white shadow-lg transform transition-transform z-50
                    ${isOpen ? 'translate-x-0' : position === 'left' ? '-translate-x-full' : 'translate-x-full'}`}
                    style={{ width }}
                >
                    <div className="h-full overflow-y-auto">
                        <div className="p-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}; 
import React, { MouseEvent, ReactNode } from 'react';
import './SideBarIcon.css'

interface SideBarIconProps {
    icon: ReactNode;
    text: string;
    onClick?: (text?: string, event?: MouseEvent) => void;
    onDoubleClick?: (text?: string, event?: MouseEvent) => void;
}

const SideBarIcon = ({ icon, text, onClick, onDoubleClick }: SideBarIconProps) => (
    <div className="sidebar-icon group" onClick={(event) => onClick && onClick(text, event)} onDoubleClick={(event) => onDoubleClick && onDoubleClick(text, event)}>
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
);

export default SideBarIcon;
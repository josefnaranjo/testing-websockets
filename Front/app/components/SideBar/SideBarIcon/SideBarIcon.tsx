import React, { MouseEvent, ReactNode } from 'react';
import './SideBarIcon.css';

interface SideBarIconProps {
    icon?: ReactNode;
    text: string;
    onClick?: (text?: string, event?: MouseEvent) => void;
    onDoubleClick?: (text?: string, event?: MouseEvent) => void;
}

const SideBarIcon = ({ icon, text, onClick, onDoubleClick }: SideBarIconProps) => (
    <div className="sidebar-icon group" onClick={(event) => onClick && onClick(text, event)} onDoubleClick={(event) => onDoubleClick && onDoubleClick(text, event)}>
        {icon ? icon : <span className="text-xl font-bold">{text.charAt(0)}</span>}
        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
);

export default SideBarIcon;

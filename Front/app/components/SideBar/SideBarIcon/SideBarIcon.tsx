import React, { MouseEvent, ReactNode } from "react";
import "./SideBarIcon.css";

interface SideBarIconProps {
  icon?: ReactNode;
  text: string;
  onClick?: (text?: string, event?: MouseEvent<HTMLDivElement>) => void; // Updated type
  //   onDoubleClick?: (text?: string, event?: MouseEvent<HTMLDivElement>) => void; // Updated type
  onContextMenu?: (event: MouseEvent<HTMLDivElement>) => void; // Updated type
  className?: string;
}

const SideBarIcon = ({
  icon,
  text,
  onClick,
  //   onDoubleClick,
  onContextMenu,
  className,
}: SideBarIconProps) => (
  <div
    className={`sidebar-icon group ${className}`}
    onClick={(event) =>
      onClick && onClick(text, event as MouseEvent<HTMLDivElement>)
    } // Cast event type
    // onDoubleClick={(event) =>
    //   onDoubleClick && onDoubleClick(text, event as MouseEvent<HTMLDivElement>)
    // } // Cast event type
    onContextMenu={onContextMenu} // No need to cast, already correct
  >
    {icon ? icon : <span className="text-xl font-bold">{text? text.charAt(0) : '?'}</span>}
    <span className="sidebar-tooltip group-hover:scale-100">{text || 'Unknown'}</span>
  </div>
);

export default SideBarIcon;
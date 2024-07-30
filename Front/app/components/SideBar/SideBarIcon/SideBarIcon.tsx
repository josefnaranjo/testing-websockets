import React, { MouseEvent, ReactNode } from "react";
import "./SideBarIcon.css";

interface SideBarIconProps {
  icon?: ReactNode;
  text: string;
  onClick?: (text?: string, event?: MouseEvent<HTMLDivElement>) => void; // Updated type
  //   onDoubleClick?: (text?: string, event?: MouseEvent<HTMLDivElement>) => void; // Updated type
  onContextMenu?: (event: MouseEvent<HTMLDivElement>) => void; // Updated type
}

const SideBarIcon = ({
  icon,
  text,
  onClick,
  //   onDoubleClick,
  onContextMenu,
}: SideBarIconProps) => (
  <div
    className="sidebar-icon group"
    onClick={(event) =>
      onClick && onClick(text, event as MouseEvent<HTMLDivElement>)
    } // Cast event type
    // onDoubleClick={(event) =>
    //   onDoubleClick && onDoubleClick(text, event as MouseEvent<HTMLDivElement>)
    // } // Cast event type
    onContextMenu={onContextMenu} // No need to cast, already correct
  >
    {icon ? icon : <span className="text-xl font-bold">{text.charAt(0)}</span>}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);

export default SideBarIcon;

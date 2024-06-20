import React, { MouseEvent, useRef, useEffect, RefObject } from "react";
import Divider from "../Divider/Divider";
import "./Popup.css";

interface PopupProps {
  server: string;
  onClose: () => void;
  onLeave: () => void;
  onEdit: () => void;
  isEditing: boolean;
  newServerName: string;
  setNewServerName: (name: string) => void;
  handleEditServerName: () => void;
  position: { x: number; y: number };
  ref?: RefObject<HTMLDivElement>; // Added the ref property to the interface
}

const offsetX = 40;
const offsetY = -60;

const Popup = ({
  server,
  onClose,
  onLeave,
  onEdit,
  isEditing,
  newServerName,
  setNewServerName,
  handleEditServerName,
  position,
  ref, // Added ref to the destructured props
}: PopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener
      );
    };
  }, [onClose]);

  return (
    <div
      className="popup"
      style={{
        top: position.y + offsetY,
        left: position.x + offsetX,
        position: "absolute",
      }}
      ref={ref || popupRef} // Use the provided ref if available, otherwise use the local ref
      onClick={onClose}
    >
      <ul className="popup-list" onClick={(e) => e.stopPropagation()}>
        {isEditing ? (
          <li className="popup-item">
            <input
              className="w-full rounded-lg pl-2"
              type="text"
              value={newServerName}
              onChange={(e) => setNewServerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEditServerName();
              }}
            />
          </li>
        ) : (
          <li className="popup-item" onClick={onEdit}>
            Edit Name of {server}
          </li>
        )}
        <Divider />
        <li className="popup-item">Invite Member to {server}</li>
        <Divider />
        <li className="popup-item">Edit Member of {server}</li>
        <Divider />
        <button className="popup-item leave" onClick={onLeave}>
          Leave {server}
        </button>
      </ul>
    </div>
  );
};

export default Popup;

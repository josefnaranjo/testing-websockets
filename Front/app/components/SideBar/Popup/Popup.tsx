import React, { MouseEvent, useRef, useEffect, RefObject, useState } from "react";
import Divider from "../Divider/Divider";
import "./Popup.css";

interface PopupProps {
  serverId: string; // Changed from server to serverId
  serverName: string; // Add serverName if you still need to display the name
  onDelete: () => void;
  onClose: () => void;
  onLeave: () => void;
  onEdit: () => void;
  isEditing: boolean;
  newServerName: string;
  setNewServerName: (name: string) => void;
  handleEditServerName: () => void;
  position: { x: number; y: number };
  inviteCode: string; // invite code to retrieve
  ref?: RefObject<HTMLDivElement>; // Added the ref property to the interface
}

const offsetX = 40;
const offsetY = -60;

const Popup = ({
  serverId, // Changed from server to serverId
  serverName, // Added serverName for displaying the name
  onDelete,
  onClose,
  onLeave,
  onEdit,
  isEditing,
  newServerName,
  setNewServerName,
  handleEditServerName,
  position,
  inviteCode, // invite code to retrieve
  ref, // Added ref to the destructured props
}: PopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [isAdmin, setIsAdmin] = useState<Boolean>(false);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await fetch(`/api/servers/${serverId}`)
        if (!response.ok) {
          throw new Error (`Failed to fetch server role: ${response.statusText}`);
        }
        const data = await response.json();
        const { role } = data
        setIsAdmin(role === "ADMIN");
      } catch (error) {
        console.error("Failed to fetch user role: ", error);
      };
    };
    checkUserRole();
  }, [serverId])

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

  const handleCopyInviteCode = async () => { // alerts the user through website alert that the code was copied (needs to work though)
    try {
      await navigator.clipboard.writeText(inviteCode);
      alert('Invite code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy invite code: ', err);
    }
  };

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
            Edit Name of {serverName}
          </li>
        )}
        <Divider />
        <li className="popup-item" onClick={handleCopyInviteCode}> {/* onClick should trigger the invite code retrieval */}
          Invite Friend to {serverName}
        </li>
        <Divider />
        <li className="popup-item">View {serverName} members</li>
        <Divider />
        <button className="popup-item leave" onClick={onLeave}>
          Leave {serverName}
        </button>
        {isAdmin && (
          <>
            <Divider />
            <button className="popup-item delete" onClick={onDelete}>
              Delete {serverName}
            </button>
          </>
        )}
      </ul>
    </div>
  );
};

export default Popup;
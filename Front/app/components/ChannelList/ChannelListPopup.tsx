import React, { useEffect, useRef, MouseEvent } from "react";
import "./ChannelListPopup.css";

interface PopupProps {
  position: { x: number; y: number };
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  ChannelType: "TEXT" | "VOICE";
}

const ChannelListPopup: React.FC<PopupProps> = ({
  position,
  onClose,
  onDelete,
  onEdit,
  ChannelType,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  // re-used some code from the sidebar pop up here
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

  // Offset constants so its below the channel
  const offsetX = -40;
  const offsetY = 30;

  return (
    <div
      ref={popupRef}
      className="popup-menu1"
      style={{
        top: position.y + offsetY,
        left: position.x + offsetX,
        position: "absolute",
      }}
      onClick={onClose}
    >
      <ul className="popup-menu1" onClick={(e) => e.stopPropagation()}>
        <li
          className="popup-item1 text-black hover:bg-zinc-200"
          onClick={onEdit}
        >
          Edit Name
        </li>
        <li
          className="popup-item1 text-rose-500 hover:bg-rose-200"
          onClick={onDelete}
        >
          Delete
        </li>
      </ul>
    </div>
  );
};

export default ChannelListPopup;
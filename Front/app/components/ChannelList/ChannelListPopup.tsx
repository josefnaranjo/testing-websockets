import React, { useEffect, useRef } from "react";
import "./ChannelListPopup.css";

interface PopupProps {
  position: { x: number; y: number };
  onClose: () => void;
  onDelete: () => void;
  ChannelType: "TEXT" | "VOICE";
}

const ChannelListPopup: React.FC<PopupProps> = ({
  position,
  onClose,
  onDelete,
  ChannelType,
}) => {
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      className="popup-menu1"
      style={{ top: position.y, left: position.x }}
    >
      <div className="popup-item1" onClick={onDelete}>
        Delete
      </div>
    </div>
  );
};

export default ChannelListPopup;

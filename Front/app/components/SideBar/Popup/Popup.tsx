import React, { MouseEvent } from 'react';
import Divider from '../Divider/Divider';
import './Popup.css';

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
    position
}: PopupProps) => (
    <div
        className="popup"
        style={{
            top: position.y + offsetY,
            left: position.x + offsetX,
            position: "absolute",
        }}
        onClick={onClose}
    >
        <ul className="popup-list" onClick={(e) => e.stopPropagation()}>
            {isEditing ? (
                <li className="popup-item">
                    <input 
                        className="w-full rounded-xl"
                        type="text" 
                        value={newServerName} 
                        onChange={(e) => setNewServerName(e.target.value)} 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleEditServerName();
                        }}
                    />
                </li>
            ) : (
                <li className="popup-item" onClick={onEdit}>Edit Name of {server}</li>
            )}
            <Divider />
            <li className="popup-item">Add Member to {server}</li>
            <Divider />
            <li className="popup-item">Edit Member of {server}</li>
            <Divider />
            <li className="popup-item">Change Picture of {server}</li>
            <Divider />
            <button className="popup-item leave" onClick={onLeave}>Leave {server}</button>
        </ul>
    </div>
);

export default Popup;

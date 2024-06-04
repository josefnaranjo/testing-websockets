import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import Divider from '../Divider/Divider';
import './SettingsPopup.css';

interface SettingsPopupProps {
    onClose: () => void;
    position: { x: number; y: number };
}

const offsetX = 40;
const offsetY = -60;

const SettingsPopup = ({ onClose, position }: SettingsPopupProps) => (
    <div
        className="popup"
        style={{
            top: position.y + offsetY,
            left: position.x + offsetX,
            position: "absolute",
        }}
        onClick={onClose}
    >
        <ul className="popup-list flex flex-col">
            <li className="popup-item flex justify-between w-auto">
                Account Details
                <FaExternalLinkAlt className="flex align-middle h-[10px]"/>
            </li>
            <Divider />
            <button
                onClick={async () => await signOut()}
                className="logout-button"
            >
                Logout
            </button>
        </ul>
    </div>
);

export default SettingsPopup;

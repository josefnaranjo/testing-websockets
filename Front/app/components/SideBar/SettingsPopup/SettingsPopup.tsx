import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { FaArrowRightToBracket } from "react-icons/fa6";

import { signOut } from 'next-auth/react';
import Divider from '../Divider/Divider';
import './SettingsPopup.css';

interface SettingsPopupProps {
    onClose: () => void;
    onAccountDetails: () => void; // Add the onAccountDetails prop
    position: { x: number; y: number };
}

const offsetX = 40;
const offsetY = -60;

const SettingsPopup = ({ onClose, onAccountDetails, position }: SettingsPopupProps) => (
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
            <li
                className="popup-item flex justify-between w-auto"
                onClick={(e) => {
                    e.stopPropagation();
                    onAccountDetails();
                }}
            >
                Account Details
                <FaArrowRightToBracket className="flex align-middle mt-1 ml-4"/>
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

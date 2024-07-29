import React, { RefObject, useEffect, useRef } from 'react';
import { FaArrowRightToBracket } from "react-icons/fa6";

import { signOut } from 'next-auth/react';
import Divider from '../Divider/Divider';
import './SettingsPopup.css';

interface SettingsPopupProps {
    onClose: () => void;
    onAccountDetails: () => void; // Add the onAccountDetails prop
    position: { x: number; y: number };
    ref?: RefObject<HTMLDivElement>; // Added the ref property to the interface
}

const offsetX = 40;
const offsetY = -60;

const SettingsPopup = ({ onClose, onAccountDetails, position, ref }: SettingsPopupProps ) => {
    const settingsPopupRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            settingsPopupRef.current &&
            !settingsPopupRef.current.contains(event.target as Node)
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
        ref={ref || settingsPopupRef}
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
    )
};

export default SettingsPopup;
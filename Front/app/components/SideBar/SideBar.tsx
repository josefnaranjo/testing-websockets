import React, { useState, MouseEvent, ReactNode } from 'react';
import { GiAmericanFootballBall } from "react-icons/gi";
import { IoIosAddCircle } from "react-icons/io";
import { PiPersonArmsSpreadDuotone, PiSoccerBallFill } from "react-icons/pi";
import { IoGameController } from "react-icons/io5";
import { BsGearFill } from "react-icons/bs";
import { FaExternalLinkAlt, FaCamera } from "react-icons/fa";
import { signOut } from "next-auth/react";

import "./SideBar.css";

interface SideBarIconProps {
    icon: ReactNode;
    text: string;
    onClick?: (text: string, event: MouseEvent) => void;
}

const SideBar = () => {
    const [selectedChannel, setSelectedChannel] = useState('');
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [popupVisible, setPopupVisible] = useState(false);
    const [settingsPopupVisible, setSettingsPopupVisible] = useState(false);
    const [AddPopupVisible, setAddPopupVisible] = useState(false);

    const handleIconClick = (channelName: string, event: MouseEvent) => {
        if (channelName === selectedChannel) {
            // Toggle the visibility of the popup menu
            setPopupVisible((prev) => !prev);
        } else if (channelName === "Settings") {
            const { clientX, clientY } = event;
            setPopupPosition({ x: clientX, y: clientY });
            setSettingsPopupVisible((prev) => !prev);
            setPopupVisible(false);
            setAddPopupVisible(false);
        } else if (channelName === "Add Channel") {
            const { clientX, clientY } = event;
            setPopupPosition({ x: clientX, y: clientY });
            setAddPopupVisible((prev) => !prev);
            setSettingsPopupVisible(false);
            setPopupVisible(false);
        } else {
            setSelectedChannel(channelName);
            // Calculate the position of the popup based on the mouse click
            const { clientX, clientY } = event;
            setPopupPosition({ x: clientX, y: clientY });
            setPopupVisible(true);
            setSettingsPopupVisible(false); // Close settings popup if channel icon is clicked
            setAddPopupVisible(false)
        }
    };
    

    // These handle clicking on the pop up themselves. They close the pop up if it detects a click
    const handleClosePopup = () => {
        setPopupVisible(false);
    };

    const handleCloseSettingsPopup = () => {
        setSettingsPopupVisible(false);
    };

    const handleCloseAddPopup = () => {
        setAddPopupVisible(false);
    };

    return (
        // This container  holds all of our channels and their respective pop ups. Later on could add better data and more functionality for adding.
        <div className='top-0 left-0 h-full w-[72px] m-0
            flex flex-col text-white shadow-lg sidebar-container'>
            <SideBarIcon 
                icon={<IoIosAddCircle size={"40px"} />} 
                text="Add Channel" 
                onClick={(text, event) => handleIconClick(text, event)}
            />
            <Divider />
            <SideBarIcon icon={<GiAmericanFootballBall size={"30px"} />} text="Football Friends" onClick={(text, event) => handleIconClick(text, event)} />
            <SideBarIcon icon={<PiSoccerBallFill size={"40px"} />} text="Soccer Saurians" onClick={(text, event) => handleIconClick(text, event)} />
            <SideBarIcon icon={<PiPersonArmsSpreadDuotone size={"30px"} />} text="Communication" onClick={(text, event) => handleIconClick(text, event)} />
            <SideBarIcon icon={<IoGameController size={"30px"} />} text="Gaming Group" onClick={(text, event) => handleIconClick(text, event)} />
            <Divider />
            <SideBarIcon
                icon={<BsGearFill size={"30px"} />}
                text="Settings"
                onClick={(text, event) => handleIconClick(text, event)}
            />
            {popupVisible && <Popup channel={selectedChannel} onClose={handleClosePopup} position={popupPosition} />}
            {settingsPopupVisible && <SettingsPopup onClose={handleCloseSettingsPopup} position={popupPosition} />}
            {AddPopupVisible && <AddPopup onClose={handleCloseAddPopup} position={popupPosition} />}
        </div>
    )    
}

// Handles the icons that go on the bar
const SideBarIcon = ({ icon, text, onClick }: SideBarIconProps) => (
    <div className="sidebar-icon group" onClick={(event) => onClick && onClick(text, event)}>
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
);

const Divider = () => <hr className="divider" />;

interface PopupProps {
    channel: string;
    onClose: () => void;
    position: { x: number; y: number };
}

const offsetX = 40;
const offsetY = -60;

const Popup = ({ channel, onClose, position }: PopupProps) => (
    // Pop up that appears on the channel
    <div
        className="popup"
        style={{
            top: position.y + offsetY,
            left: position.x  + offsetX,
            position: "absolute",
        }}
        onClick={onClose}
    >
        <ul className="popup-list">
            <li className="popup-item">Edit Name of {channel}</li>
            <Divider />
            <li className="popup-item">Add Member to {channel}</li>
            <Divider />
            <li className="popup-item">Edit Member of {channel}</li>
            <Divider />
            <li className="popup-item">Change Picture of {channel}</li>
            <Divider />
            <li className="popup-item flex bg-red-400 justify-center rounded-full w-auto">Leave {channel}</li>
        </ul>
    </div>
);

interface SettingsPopupProps {
    onClose: () => void;
    position: { x: number; y: number };
}

const SettingsPopup = ({ onClose, position }: SettingsPopupProps) => (
    // Pop up that appears on the settings icon
    <div
        className="popup"
        style={{
            top: position.y + offsetY,
            left: position.x + offsetX,
            position: "absolute",
        }}
        onClick={onClose}
    >
        <ul className="popup-list">
            <li className="popup-item flex justify-between w-auto">
                Account Details
                <FaExternalLinkAlt className="flex align-middle h-[10px]"/>
            </li>
            <Divider />
            <button
                onClick={async () => await signOut()}
                className="hover:cursor-pointer text-2xl"
            >
                Logout
            </button>
        </ul>
    </div>
);

interface AddPopupProps {
    onClose: () => void;
    position: { x: number, y: number}
}

const AddPopup = ({ onClose, position }: AddPopupProps) => {
    const stopPropagation = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <div
            className='add-popup'
            style={{
                top: position.y + offsetY,
                left: position.x + offsetX,
                position: "absolute"
            }}
            onClick={onClose}
        >
            <ul className='add-popup-list flex flex-col items-center' >
                <li className='font-bold text-green-900'>Create a Channel</li>
                <div className="upload-channel" onClick={stopPropagation}>
                    <FaCamera size={"45px"} />
                </div>
                <input type='text' placeholder='  Channel Name' className='ml-1 rounded-lg text-black' onClick={stopPropagation}/>
                <button className='add-button'>Create</button>
            </ul>
        </div>
    );
};

export default SideBar;

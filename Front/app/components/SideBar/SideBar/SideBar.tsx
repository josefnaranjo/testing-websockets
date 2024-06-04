import React, { useState, useEffect, MouseEvent } from 'react';
import { GiAmericanFootballBall } from "react-icons/gi";
import { IoIosAddCircle } from "react-icons/io";
import { BsGearFill } from "react-icons/bs";
import SideBarIcon from '../SideBarIcon/SideBarIcon';
import Divider from '../Divider/Divider';
import Popup from '../Popup/Popup';
import SettingsPopup from '../SettingsPopup/SettingsPopup';
import AddPopup from '../AddPopup/AddPopup';
import './SideBar.css';

interface Server {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

const SideBar = () => {
    const [selectedServer, setSelectedServer] = useState('');
    const [selectedServerId, setSelectedServerId] = useState('');
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [popupVisible, setPopupVisible] = useState(false);
    const [settingsPopupVisible, setSettingsPopupVisible] = useState(false);
    const [addPopupVisible, setAddPopupVisible] = useState(false);
    const [servers, setServers] = useState<Server[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [newServerName, setNewServerName] = useState('');

    useEffect(() => {
        const fetchServers = async () => {
            try {
                const response = await fetch('/api/servers');
                if (!response.ok) {
                    throw new Error('Failed to fetch servers');
                }
                const data: Server[] = await response.json();
                setServers(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchServers();
    }, []);

    const handleIconDoubleClick = (text?: string, event?: MouseEvent, serverId?: string) => {
        if (text && event) {
            setSelectedServer(text);
            setSelectedServerId(serverId || '');
            const { clientX, clientY } = event;
            setPopupPosition({ x: clientX, y: clientY });
            setPopupVisible(true);
            setSettingsPopupVisible(false);
            setAddPopupVisible(false);
            setIsEditing(false); // Reset edit mode when switching servers
        }
    };

    const handleIconClick = () => {
        if (popupVisible) {
            setPopupVisible(false);
        }
    };

    const handleSettingsClick = (text?: string, event?: MouseEvent) => {
        if (event) {
            const { clientX, clientY } = event;
            setPopupPosition({ x: clientX, y: clientY });
            setSettingsPopupVisible((prev) => !prev);
            setPopupVisible(false);
            setAddPopupVisible(false);
        }
    };

    const handleAddServerClick = (text?: string, event?: MouseEvent) => {
        if (event) {
            const { clientX, clientY } = event;
            setPopupPosition({ x: clientX, y: clientY });
            setAddPopupVisible((prev) => !prev);
            setSettingsPopupVisible(false);
            setPopupVisible(false);
        }
    };

    const handleClosePopup = () => setPopupVisible(false);
    const handleCloseSettingsPopup = () => setSettingsPopupVisible(false);
    const handleCloseAddPopup = () => setAddPopupVisible(false);

    const handleLeaveServer = async () => {
        try {
            const response = await fetch('/api/servers', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: selectedServerId }),
            });

            if (response.ok) {
                console.log('Server deleted successfully');
                setServers((prevServers) => prevServers.filter(server => server.id !== selectedServerId));
                setPopupVisible(false); 
            } else {
                const errorData = await response.json();
                console.error('Failed to delete server:', errorData);
            }
        } catch (error) {
            console.error('Error deleting server:', error);
        }
    };

    const handleEditServerName = async () => {
        try {
            const response = await fetch('/api/servers', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: selectedServerId, name: newServerName }),
            });

            if (response.ok) {
                console.log('Server name updated successfully');
                setServers((prevServers) => prevServers.map(server => 
                    server.id === selectedServerId ? { ...server, name: newServerName } : server
                ));
                setIsEditing(false);
                setPopupVisible(false);
            } else {
                const errorData = await response.json();
                console.error('Failed to update server name:', errorData);
            }
        } catch (error) {
            console.error('Error updating server name:', error);
        }
    };

    return (
        <div className='top-0 left-0 h-full w-[72px] m-0 flex flex-col text-white shadow-lg sidebar-container'>
            <SideBarIcon 
                icon={<IoIosAddCircle size={"40px"} />} 
                text="Add Server" 
                onClick={handleAddServerClick}
            />
            <Divider />
            {servers.map(server => (
                <SideBarIcon 
                    key={server.id}
                    icon={<GiAmericanFootballBall size={"30px"} />} // Adjust icon as needed
                    text={server.name} 
                    onClick={handleIconClick}
                    onDoubleClick={(text, event) => handleIconDoubleClick(text, event, server.id)}
                />
            ))}
            <Divider />
            <SideBarIcon
                icon={<BsGearFill size={"30px"} />}
                text="Settings"
                onClick={handleSettingsClick}
            />
            {popupVisible && <Popup 
                server={selectedServer} 
                onClose={handleClosePopup} 
                onLeave={handleLeaveServer} 
                onEdit={() => setIsEditing(true)} 
                isEditing={isEditing}
                newServerName={newServerName}
                setNewServerName={setNewServerName}
                handleEditServerName={handleEditServerName}
                position={popupPosition} 
            />}
            {settingsPopupVisible && <SettingsPopup onClose={handleCloseSettingsPopup} position={popupPosition} />}
            {addPopupVisible && <AddPopup onClose={handleCloseAddPopup} position={popupPosition} />}
        </div>
    )
};

export default SideBar;

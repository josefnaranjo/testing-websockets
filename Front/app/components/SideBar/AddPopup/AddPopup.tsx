import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import './AddPopup.css';

interface AddPopupProps {
    onClose: () => void;
    position: { x: number, y: number };
}

const offsetX = 40;
const offsetY = -60;

const AddPopup = ({ onClose, position }: AddPopupProps) => {
    const [channelId, setServerId] = useState('');
    const [channelName, setServerName] = useState('');
    const stopPropagation = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const handleCreateServer = async () => {
        try {
            const response = await fetch('/api/servers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: channelId,
                    name: channelName,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Server created:', data);
                onClose();
                window.location.reload();
            } else {
                console.error('Failed to create server');
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
            <ul className='add-popup-list flex flex-col items-center'>
                <li className='font-bold text-green-900'>Create a Server</li>
                <div className="upload-channel" onClick={stopPropagation}>
                    <FaCamera size={"45px"} />
                </div>
                <input
                    type='text'
                    placeholder='  Server ID'
                    className='ml-1 rounded-lg text-black mb-4'
                    onClick={stopPropagation}
                    value={channelId}
                    onChange={(e) => setServerId(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='  Server Name'
                    className='ml-1 rounded-lg text-black'
                    onClick={stopPropagation}
                    value={channelName}
                    onChange={(e) => setServerName(e.target.value)}
                />
                <button className='add-button' onClick={handleCreateServer}>Create</button>
            </ul>
        </div>
    );
};

export default AddPopup;

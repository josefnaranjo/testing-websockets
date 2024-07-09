import React, { useState } from 'react';
import './AddPopup.css';

// Brought this here as well so we dont refresh the page but rather the UI instead
interface Server {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    inviteCode?: string;
  }

interface AddPopupProps {
    onClose: () => void;
    position: { x: number, y: number };
    onServerAdded: (newServer: Server) => void; // Callback
}

const offsetX = 40;
const offsetY = -60;

const AddPopup = ({ onClose, position, onServerAdded  }: AddPopupProps) => {
    const [inviteCode, setInviteCode] = useState("");
    const [message, setMessage] = useState("");
    const [serverName, setServerName] = useState('');
    const [showInviteCodeInput, setShowInviteCodeInput] = useState(false);

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
                    name: serverName,
                }),
            });

            if (response.ok) {
                const newServer = await response.json();
                console.log('Server created:', newServer);
                onServerAdded(newServer); // Call the callback with the new server
                onClose();
            } else {
                console.error('Failed to create server');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleJoinServer = async () => {
        try {
            const response = await fetch('/api/userServerActions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inviteCode }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.error}`);
                return;
            }

            const joinedServer = await response.json();
            setMessage('Successfully joined the server!');
            setInviteCode('');
            onServerAdded(joinedServer); // Call the callback with the joined server
            onClose();
        } catch (error) {
            console.error('Failed to join server:', error);
            setMessage('Failed to join server');
        }
    };

    return (
        <div
            className='add-popup flex flex-col'
            style={{
                top: position.y + offsetY,
                left: position.x + offsetX,
                position: 'absolute',
            }}
        >
            <ul className='add-popup-list flex flex-col items-center'>
                <li className='font-bold text-green-900 mb-4'>Create a Server</li>
                <input
                    type='text'
                    placeholder='Server Name'
                    className='pl-3 ml-1 rounded-lg text-black'
                    onClick={stopPropagation}
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                />
                <button className='add-button' onClick={handleCreateServer}>Create</button>
            </ul>
            <button className='font-bold text-green-900 mt-2  mb-2 hover:text-green-200 transition-all duration-100 ease-linear'
            onClick={() => setShowInviteCodeInput(!showInviteCodeInput)}>
            Have an invite code? Click here</button>
            {showInviteCodeInput && (
                <ul className='add-popup-list flex flex-col items-center'>
                    <input
                        type='text flex flex-col items-center'
                        onClick={stopPropagation}
                        className='pl-3 ml-1 rounded-lg text-black'
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                        placeholder='Enter invite code'
                    />
                    <button className='add-button mt-2' onClick={handleJoinServer}>Join</button>
                </ul>
            )}
        </div>
    );
};

export default AddPopup;

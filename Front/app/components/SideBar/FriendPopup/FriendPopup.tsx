import React, { useState, useEffect } from 'react';
import Divider from '../Divider/Divider';
import '../Popup/Popup.css';
import './FriendPopup.css';

interface FriendPopupProps {
    onClose: () => void;
    position: { x: number; y: number };
}

interface Friend {
    id: string;
    name?: string;
}

const offsetX = 40;
const offsetY = -60;

const FriendPopup = ({ onClose, position }: FriendPopupProps) => {
    const [friendId, setFriendId] = useState('');
    const [friends, setFriends] = useState<Friend[]>([]);

    useEffect(() => {
        // Fetch the user's friends when the component mounts
        const fetchFriends = async () => {
            try {
                const response = await fetch('/api/friendActions');
                const data = await response.json();
                setFriends(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, []);

    const stopPropagation = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const handleAddFriend = async () => {
        try {
            const response = await fetch('/api/friendActions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ friendId }),
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.success);
                setFriends([...friends, { id: friendId }]); // Updates the UI with the new friend, it's only their ID but it still reflects that it went through
                setFriendId('');
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    };

    const handleRemoveFriend = async (id: string) => {
        try {
            const response = await fetch('/api/friendActions', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ friendId: id }),
            });

            const result = await response.json();
            if (response.ok) {
                setFriends(friends.filter((friend) => friend.id !== id)); // Updates the UI to remove the friend
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error('Error removing friend:', error);
        }
    };

    return (
        <div
            className="popup flex flex-col"
            style={{
                top: position.y + offsetY,
                left: position.x + offsetX,
                position: 'absolute',
            }}
            onClick={onClose}
        >
            <div onClick={stopPropagation} className="flex flex-col items-center">
                <span className="heading-text select-none">Add a Friend</span>
                <input
                    className="input-field"
                    type="text"
                    placeholder="Enter user ID"
                    value={friendId}
                    onChange={(e) => setFriendId(e.target.value)}
                    onClick={stopPropagation}
                />
                <button className="add-friend-button" onClick={handleAddFriend}>Add</button>
                <div className="friends-list font-bold text-green-900">
                    {friends.length === 0 ? (
                        <h3>No friends, yet</h3>
                    ) : (
                        <>
                            <h3 className='flex justify-center mt-3 select-none'>Your Friends</h3>
                            <Divider />
                            {friends.map((friend) => (
                                <div key={friend.id} className="friend-item flex items-center mt-1 select-none">
                                    <span>{friend.name ? friend.name : `(ID: ${friend.id})`}</span>
                                    <button className="remove-friend-button" onClick={() => handleRemoveFriend(friend.id)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FriendPopup;

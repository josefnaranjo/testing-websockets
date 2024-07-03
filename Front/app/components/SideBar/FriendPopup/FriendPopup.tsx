import React, { useState, useEffect } from 'react';
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
                const response = await fetch('/api/friendActions'); // Adjust the endpoint as needed
                const data = await response.json();
                setFriends(data);
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
                setFriends([...friends, { id: friendId }]); // Optionally update the UI with the new friend
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
                setFriends(friends.filter((friend) => friend.id !== id)); // Optionally update the UI to remove the friend
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
                <span className="heading-text">Add a Friend</span>
                <input
                    className="input-field"
                    type="text"
                    placeholder="Enter user ID"
                    value={friendId}
                    onChange={(e) => setFriendId(e.target.value)}
                    onClick={stopPropagation}
                />
                <button className="add-friend-button" onClick={handleAddFriend}>Add Friend</button>
                <div className="friends-list font-bold text-green-900">
                    <h3>Your Friends</h3>
                    {friends.map((friend) => (
                        <div key={friend.id} className="friend-item flex items-center">
                            <span>(ID: {friend.id})</span>
                            <button className="remove-friend-button ml-2" onClick={() => handleRemoveFriend(friend.id)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FriendPopup;

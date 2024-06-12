import React, { useState } from 'react';
import '../Popup/Popup.css';
import './SearchPopup.css';

interface SearchPopupProps {
    onClose: () => void;
    position: { x: number; y: number };
}

interface SearchResult {
    id: string;
    name?: string;
    type: 'user' | 'server'
    // Add any other common fields if necessary
  }
  

const offsetX = 40;
const offsetY = -60;

const SearchPopup = ({ onClose, position }: SearchPopupProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);

    const stopPropagation = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const handleSearch = async () => {
        try {
            const usersResponse = await fetch(`/api/users?query=${searchQuery}`);
            const users = await usersResponse.json();
            const serversResponse = await fetch(`/api/servers?query=${searchQuery}`);
            const servers = await serversResponse.json();

            const typeUsers = users.map((user: any) => ({...user, type: 'user' }));
            const typeServers = servers.map((server: any) => ({...server, type: 'server' }));

            setResults([...typeUsers, ...typeServers]);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    return (
        <div
            className="popup flex flex-col"
            style={{
                top: position.y + offsetY,
                left: position.x + offsetX,
                position: "absolute",
            }}
            onClick={onClose}
        >
            <div onClick={stopPropagation} className='flex flex-col items-center'> 
                <span className='heading-text'>Search for a User or Server</span>
                <input 
                    className='input-field'
                    type='text'
                    placeholder='User/Server Name/ID'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={stopPropagation}
                />
                <button className='search-button' onClick={handleSearch}>Search</button>
                <div className="search-results">
                    {results.map((result) => (
                        <div key={result.id} className="flex flex-col result-item text-green-900 font-bold justify-center"> 
                            <div>
                                {result.type === 'user' ? 'User' : 'Server'}: {result.name || result.id} (ID: {result.id})
                            </div>
                            <div className='search-button-container flex self-center'>
                                {result.type === 'user' ? (
                                    <button className='friend-button'>
                                        Add as Friend
                                    </button>
                                ) : (
                                    <button className='server-button'>
                                        Request to Join
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPopup;

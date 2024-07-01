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
    type: 'user'
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

            const typeUsers = users.map((user: any) => ({...user, type: 'user' }));

            setResults([...typeUsers]);
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
                <span className='heading-text'>Search for a User</span>
                <input 
                    className='input-field'
                    type='text'
                    placeholder='User name'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={stopPropagation}
                />
                <button className='search-button' onClick={handleSearch}>Search</button>
                <div className="search-results">
                    {results.map((result) => (
                        <div key={result.id} className="flex flex-col result-item text-green-900 font-bold justify-center"> 
                            <div>
                                {result.name} (ID: {result.id})
                            </div>
                            <div className='search-button-container flex self-center'>
                                    {/* ADD FUNCTIONALITY TO SEND A FRIEND REQUEST OF SORTS */}
                                    <button className='friend-button'>
                                        Add as Friend
                                    </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPopup;

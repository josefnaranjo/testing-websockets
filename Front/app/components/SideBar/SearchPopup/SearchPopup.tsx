import React from 'react';
import '../Popup/Popup.css';
import './SearchPopup.css';

interface SearchPopupProps {
    onClose: () => void;
    position: { x: number; y: number };
}

const offsetX = 40;
const offsetY = -60;

const SearchPopup = ({ onClose, position }: SearchPopupProps) => {
    const stopPropagation = (event: React.MouseEvent) => {
        event.stopPropagation();
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
        <span className='heading-text'>Search for a User or Server</span>
        <input 
            className='input-field'
            type='text'
            placeholder='Username or ServerID'
            onClick={stopPropagation}
        />
        <button className='search-button'>Search</button>
    </div>
    );

};

export default SearchPopup;

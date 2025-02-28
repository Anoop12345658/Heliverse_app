import React from 'react';

function SearchBar({ onSearch }) {
    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search by name..."
                className="border rounded-lg px-3 py-2 w-full"
                onChange={(e) => onSearch(e.target.value)} 
            />
        </div>
    );
}

export default SearchBar;
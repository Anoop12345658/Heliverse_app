import React from 'react';

function UserCard({ user }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <img src={user.avatar} alt={user.first_name} className="w-20 h-20 rounded-full mx-auto" />
            <h3 className="text-lg font-medium mt-2">{user.first_name} {user.last_name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">Domain: {user.domain}</p>
            <p className="text-gray-600">Available: {user.available ? 'Yes' : 'No'}</p>
            {/* Add a checkbox for team selection if needed */}
        </div>
    );
}

export default UserCard;
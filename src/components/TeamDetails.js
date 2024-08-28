import React from 'react';
import UserCard from './UserCard'; 

function TeamDetails({ team }) {
    if (!team) {
        return <p>No team selected yet.</p>;
    }

    return (
        <div>
            <h3 className="text-xl font-semibold mb-2">Team Details:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
                {team.users.map(user => (
                    <UserCard key={user.id} user={user} /> 
                ))}
            </div>
        </div>
    );
}

export default TeamDetails;
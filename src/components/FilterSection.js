import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, setFilter } from '../store/usersSlice';

function FilterSection() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const filters = useSelector(state => state.users.filters);

    const [availableDomains, setAvailableDomains] = useState([]);
    const [availableGenders, setAvailableGenders] = useState([]);

    useEffect(() => {
        // Get unique domains from user data
        const domains = [...new Set(users.map(user => user.domain))];
        setAvailableDomains(domains);

        // Get unique genders from user data
        const genders = [...new Set(users.map(user => user.gender))];
        setAvailableGenders(genders);
    }, [users]);

    const handleDomainChange = (domain) => {
        dispatch(setFilter({ 
            ...filters, // Keep other filters unchanged
            domain: filters.domain.includes(domain) 
                ? filters.domain.filter(d => d !== domain) 
                : [...filters.domain, domain] 
        }));
    };

    const handleGenderChange = (gender) => {
        dispatch(setFilter({ 
            ...filters, 
            gender: filters.gender.includes(gender)
                ? filters.gender.filter(g => g !== gender)
                : [...filters.gender, gender]
        }));
    };

    const handleAvailabilityChange = (event) => {
        dispatch(setFilter({
            ...filters,
            available: event.target.value === 'true' ? true 
                    : event.target.value === 'false' ? false 
                    : null // Reset filter if 'all' is selected
        }));
    };

    return (
        <div className="mb-4">
            <h4 className="text-lg font-medium mb-2">Filters</h4>

            {/* Domain Filters */}
            <div>
                <h5 className="font-medium">Domain:</h5>
                {availableDomains.map(domain => (
                    <label key={domain}>
                        <input 
                            type="checkbox" 
                            value={domain}
                            checked={filters.domain.includes(domain)} 
                            onChange={() => handleDomainChange(domain)} 
                        /> {domain}
                    </label>
                ))}
            </div>

            {/* Gender Filters */}
            <div>
                <h5 className="font-medium">Gender:</h5>
                {availableGenders.map(gender => (
                    <label key={gender}>
                        <input 
                            type="checkbox" 
                            value={gender} 
                            checked={filters.gender.includes(gender)}
                            onChange={() => handleGenderChange(gender)}
                        /> {gender}
                    </label>
                ))}
            </div>

            {/* Availability Filter */}
            <div>
                <h5 className="font-medium">Availability:</h5>
                <select value={filters.available === null ? 'all' : filters.available} onChange={handleAvailabilityChange}>
                    <option value="all">All</option>
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>
            </div>
        </div>
    );
}

export default FilterSection;
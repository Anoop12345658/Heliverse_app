import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import FilterSection from './FilterSection';
import { fetchUsers, setCurrentPage, setFilter, setSearchQuery, setSelectedTeam } from '../store/usersSlice';
import TeamDetails from './TeamDetails'; // Import TeamDetails


function App() {
    const dispatch = useDispatch();
    const { users, loading, error, currentPage, totalPages, filters, searchQuery, selectedTeam } = useSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch, currentPage, filters, searchQuery]); 

    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage(newPage));
    };

    const handleFilterChange = (newFilters) => {
        dispatch(setFilter(newFilters));
        dispatch(setCurrentPage(1)); 
    };

    const handleSearch = (query) => {
        dispatch(setSearchQuery(query));
        dispatch(setCurrentPage(1)); 
    };

    if (loading) {
        return <p>Loading users...</p>; 
    }

    if (error) {
        return <p>Error: {error}</p>; 
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Heliverse User App</h1>

            <SearchBar onSearch={handleSearch} /> 
            <FilterSection onFilterChange={handleFilterChange} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map(user => (
                    <UserCard key={user.id} user={user} /> 
                ))}
            </div>

            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />

            <TeamDetails team={selectedTeam} /> {/* Display team details */}
        </div>
    );
}

export default App;
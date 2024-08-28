import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-4">
            <ul className="flex justify-center">
                {pageNumbers.map(number => (
                    <li key={number} className={`mx-2 px-3 py-1 rounded-lg ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        <button onClick={() => onPageChange(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;
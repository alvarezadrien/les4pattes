import React from 'react';
import './Pagination.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={currentPage === i ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="pagination">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Précédent
            </button>
            {renderPageNumbers()}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Suivant
            </button>
        </div>
    );
};

export default Pagination;

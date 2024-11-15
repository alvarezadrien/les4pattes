import React, { useState } from 'react';
import '../Pagination.css';

const Pagination = ({ totalPages }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Fonction pour aller à une page spécifique, sans changement si c'est la page actuelle
    const handlePageClick = (page) => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    };

    // Fonction pour générer les boutons de pages
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={currentPage === i ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="pagination">
            <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
                Précédent
            </button>
            {renderPageNumbers()}
            <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
                Suivant
            </button>
        </div>
    );
};

export default Pagination;

import React from 'react';
import '../Pages/boutique.css'
import { Link } from 'react-router-dom';

const Pagination = ({ currentPage, totalPages,path }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    
    return (
      <div className="pagination">
       
        {pageNumbers.map((pageNumber) => (
        <Link
            key={pageNumber}
            className={pageNumber == currentPage ? 'active' : 'false'}
            to={`${path}${pageNumber}`}
          >
           
            {pageNumber}
    
          </Link>
          
        ))}
      </div>
    );
  };
  
  export default Pagination;
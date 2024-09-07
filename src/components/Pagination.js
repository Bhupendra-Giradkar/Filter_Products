import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, onPageChange }) => (
    <ReactPaginate
        pageCount={pageCount}
        onPageChange={onPageChange}
        containerClassName={'pagination'}
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        activeClassName={'active'}
    />
);

export default Pagination;

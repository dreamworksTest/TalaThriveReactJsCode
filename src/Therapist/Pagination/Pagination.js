import React from 'react';
import "./Pagination.css";
import { Link } from 'react-router-dom';

const Pagination = ({
  page,
  setPage,
  totalPage,
  totalAppointment,
  status,
  handleStatus,
  sizes,
}) => {
  const handlePageChange = (newPage) => {
    setPage(newPage);
    handleStatus(status);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${page === i ? "active" : ""}`}>
          <button
            className="page-link AthleticsFont"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav className="d-flex justify-content-between ">
      <div className="OutfitFont countNumberTableData">
        Showing {sizes} of {totalAppointment} appointment
      </div>
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link AthleticsFont"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Prev
          </button>
        </li>
        {renderPageNumbers()}
        <li className="page-item">
          <button
            className="page-link AthleticsFont"
            disabled={page === totalPage}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
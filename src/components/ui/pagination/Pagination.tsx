import React from "react";
import styles from "./pagination.module.scss";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  return (
    <div className={styles.pagination}>
      {[...Array(totalPages)].map((_, index) => (
        <button
          className={`${styles.paginationButton} ${currentPage === index + 1 ? styles.active : ""}`}
          key={index}
          onClick={() => handlePageChange(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

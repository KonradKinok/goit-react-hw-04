import React from "react";
import "./Button.scss";

interface ButtonProps {
  handlePagination: () => void;
  totalPages: number;
  currentPage: number;
}

export const Button: React.FC<ButtonProps> = ({
  handlePagination,
  totalPages,
  currentPage,
}) => {
  
  const handlePaginationButton = () => {
    handlePagination();
  };

  return (
    <>
      <button type="button" className="button" onClick={handlePaginationButton}>
        Load more: {currentPage}/{totalPages}
      </button>
    </>
  );
};

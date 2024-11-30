import "./Searchbar.scss";
import { useState, ChangeEvent, MouseEvent } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { useOptionsImageContext } from "../Context/useOptionsImage";
import { useToggle } from "../hooks/useToggle";
import { ModalOptions } from "../ModalOptions/ModalOptions";

interface SearchbarProps {
  handleSearch: (query: string) => void;
}

export function Searchbar({ handleSearch }: SearchbarProps) {
  const { options } = useOptionsImageContext();
  const [query, setQuery] = useState<string>("");
  const {
    isOpenModal: isModalOptionsOpen,
    openModal: openModalOptions,
    closeModal: closeModalOptions,
  } = useToggle();
  const clickButtonSearch = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (query.trim() === "") {
      const toastMessage = `Info:\nWpisz dane do wyszukiwania`;
      toast(toastMessage, {
        duration: 4000,
      });
      return;
    }
    handleSearch(query);
  };

  const handleInputSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };
  const clickButtonOptions = () => {
    openModalOptions();
    console.log({ isModalOptionsOpen });
  };
  return (
    <header className="searchbar">
      <form className="searchForm">
        <button
          type="submit"
          className="searchForm-button"
          onClick={clickButtonSearch}
        >
          <FaSearch className="searchForm-button-icon" />
        </button>
        <input
          className="searchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          name="query"
          onChange={handleInputSearchChange}
        />
        <button
          name="button-options"
          type="button"
          className="searchForm-button"
          onClick={clickButtonOptions}
        >
          <FaCog className="searchForm-button-icon" />
        </button>
      </form>
      <div className="searchForm-options-container">
        {Object.entries(options).map(([key, value]) => (
          <p key={key}>
            {key} : {value ? value : "all"}
          </p>
        ))}
      </div>
      <ModalOptions
        isModalOptionsOpen={isModalOptionsOpen}
        closeModalOptions={closeModalOptions}
      />
    </header>
  );
}

import "./Searchbar.scss";
import { useState, ChangeEvent, MouseEvent } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
interface SearchbarProps {
  handleSearch: (query: string) => void;
}

export function Searchbar({ handleSearch }: SearchbarProps) {
  const [query, setQuery] = useState<string>("");

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
      </form>
    </header>
  );
}

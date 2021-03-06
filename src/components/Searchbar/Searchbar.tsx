import React, { useState, memo } from 'react';
import { FaSearchengin } from 'react-icons/fa';
import { IconContext } from 'react-icons';

import './Searchbar.css';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  onSubmit(query: string): void;
}

function Searchbar({ onSubmit }: Props) {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className="Searchbar">
      <div className="logobox">
        <IconContext.Provider
          value={{ color: 'black', size: '1.5em', className: 'react-icons' }}
        >
          <div className="logobox__icon">
            <FaSearchengin />
          </div>
        </IconContext.Provider>
        <span className="logobox__text">Search and Save</span>
      </div>
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          value={query}
          className="SearchForm-input"
          name="form_input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

export default memo(Searchbar);

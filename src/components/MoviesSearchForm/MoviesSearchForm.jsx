import { useState, useEffect, useRef, useMemo } from 'react';
import { nanoid } from 'nanoid';

import styles from './movies-search-form.module.css';

const MoviesSearchForm = ({ onSubmit }) => {
  const [state, setState] = useState({
    search: '',
  });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    reset();
  };

  const reset = () => {
    setState({
      search: '',
    });
  };

  const searchId = useMemo(() => nanoid(), []);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.fieldGroup}>
        <label htmlFor={searchId}></label>
        <div className={styles.inputContainer}>
          <input
            id={searchId}
            ref={inputRef}
            value={state.search}
            onChange={handleChange}
            required
            type="text"
            name="search"
            placeholder="Enter search phrase"
            className={styles.input}
          />
          <button className={styles.button} type="submit">
            <span className={styles.label}>Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default MoviesSearchForm;
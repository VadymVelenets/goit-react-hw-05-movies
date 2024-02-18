import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';

import MoviesSearchForm from 'components/MoviesSearchForm/MoviesSearchForm';
import MoviesList from 'components/MoviesList/MoviesList';

import { searchMovies } from '../../api/movie';

import styles from './movies-page.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search');
  const page = searchParams.get('page');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const { data } = await searchMovies(search, page);
        setMovies(prevMovies =>
          data.results?.length ? [...prevMovies, ...data.results] : prevMovies
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (search && (page === '1' || !page)) {
      fetchMovies();
    }
  }, [search, page]);

  const handleSearch = ({ search }) => {
    setSearchParams({ search, page: 1 });
    setMovies([]);
  };

  const loadMore = () => setSearchParams({ search, page: Number(page) + 1 });

  const isMovies = Boolean(movies.length);
  const isMoreMovies = Boolean(movies.length % 20 === 0);

  return (
    <div>
      <MoviesSearchForm onSubmit={handleSearch} />
      {error && <p className={styles.error}>{error}</p>}
      {loading && <Loader />}
      {isMovies && <MoviesList items={movies} />}
      {isMovies && isMoreMovies && (
        <div className={styles.loadMoreWrapper}>
          <Button className={styles.button} onClick={loadMore} type="button">
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
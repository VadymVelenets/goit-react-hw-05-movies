import { useState, useEffect } from 'react';

import { getTrending } from '../../api/trending';
import Loader from '../Loader/Loader';
import MoviesList from 'components/MoviesList/MoviesList';

import styles from './trending.module.css';

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const respMovies = await getTrending();
        const { results } = respMovies.data;
        setTrending(results?.length ? results : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <>
      {error && <p className={styles.error}>{error}</p>}
      {loading && <Loader />}
      {Boolean(trending.length) && <MoviesList items={trending} />}
    </>
  );
};

export default Trending;
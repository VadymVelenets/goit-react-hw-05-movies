import { Suspense, useState, useEffect } from 'react';
import {
  Link,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { getMoviesDetails } from '../../api/movie';
import Loader from 'components/Loader/Loader';

import styles from './movie-details-page.module.css';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const location = useLocation();

  const from = location.state?.from || '/';

  const navigate = useNavigate();

  const BASE_URL = 'https://image.tmdb.org/t/p/w300';

  useEffect(() => {
    const fetchMoviesDetails = async () => {
      try {
        setLoading(true);
        const { data } = await getMoviesDetails(id);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesDetails();
  }, [id]);

  const goBack = () => navigate(from);

  const { title, poster_path, overview, vote_average, genres } = movie || {};

  return (
    <div>
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      <button className={styles.btn} onClick={goBack} type="button">
        Go back
      </button>
      {movie && (
        <>
          <div className={styles.moviecontainer}>
            <img src={poster_path ? BASE_URL + poster_path : ''} alt={title} />
            <div>
              <h1>{title}</h1>
              <h2 className={styles.title}>User Score:</h2>
              <p>{Math.round(vote_average * 10)}%</p>
              <h2 className={styles.title}>Overview: </h2>
              <p>{overview}</p>
              <h2 className={styles.title}>Genres:</h2>
              <p className={styles.genres}>
                {genres && genres.map(i => i.name).join(', ')}
              </p>
            </div>
          </div>
          <div className={styles.infocontainer}>
            <h3 className={styles.title}>Additional information</h3>
            <ul className={styles.addinfo}>
              <li>
                <Link className={styles.infolink} to={'cast'} state={{ from }}>
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  className={styles.infolink}
                  to={'reviews'}
                  state={{ from }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
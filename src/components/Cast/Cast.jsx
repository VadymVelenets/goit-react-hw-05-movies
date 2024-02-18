import { getMoviesCredits } from '../../api/movie';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import styles from './cast.module.css';
import img from 'img/person.jpg';

const BASE_URL = 'https://image.tmdb.org/t/p/w300';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    async function fetchCast() {
      try {
        setLoading(true);
        const { data } = await getMoviesCredits(id);
        setCast(data.cast);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCast();
  }, [id]);

  const elements = cast.map(
    ({ id, character, original_name, profile_path }) => (
      <li className={styles.item} key={id}>
        <img
          className={styles.img}
          src={profile_path ? BASE_URL + profile_path : img}
          alt="Foto"
        />
        <h4 className={styles.title}>{character}</h4>
        <p className={styles.text}>{original_name}</p>
      </li>
    )
  );

  const isCast = Boolean(cast.length);

  return (
    <>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {(isCast && <ul className={styles.list}>{elements}</ul>) || (
        <p className={styles.info}>The cast is absent.</p>
      )}
    </>
  );
};

export default Cast;
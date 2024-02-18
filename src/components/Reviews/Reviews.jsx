import { getMoviesReviews } from '../../api/movie';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './reviews.module.css';

const Reviews = () => {
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const { data } = await getMoviesReviews(id);
        setReview(data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [id]);

  const elements = review.map(({ id, author, content }) => (
    <li key={id}>
      <h4 className={styles.title}>{author}</h4>
      <p>{content}</p>
    </li>
  ));

  const isReview = Boolean(review.length);

  return (
    <>
      {loading && <p>...Loading</p>}
      {error && <p>{error}</p>}
      {(isReview && <ul className={styles.list}>{elements}</ul>) || (
        <p className={styles.info}>There are no reviews.</p>
      )}
    </>
  );
};

export default Reviews;
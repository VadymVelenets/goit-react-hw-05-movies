import { Link } from 'react-router-dom';

import styles from './not-found-page.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.title}>
      <h1>Cannot found this page</h1>
      <Link to="/">To home page</Link>
    </div>
  );
};
export default NotFoundPage;
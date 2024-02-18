import Trending from '../../components/Trending/Trending';

import styles from './home-page.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending today</h1>
      <Trending />
    </div>
  );
};

export default HomePage;
import React from 'react';
import styles from './NotFound.module.css';

const NotFound: React.FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <h1>404 Not Found</h1>
    </div>
  );
};

export default NotFound;

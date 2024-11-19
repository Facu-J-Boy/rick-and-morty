import { character } from '../../interfaces';
import styles from './CharacterCard.module.css';
import React from 'react';

const CardCharacter: React.FC<character> = ({ id, name, image }) => {
  return (
    <div className={styles.card}>
      <div className={styles.button}>
        <button className='btn btn-dark me-1 mt-1 position-absolute'>
          Edit
        </button>
      </div>
      <div className={styles.image_container}>
        <img src={image} />
      </div>
      <h3>{name}</h3>
    </div>
  );
};

export default CardCharacter;

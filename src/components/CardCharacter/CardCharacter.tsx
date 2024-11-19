import { character } from '../../interfaces';
import styles from './CharacterCard.module.css';
import React from 'react';

const CardCharacter: React.FC<character> = ({ id, name, image }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image_container}>
        <img src={image} />
      </div>
      <h3>{name}</h3>
    </div>
  );
};

export default CardCharacter;

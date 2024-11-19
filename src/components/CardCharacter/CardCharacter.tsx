import { character } from '../../interfaces';
import styles from './CharacterCard.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardCharacter: React.FC<character> = ({
  id,
  name,
  image,
  gender,
  origin
}) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/edit/${id}`, {
      state: { name, image, gender, origin: origin.name }
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.button}>
        <button
          className='btn btn-dark me-1 mt-1 position-absolute'
          onClick={handleEditClick}
        >
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

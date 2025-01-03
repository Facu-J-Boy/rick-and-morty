import { useState } from 'react';
import { useSelector } from 'react-redux';
import { storeInterFace } from '../../redux/store';
import CardCharacter from '../../components/CardCharacter/CardCharacter';
import NavBar from '../../components/NavBar/NavBar';
import styles from './Home.module.css';
import Select from '../../components/Select/Select';
import { getAllCharactersFromLocalStorage } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { charactersLoading, characters, genders, origins } = useSelector(
    (state: storeInterFace) => state.characters
  );

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('');

  // Función para actualizar el término de búsqueda
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  // Función para actualizar el género seleccionado
  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
  };

  // Función para actualizar el origen seleccionado
  const handleOriginChange = (origin: string) => {
    setSelectedOrigin(origin);
  };

  const filteredCharacters = characters.filter((character) => {
    const matchesName = character.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGender = selectedGender
      ? character.gender === selectedGender
      : true;
    const matchesOrigin = selectedOrigin
      ? character.origin.name === selectedOrigin
      : true;
    return matchesName && matchesGender && matchesOrigin;
  });

  return (
    <div className={styles.home}>
      <NavBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <div className={styles.select}>
        <Select
          name='Gender'
          elements={genders}
          itemSelected={selectedGender}
          onChangeItem={handleGenderChange}
        />
        <Select
          name='Origin'
          elements={origins}
          itemSelected={selectedOrigin}
          onChangeItem={handleOriginChange}
        />
        <button
          type='button'
          className='btn btn-success me-5 btn-sm'
          onClick={() => {
            navigate('/create');
          }}
        >
          Add character
        </button>
      </div>
      {charactersLoading ? (
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      ) : (
        <div className={styles.characters}>
          {!filteredCharacters.length && <h1>Character not found</h1>}
          {filteredCharacters?.map((element) => (
            <CardCharacter
              key={element.id}
              id={element.id}
              name={element.name}
              image={element.image}
              gender={element.gender}
              origin={element.origin}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

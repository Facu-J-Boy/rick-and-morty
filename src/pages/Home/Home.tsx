import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, storeInterFace } from '../../redux/store';
import { getAllCharacters } from '../../services/getAllCharacters';
import CardCharacter from '../../components/CardCharacter/CardCharacter';
import NavBar from '../../components/NavBar/NavBar';
import styles from './Home.module.css';
import Select from '../../components/Select/Select';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { charactersLoading, characters } = useSelector(
    (state: storeInterFace) => state.characters
  );
  useEffect(() => {
    !characters.length && dispatch(getAllCharacters());
  }, []);

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

  const genders = [...new Set(characters.map((character) => character.gender))];
  const origins = [
    ...new Set(characters.map((character) => character.origin.name))
  ];

  console.log({ characters });

  console.log('allUsers: ', JSON.parse(localStorage.getItem('users') || '[]'));

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
      </div>
      {charactersLoading ? (
        <h1>Loading...</h1>
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

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, storeInterFace } from '../../redux/store';
import { getAllCharacters } from '../../services/getAllCharacters';
import CardCharacter from '../../components/CardCharacter/CardCharacter';
import NavBar from '../../components/NavBar/NavBar';
import styles from './Home.module.css';

const Home = () => {

    const dispatch = useDispatch<AppDispatch>();

    const {charactersLoading, characters} = useSelector((state: storeInterFace) => state.characters);
    useEffect(() => {
        dispatch(getAllCharacters());
    }, []);

    console.log({characters})

  return (
    <div className={styles.home}>
    <NavBar />
    {charactersLoading?
    <h1>Loading...</h1>
:
<div className={styles.characters}>
{characters?.map((element) => (
    <CardCharacter
    key={element.id}
    id={element.id}
    name={element.name} 
    image={element.image}/>
))}
</div>}
    </div>
  )
}

export default Home

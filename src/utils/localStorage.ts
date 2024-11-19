import { character, userForm } from '../interfaces';
import Swal from 'sweetalert2';
import { addCharacter } from '../redux/reducers/charactersReducer';

interface localStorageData {
  user: userForm;
  navigate: (path: string) => void;
}

interface characterLocalStorage {
  character: character;
  navigate: (path: string) => void;
  dispatch: any;
}

export const saveUser = ({ user, navigate }: localStorageData) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  // Verificar si ya existe un usuario con el mismo email
  const userExists = users.some(
    (u: { email: string }) => u.email === user.email
  );
  if (userExists) {
    return Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'El usuario ya está registrado.',
      showConfirmButton: false,
      timer: 1500
    });
  }

  console.log('new user: ', user);

  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(user));
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: 'Usuario registrado exitosamente.',
    showConfirmButton: false,
    timer: 1500
  });
  navigate('/home');
};

export const findUser = ({ user: data, navigate }: localStorageData) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(
    (u: { email: string; password: string }) =>
      u.email === data.email && u.password === data.password
  );

  console.log({ user });

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: `Bienvenido, ${user.userName}!`,
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/home');
  } else {
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Credenciales incorrectas.',
      showConfirmButton: false,
      timer: 1500
    });
  }
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
};

export const logOut = () => {
  localStorage.removeItem('currentUser');
};

export const addCharacterToLocalStorage = ({
  character,
  navigate,
  dispatch
}: characterLocalStorage) => {
  // Recuperar los personajes existentes del localStorage
  const { name, gender, origin, image } = character;
  const characters = JSON.parse(localStorage.getItem('characters') || '[]');

  // Crear el nuevo personaje
  const newCharacter = {
    id: Math.floor(Math.random() * 100) + 21, // Número aleatorio mayor a 20
    name,
    gender,
    origin,
    image
  };

  // Agregar el nuevo personaje a la lista
  const updatedCharacters = [...characters, newCharacter];

  // Guardar en localStorage
  localStorage.setItem('characters', JSON.stringify(updatedCharacters));

  dispatch(addCharacter(newCharacter));

  navigate('/home');
};

export const getAllCharactersFromLocalStorage = () => {
  const characters = JSON.parse(localStorage.getItem('characters') || '[]');
  return characters;
};

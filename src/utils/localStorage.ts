import { userForm } from '../interfaces';
import Swal from 'sweetalert2';

interface localStorageData {
  user: userForm;
  navigate: (path: string) => void;
}

export const saveUser = ({ user, navigate }: localStorageData) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  // Verificar si ya existe un usuario con el mismo email
  const userExists = users.some(
    (u: { email: string }) => u.email === user.email
  );
  if (userExists) {
    return Swal.fire({
      position: 'top-end',
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
    position: 'top-end',
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
      position: 'top-end',
      icon: 'success',
      title: `Bienvenido, ${user.userName}!`,
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/home');
  } else {
    Swal.fire({
      position: 'top-end',
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

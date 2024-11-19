import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';
import { getCurrentUser, logOut } from '../../utils/localStorage';
import { useState, useEffect } from 'react';
import { userForm } from '../../interfaces';

const NavBar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<userForm | null>(null);
  useEffect(() => {
    const user = getCurrentUser();
    user && setCurrentUser(user);
  }, []);

  const LogOut = () => {
    logOut();
    setCurrentUser(null);
  };
  return (
    <div className={styles.nav_bar}>
      <div className='input-group w-50 h-20 m-3'>
        <input
          type='text'
          className='form-control '
          placeholder='Search'
          aria-label='Search'
          aria-describedby='basic-addon1'
        />
      </div>
      {!currentUser ? (
        <button
          type='button'
          className='btn btn-dark'
          onClick={() => {
            navigate('/login');
          }}
        >
          Login
        </button>
      ) : (
        <>
          <span>{currentUser.userName}</span>
          <button onClick={LogOut}>LogOut</button>
        </>
      )}
    </div>
  );
};

export default NavBar;

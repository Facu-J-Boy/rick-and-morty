import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';
import { getCurrentUser, logOut } from '../../utils/localStorage';
import { useState, useEffect } from 'react';
import { userForm } from '../../interfaces';
import { useSelector } from 'react-redux';
import { storeInterFace } from '../../redux/store';
import logo from '../../assets/logo.svg';

interface NavBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ searchTerm, onSearchChange }) => {
  const navigate = useNavigate();

  const { characters } = useSelector(
    (state: storeInterFace) => state.characters
  );

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
      <div className={styles.logo_container}>
        <img className={styles.logo} src={logo} />
      </div>
      <div className={styles.nav_elements}>
        <div className='input-group w-50 h-20 m-3'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
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
          <div className='dropdown'>
            <button
              className='btn btn-secondary dropdown-toggle'
              type='button'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              {currentUser.userName}
            </button>
            <ul className='dropdown-menu'>
              <li onClick={LogOut}>Log out</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

import React from 'react'
import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <div className={styles.nav_bar}>
        <input type='text' />
        <button>
            Login
        </button>
    </div>
  )
}

export default NavBar
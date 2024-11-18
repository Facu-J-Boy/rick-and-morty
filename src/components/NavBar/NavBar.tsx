import React from 'react'
import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <div className={styles.nav_bar}>
        <div className="input-group w-50 h-20 m-3">
          <input type="text" className="form-control " placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
        </div>
        <button type="button" className="btn btn-dark">Login</button>
    </div>
  )
}

export default NavBar
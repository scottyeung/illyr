import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

export default class Navigation extends React.Component {

  constructor(props){ 
    super(props)
    this.state = { opacity: 0 } 
  }

  render(){
    return (
      <nav role="navigation">
        <ul className={styles.navigation}>
          <li className={styles.navigationItem}>
            <Link to="/">illyr</Link>
          </li>
          <li className={styles.navigationItem}>
            <Link to="/cv/">CV</Link>
          </li>
        </ul>
      </nav>
    )
  }
}
  

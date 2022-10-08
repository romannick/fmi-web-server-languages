import React from 'react'
import { useRouter } from 'next/router'

import styles from './Header.module.css'

const Header: React.FC = () => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.topBarButtons}>
        <div className={styles.logo} onClick={() => router.push('/')}>
          <span>Nikolay Romanov</span>
          <span>Cars app</span>
        </div>
      </div>
    </div>
  )
}

export default Header

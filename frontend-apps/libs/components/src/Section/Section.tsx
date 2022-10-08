import React from 'react'

import styles from './Section.module.css'

interface Props {
  title: string
  className?: string
  children?: React.ReactNode
}

const Section: React.FC<Props> = ({ title, className = '', children }) => (
  <div className={className}>
    <span className={styles.title}>{title}</span>
    <div className={styles.children}>{children}</div>
  </div>
)

export default Section

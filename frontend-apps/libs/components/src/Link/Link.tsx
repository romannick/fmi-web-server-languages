import React from 'react'

import styles from './Link.module.css'

interface Props {
  href: string
  text: string
}

const Link: React.FC<Props> = ({ href, text }) => (
  <a target="_blank" className={styles.link} href={href} rel="noreferrer">
    {text}
  </a>
)

export default Link

import React from 'react'
import classNames from 'classnames'

import styles from './Card.module.css'

interface Props {
  className?: string
  width?: number
  onClick?: () => void
  innerClassName?: string
  children?: React.ReactNode
}

const Card: React.FC<Props> = ({ className, width, onClick, innerClassName, children }) => (
  <div className={classNames(styles.innerContainer, className)} style={{ width }} onClick={onClick}>
    <div className={classNames(styles.container, innerClassName)}>{children}</div>
  </div>
)

export default Card

import React from 'react'
import classNames from 'classnames'

import styles from './Form.module.css'

interface Props {
  title?: string
  className?: string
  width?: number
  children?: React.ReactNode
}

const Form: React.FC<Props> = ({ title, className, width, children }) => (
  <div style={width ? { width } : null} className={classNames(styles.formContainer, className)}>
    {title && <div className={styles.formTitle}>{title}</div>}
    {children}
  </div>
)

export default Form

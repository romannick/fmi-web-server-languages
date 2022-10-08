import React from 'react'
import classNames from 'classnames'

import Spinner from '../../Spinner/Spinner'

import styles from './Button.module.css'

interface Props {
  text: string
  size: 'sm' | 'md' | 'lg'
  onClick: () => void
  className?: string
  loading?: boolean
  variant?: 'default' | 'purple' | 'outline'
  disabled?: boolean
}

const Button: React.FC<Props> = ({
  text,
  size,
  onClick,
  className,
  loading,
  variant = 'default',
  disabled = false
}) => (
  <button
    className={classNames(
      styles[size],
      styles.button,
      className,
      styles[variant],
      loading || disabled ? styles.disabled : null
    )}
    onClick={onClick}
    disabled={disabled || loading}
  >
    {loading ? <Spinner /> : text}
  </button>
)

export default Button

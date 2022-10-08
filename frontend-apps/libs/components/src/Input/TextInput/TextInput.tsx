import React from 'react'
import classNames from 'classnames'

import baseInputStyles from '../BaseInput.module.css'

import styles from './TextInput.module.css'

interface Props {
  value: string
  onChange: (value: string) => void
  className?: string
  placeHolder?: string
  labelRight?: string
  labelLeft?: string
  width?: number
}

const TextInput: React.FC<Props> = ({
  value,
  onChange,
  placeHolder,
  labelLeft,
  labelRight,
  className,
  width
}) => (
  <div className={classNames(styles.wholeContainer, className)}>
    {labelLeft && <div className={styles.labelLeft}>{labelLeft}</div>}
    <div
      style={{ width }}
      className={classNames(baseInputStyles.inputContainer)}
    >
      <input
        className={classNames(baseInputStyles.input, styles.fullWidth)}
        placeholder={placeHolder}
        type="text"
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
      />
    </div>
    {labelRight && <span className={styles.labelRight}>{labelRight}</span>}
  </div>
)

export default TextInput

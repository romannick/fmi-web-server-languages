import React from 'react'
import classNames from 'classnames'

import baseInputStyles from '../BaseInput.module.css'

import styles from './NumberInput.module.css'

interface Props {
  labelLeft: string
  labelRight?: string
  value: string
  onChange: (value: string) => void
  className?: string
  width?: number
  disabled?: boolean
}

const NumberInput: React.FC<Props> = ({
  labelLeft,
  labelRight,
  value,
  onChange,
  className,
  width,
  disabled
}) => (
  <div className={classNames(styles.wholeContainer, className, disabled ? styles.disabled : null)}>
    <span className={styles.labelLeft}>{labelLeft}</span>
    <div className={baseInputStyles.inputContainer} style={{ width }}>
      <input
        className={classNames(baseInputStyles.input, disabled ? styles.disabled : null)}
        type="number"
        disabled={disabled}
        value={value}
        onChange={({ target: { value } }) => onChange(value ? value : undefined)}
      />
    </div>
    {labelRight && <span className={styles.labelRight}>{labelRight}</span>}
  </div>
)

export default NumberInput

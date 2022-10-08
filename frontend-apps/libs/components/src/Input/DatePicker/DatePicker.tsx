import React from 'react'
import classNames from 'classnames'
import ReactDatePicker from 'react-datepicker'

import styles from '@components/Input/TextInput/TextInput.module.css'
import baseInputStyles from '@components/Input/BaseInput.module.css'

interface Props {
  value: Date
  onChange: (value: Date) => void
  labelRight?: string
  labelLeft?: string
  className?: string
  width?: number
}

const DatePicker: React.FC<Props> = ({
  value,
  onChange,
  labelLeft,
  labelRight,
  className,
  width
}) => (
  <div className={classNames(styles.wholeContainer, className)}>
    {labelLeft && <div className={styles.labelLeft}>{labelLeft}</div>}
    <div style={{ width }} className={classNames(baseInputStyles.inputContainer)}>
      <ReactDatePicker selected={value} onChange={onChange} className="text-white font-semibold bg-transparent" />
    </div>
    {labelRight && <span className={styles.labelRight}>{labelRight}</span>}
  </div>
)

export default DatePicker

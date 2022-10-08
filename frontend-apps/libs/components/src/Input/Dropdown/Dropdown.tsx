import React from 'react'

import styles from './Dropdown.module.css'
import baseInputStyles from '../BaseInput.module.css'

interface Props {
  onChange: (value: any) => void
  options: SelectOption[]
  label: string
  width?: number
}

export interface SelectOption {
  value: string | number | boolean
  label: string
}

const Dropdown: React.FC<Props> = ({ onChange, options, label, width }) => (
  <div className={styles.dropdownContainer}>
    <span className={styles.labelLeft}>{label}</span>
    <div style={{ width }} className={baseInputStyles.inputContainer}>
      <select className={baseInputStyles.input} onChange={(e) => onChange(e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option.value.toString()}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </div>
)

export default Dropdown

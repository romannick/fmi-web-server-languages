import React from 'react'

import styles from './SwitchButton.module.css'
import Button from '@components/Input/Button/Button'

interface Props {
  options: string[]
  selected: number
  onChange: (selected: number) => void
}

const SwitchButton: React.FC<Props> = ({ options, selected, onChange }) => (
  <div className={styles.switchButtons} style={{ width: options.length * 160 }}>
    {options.map((option, index) => (
      <Button
        key={index}
        text={option}
        size="md"
        onClick={() => onChange(index)}
        variant={selected === index ? 'purple' : 'default'}
      />
    ))}
  </div>
)

export default SwitchButton

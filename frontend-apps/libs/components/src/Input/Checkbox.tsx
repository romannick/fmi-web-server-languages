import React, { useState } from 'react'

interface Props {
  label: string
  value: boolean
  onChange: (value: boolean) => void
}

const Checkbox: React.FC<Props> = ({ label, value, onChange }) => {
  const [checked, setChecked] = useState<boolean>(value)

  const onChangeInternal = () => {
    const newVal = !checked

    setChecked(newVal)
    onChange(newVal)
  }

  return (
    <>
      <input type="checkbox" value={String(value)} onChange={onChangeInternal} />
      <span>{label}</span>
    </>
  )
}

export default Checkbox

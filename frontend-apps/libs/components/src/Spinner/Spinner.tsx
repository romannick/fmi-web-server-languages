import React from 'react'
import classNames from 'classnames'

import styles from './Spinner.module.css'

interface Props {
  borderColor?: string
  size?: 'small' | 'medium' | 'large'
  withMarginTop?: boolean
}

const SPINNER_SIZES = {
  small: 'h-5 w-5 border-2',
  medium: 'h-8 w-8 border-4',
  large: 'h-10 w-10 border-4'
}

const Spinner: React.FC<Props> = ({ borderColor = '', size = 'small', withMarginTop = false }) => (
  <div className="flex justify-center items-center h-full w-full">
    <div
      aria-label="Spinner"
      className={classNames(
        `rounded-full ${withMarginTop ? styles.withMarginTop : ''} ${
          SPINNER_SIZES[size]
        } ${borderColor}`,
        styles.spinner
      )}
      style={{ borderRightColor: 'transparent' }}
    />
  </div>
)

export default Spinner

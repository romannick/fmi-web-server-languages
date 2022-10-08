import React from 'react'
import Svg, { exclamationOutline, block, checkmarkOutline } from '../Svg'
import styles from './MessageBox.module.css'

export enum MessageType {
  Warning,
  Error,
  Success
}

interface Props {
  type: MessageType
  children: React.ReactNode
  className?: string
  limitedWidth?: boolean
}

const backgroundColor = {
  [MessageType.Warning]:
    'bg-yellow_warning_bg border-solid border-2 border-yellow_warning_border text-yellow_warning_message',
  [MessageType.Error]:
    'bg-red_error_bg border-solid border-2 border-red_error_border text-red_error_message',
  [MessageType.Success]:
    'bg-green_success_bg border-solid border-2 border-green_success_border text-green_success_message'
}

const icon = {
  [MessageType.Warning]: <Svg path={exclamationOutline} color="color-yellow_warning_message" />,
  [MessageType.Error]: <Svg  className={styles.errorColor} path={block} />,
  [MessageType.Success]: <Svg path={checkmarkOutline} color="color-green_success_message" />
}

const message = {
  [MessageType.Warning]: (
    <span className="color-yellow_warning_message font-semibold mr-2 ml-2">Warning!</span>
  ),
  [MessageType.Error]: (
    <span className={styles.error}>Error!</span>
  ),
  [MessageType.Success]: (
    <span className="color-green_success_message font-semibold mr-2 ml-2">Success!</span>
  )
}

const MessageBox: React.FC<Props> = ({ type, children, className = '', limitedWidth = false }) => (
  <div
    className={`${backgroundColor[type]} ${className} ${
      limitedWidth ? 'w-max' : ''
    } p-3 rounded-lg text-center flex items-center justify-center`}
  >
    {icon[type]}
    {message[type]}
    {children}
  </div>
)

export default MessageBox

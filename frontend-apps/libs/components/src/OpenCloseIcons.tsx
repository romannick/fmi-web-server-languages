import React from 'react'

export const open = (
  <div className="w-6 h-6 rounded-full flex justify-center items-center relative">
    <div className="w-3/5 bg-blue-700 absolute" style={{ height: '3.5px' }} />
    <div className="h-3/5 bg-blue-700 absolute" style={{ width: '3.5px' }} />
  </div>
)

export const close = (
  <div className="w-6 h-6 rounded-full flex justify-center items-center relative">
    <div
      className="bg-blue-700 absolute"
      style={{ width: '20%', height: '50%', transform: 'skewX(45deg)' }}
    />
    <div
      className="bg-blue-700 absolute"
      style={{ width: '20%', height: '50%', transform: 'skewX(135deg)' }}
    />
  </div>
)

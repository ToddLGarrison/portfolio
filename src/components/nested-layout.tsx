import React, { FC } from 'react'

const NestedLayout: FC = ({ children }) => (
  <div className="flex justify-center">
    <div className="w-11/12 lg:w-7/12">{children}</div>
  </div>
)
export default NestedLayout

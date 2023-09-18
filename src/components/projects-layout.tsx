import React, { FC } from 'react'

const ProjectsLayout: FC = ({ children }) => (
  <div className="flex justify-center">
    <div className="w-11/12">{children}</div>
  </div>
)
export default ProjectsLayout

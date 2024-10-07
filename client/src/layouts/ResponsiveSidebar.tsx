import React from 'react'
import { responsiveSidebarProp } from '../models/PropType'

const ResponsiveSidebar:React.FC<responsiveSidebarProp> = ({children, className}) => {
  return (
    <div className={className}>
        {children}
    </div>
  )
}

export default ResponsiveSidebar
import React from 'react'

const ResponsiveSidebar = ({children, className}) => {
  return (
    <div className={className}>
        {children}
    </div>
  )
}

export default ResponsiveSidebar
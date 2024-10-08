import React from 'react'
import { descriptionIconProp } from '../../models/IconType'

const DescriptionIcon:React.FC<descriptionIconProp> = ({width, height}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path fill="var(--ci-primary-color, currentColor)" d="M334.627,16H48V496H472V153.373ZM440,166.627V168H320V48h1.373ZM80,464V48H288V200H440V464Z" className="ci-primary"/>
    <rect width="224" height="32" x="136" y="296" fill="var(--ci-primary-color, currentColor)" className="ci-primary"/>
    <rect width="224" height="32" x="136" y="376" fill="var(--ci-primary-color, currentColor)" className="ci-primary"/>
  </svg>
  
  )
}

export default DescriptionIcon
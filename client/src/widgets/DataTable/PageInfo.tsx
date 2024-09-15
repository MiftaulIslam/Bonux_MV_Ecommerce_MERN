import { FC } from 'react'

/**
 * Shows table information
 * @description 
 * - Length: Number of items in the table
 * - startIndex: First item index
 * - endIndex: Last item index
 */
const PageInfo:FC<{
  length: number,
  startIndex: number,
  endIndex: number 
}> = ({length, startIndex, endIndex}) => {
  return (
    <p className="text-sm leading-5 text-blue-700">
    Showing
    <span className="font-medium mx-1">{startIndex}</span>
    to
    <span className="font-medium mx-1">
      {endIndex}
    </span>
    of
    <span className="font-medium mx-1">{length}</span>
    results
  </p>
  )
}

export default PageInfo
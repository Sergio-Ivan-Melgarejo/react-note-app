import React from 'react'

const Status = ({statusCode}) => {
  return (
    <div className='statusCodeContainer'>
        {statusCode === 0 ? null : ""}
        {statusCode === 1 ? "saving..." : ""}
        {statusCode === 2 ? "document saved" : ""}
    </div>
  )
}

export default Status
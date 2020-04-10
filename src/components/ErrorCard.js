import React from 'react'

const ErrorCard = ({ errorStatus}) => {
  return (
    <>
      <p>
      {errorStatus}
      </p>
    </>
  )
}

export default ErrorCard
import React from 'react'

const Emoji = ({data, clicktest}) => {
  return (
    <>
      <div 
      onClick={() => clicktest(data)}
      className="emoji-card">
        <h2>{data.character}</h2>
      </div>
    </>
  )
}

export default Emoji
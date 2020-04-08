import React from 'react'

const Emoji = ({data, clicktest}) => {
  return (
    <>
      <div 
      onClick={() => clicktest(data)}
      className="emoji-card">
        <h2>{data.character}</h2>
        <p>
          {data.unicodeName.split(' ').map(i => i.charAt().toUpperCase() + i.slice(1).toLowerCase()).join(' ')}
        </p>
      </div>
    </>
  )
}

export default Emoji
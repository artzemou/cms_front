import React from 'react'
import useRipple from 'useripple'

function Ripple(props) {
  const [
    addRipple, // Attach this to any mouse event listener
    ripples, // Render this to see the ripples
  ] = useRipple({
    // You can pass ripples` CSS here (no worries, it's optional)
    background: 'rgba(0, 0, 0, 0.2)',
  })

  // Look how simple it is!
  return (
    <div className="Ripple" onClick={addRipple}>
      {ripples}
      {props.content}
    </div>
  )
}

export default Ripple

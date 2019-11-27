import React, { useState } from 'react'
import T from 'i18n-react'

function Example() {
  // Déclare une nouvelle variable d'état, qu’on va appeler « count »
  const [count, setCount] = useState(0)

  return (
    <>
      <p>{T.translate('home.title', { myName: 'i18n-react' })}</p>
      <p>Vous avez cliqué {count} fois</p>
      <button onClick={() => setCount(count + 1)}>Cliquez ici</button>
    </>
  )
}

export default Example

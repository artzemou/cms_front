import React, { useEffect } from 'react'
import T from 'i18n-react'
import r from '../utils/clearURL'

const locales = {
  'fr-FR': require('../locales/fr-FR.json'),
  'en-US': require('../locales/en-US.json'),
}
T.setTexts(locales['fr-FR'])
function LocalesSelect(props) {
  // Déclare une nouvelle variable d'état, qu’on va appeler « count »
  // const [locale, setLocale] = useState('fr-FR')

  useEffect(() => {
    T.setTexts(locales[props.state.locale])
  }, [props.state.locale])

  return (
    <>
      <ul className="Locales-select">
        {Object.keys(locales).map(key => (
          <li
            key={key}
            onClick={() => {
              sessionStorage.setItem('LOCALE', key)
              for (let [jsonKey, value] of Object.entries(
                locales[key]['nav']
              )) {
                if (
                  `/${r(T.translate(`nav.${jsonKey}`))}` ===
                  window.location.pathname
                ) {
                  window.location.pathname = `/${r(value)}`
                }
              }
            }}
          >
            {key === 'fr-FR' ? 'fr' : 'en'}
          </li>
        ))}
      </ul>
    </>
  )
}
//onClick={() => setLocale(key)}
export default LocalesSelect

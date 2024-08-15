import React from 'react'
import styles from "./ThankYou.module.scss"
import { useLanguage } from '../../context/Language/LanguageContext'

const ThankYou = () => {
  const {currentLanguage} = useLanguage()
  return (
    <div className={styles.wrapper}>
      <h1>{currentLanguage==='en'?<>Thank You!</>:currentLanguage==='sq'?<>Faleminderit!</>:currentLanguage==='sr'?<>Hvala ti!</>:<>Danke schön!</>}</h1>
      <p>{currentLanguage==='en'?<>Our team has recieved your message and will be in touch with you shortly</>:currentLanguage==='sq'?<>Ekipi ynë ka marrë mesazhin tuaj dhe do t'ju kontaktojë së shpejti</>:currentLanguage==='sr'?<>Naš tim je primio vašu poruku i uskoro će vas kontaktirati</>:<>Unser Team hat Ihre Nachricht erhalten und wird sich in Kürze mit Ihnen in Verbindung setzen</>}</p>
      <button onClick={() => window.open('/','_self')}>{currentLanguage==='en'?<>Go Back</>:currentLanguage==='sq'?<>Kthehu Mbrapa</>:currentLanguage==='sr'?<>Vrati Se</>:<>Geh Zurück</>}</button>
    </div>
  )
}

export default ThankYou
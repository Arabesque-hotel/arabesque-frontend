import React from "react";
import styles from "./Contact.module.scss";
import Entries from "../../components/entries/Entries";
import { useLanguage } from "../../context/Language/LanguageContext";

const Contact = () => {
  const { currentLanguage } = useLanguage();
  return (
    <div className={styles.contactWrapper}>
      <div className={styles.hero}>
        <h2>
          {currentLanguage === "en" ? (
            <>Contact Us</>
          ) : currentLanguage === "sq" ? (
            <>Na kontaktoni</>
          ) : currentLanguage === "sr" ? (
            <>Kontaktiraj Nas</>
          ) : (
            <>Kontaktiere Uns</>
          )}
        </h2>
        <div>
          <div>
            <h5>
              {currentLanguage === "en" ? (
                <>Phone Number</>
              ) : currentLanguage === "sq" ? (
                <>Numri i telefonit</>
              ) : currentLanguage === "sr" ? (
                <>Telefonski broj</>
              ) : (
                <>Telefonnummer</>
              )}
            </h5>
            <a href="tel:+38349123456">+383 49 123-456</a>
          </div>
          <div>
            <h5>
              {currentLanguage === "en" ? (
                <>Email Address</>
              ) : currentLanguage === "sq" ? (
                <>Adresa e emailit</>
              ) : currentLanguage === "sr" ? (
                <>Email adresa</>
              ) : (
                <>Email Adresse</>
              )}
            </h5>
            <a href="mailto:info@hotelarabesque.com">info@hotelarabesque.com</a>
          </div>
          <div>
            <h5>
              {currentLanguage === "en" ? (
                <>Location</>
              ) : currentLanguage === "sq" ? (
                <>Vendndodhja</>
              ) : currentLanguage === "sr" ? (
                <>Lokacija</>
              ) : (
                <>Standort</>
              )}
            </h5>
            <a href="https://www.google.com/maps?ll=41.923784,19.208761&z=16&t=m&hl=en-US&gl=US&mapclient=embed&cid=14736180640373750885">
              Ulcinj, Montenegro
            </a>
          </div>
        </div>
      </div>
      <div className={styles.section2}>
        <div className={styles.entriesWrapper}>
          <h3>
            {currentLanguage === "en" ? (
              <>Send a Message</>
            ) : currentLanguage === "sq" ? (
              <>Dergo nje mesazh</>
            ) : currentLanguage === "sr" ? (
              <>Pošaljite poruku</>
            ) : (
              <>Eine Nachricht schicken</>
            )}
          </h3>
          <Entries />
        </div>
        <iframe
          loading="lazy"
          title="Maps"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC65Azad6Qh_IIqdiDjfz-NvJdEzZLfAiU
          &q=Hotel+Arabesque"
        ></iframe>
      </div>
      <div className={styles.section3} />
    </div>
  );
};

export default Contact;

import React, { useEffect, useState } from "react";
import styles from "./Gallery.module.scss";
import { useLanguage } from "../../context/Language/LanguageContext";
import axios from "axios";

const Gallery = () => {
  const [galleryResponse, setGalleryResponse] = useState({
    Column1_MOBILE: [],
    Column2: [],
    Column3: [],
  });
  const backUrl = "http://localhost:1337";

  useEffect(() => {
    axios
      .get(backUrl + `/api/gallery?populate=deep`)
      .then((res) => {
        setGalleryResponse(res.data.data.attributes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { currentLanguage } = useLanguage();
  return (
    <div className={styles.galleryWrapper}>
      <div className={styles.blueSection}>
        <h1>
          {currentLanguage === "en" ? (
            <>Gallery</>
          ) : currentLanguage === "sq" ? (
            <>Galleri</>
          ) : currentLanguage === "sr" ? (
            <>Galerija</>
          ) : (
            <>Galerie</>
          )}
        </h1>
        <h3>
          {currentLanguage === "en" ? (
            <>
              Enjoy a Collection of
              <br />
              Moments at Arabesque Hotel
            </>
          ) : currentLanguage === "sq" ? (
            <>
              Shijoni një koleksion
              <br />
              Momentesh në Arabesque Hotel
            </>
          ) : currentLanguage === "sr" ? (
            <>
              Uživajte u kolekciji
              <br />
              Trenuci u Arabesque Hotel
            </>
          ) : (
            <>
              Genießen Sie eine Sammlung
              <br />
              von Momenten im Arabesque Hotel
            </>
          )}
        </h3>
      </div>
      <div className={styles.gallerySection}>
        <div className={styles.column} style={{ display: "flex" }}>
          {galleryResponse.Column1_MOBILE.map((data,index) => {
            console.log(data)
            return (
              <img
                key={index}
                src={backUrl + data.image.data.attributes.url}
                height={data.height}
                alt=""
              />
            );
          })}
        </div>
        <div className={styles.column}>
          {galleryResponse.Column2.map((data,index) => {
            return (
              <img
                key={index}
                src={backUrl + data.image.data.attributes.url}
                height={data.height}
                alt=""
              />
            );
          })}
        </div>
        <div className={styles.column}>
          {galleryResponse.Column3.map((data,index) => {
            return (
              <img
                key={index}
                src={backUrl + data.image.data.attributes.url}
                height={data.height}
                alt=""
              />
            );
          })}
        </div>
      </div>
      <div className={styles.blueSection2}>
        <div className={styles.textSection}>
          <h5>
            {currentLanguage === "en" ? (
              "Phone Number"
            ) : currentLanguage === "sq" ? (
              "Numri i telefonit"
            ) : currentLanguage === "sr" ? (
              <>Telefonski broj</>
            ) : (
              <>Telefonnummer</>
            )}
          </h5>
          <a href="tel:+38349123456">+383 49 123-456</a>
        </div>
        <div className={styles.textSection}>
          <h5>
            {currentLanguage === "en" ? (
              "Email Address"
            ) : currentLanguage === "sq" ? (
              "Adresa e emailit"
            ) : currentLanguage === "sr" ? (
              <>Email adresa</>
            ) : (
              <>Email Adresse</>
            )}
          </h5>
          <a href="mailto:info@hotelarabesque.com">info@hotelarabesque.com</a>
        </div>
        <div className={styles.textSection}>
          <h5>
            {currentLanguage === "en" ? (
              "Location"
            ) : currentLanguage === "sq" ? (
              "Vendndodhja"
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
  );
};

export default Gallery;

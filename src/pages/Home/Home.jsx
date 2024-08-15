import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./Home.module.scss";
import blueLogo from "../../assets/blueLogo.svg";
import section2vid from "../../assets/section2vid.mp4";
import axios from "axios";
import freeParking from "../../assets/parking.svg";
import family from "../../assets/family.svg";
import noSmoking from "../../assets/noSmoking.svg";
import foodTray from "../../assets/foodTray.svg";
import wifiLocation from "../../assets/wifiLocation.svg";
import qoute from "../../assets/quote.svg";
import KosovoMap from "../../components/KosovoMap/KosovoMap";
import placeholder from "../../assets/placeholder.png";
import { useLanguage } from "../../context/Language/LanguageContext";

function scrollButtons(direction) {
  if (
    document?.getElementById("gallery") === null ||
    document?.getElementById("galleryImg") === null
  ) {
    return;
  }
  let gallery = document?.getElementById("gallery");
  let galleryImgWidth =
    document?.getElementById("galleryImg").getBoundingClientRect().width + 30; //plus the gap
  let scrollTarget = Math.min(
    (Math.round(gallery.scrollLeft / galleryImgWidth) + direction) *
      galleryImgWidth, //makes the scrolled distance snap into integers (0,1,2) and multiply that integer with the width of an image to get perfect snapping every button press, and even when the user has ruined the alignment after using the scrollbar
    galleryImgWidth * gallery.children.length
  );

  gallery.scrollTo({
    top: 0,
    left: scrollTarget,
    behavior: "smooth",
  });
}
function scrollReviews(direction, style = "smooth") {
  if (
    document?.getElementById("reviewsWrapper") === null ||
    document?.getElementById("review") === null
  ) {
    return;
  }
  let gallery = document.getElementById("reviewsWrapper");
  let galleryImgWidth =
    document.getElementById("review").getBoundingClientRect().width + 0; //plus the gap
  let scrollTarget = Math.min(
    (Math.round(gallery.scrollLeft / galleryImgWidth) + direction) *
      galleryImgWidth, //makes the scrolled distance snap into integers (0,1,2) and multiply that integer with the width of an image to get perfect snapping every button press, and even when the user has ruined the alignment after using the scrollbar
    galleryImgWidth * gallery.children.length
  );

  gallery.scrollTo({
    top: 0,
    left: scrollTarget,
    behavior: style,
  });
}

const Home = () => {
  const { currentLanguage } = useLanguage();
  const backUrl = "http://localhost:1337";
  const [roomsResponse, setRoomsResponse] = useState([]);
  const [reviewsResponse, setReviewsResponse] = useState([]);
  const [apiSuccess, setApiSuccess] = useState(false);
  
  useEffect(() => {
    if(currentLanguage !== '') {
      axios
      .get(backUrl + `/api/reviews?locale=${currentLanguage}`)
      .then((res) => {
      setReviewsResponse(res.data.data);
      setApiSuccess(true);
    })
    .catch((err) => {
      setApiSuccess(false);
      console.log(err);
    });
    axios
      .get(
        backUrl +
          `/api/rooms?populate[1]=images&locale=${currentLanguage}&sort=order`
      )
      .then((res) => {
        setRoomsResponse(res.data.data);
        setApiSuccess(true);
      })
      .catch((err) => {
        setApiSuccess(false);
        console.log(err);
      });
    }
  }, [currentLanguage]);

  //to prevent the scrolling sections being unaligned, we scroll to the current image each resize, since resizing is what unaligns the scrolls
  window.onresize = () => {
    scrollButtons(0);
    scrollReviews(0, "instant");
  };


  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <div className={styles.heroImg} alt="" />
        <h1>Hotel Arabesque</h1>
        <p>Ulcinj, Montenegro</p>
      </div>
      <div className={styles.section2}>
        <img src={blueLogo} alt="" />
        <div>
          <div>
            <div>
              <h5>
                {currentLanguage === "en" ? (
                  "Memories"
                ) : currentLanguage === "sq" ? (
                  "Kutimet"
                ) : currentLanguage === "sr" ? (
                  <>Uspomene</>
                ) : (
                  <>Erinnerungen</>
                )}
              </h5>
              <p>
                {currentLanguage === "en" ? (
                  "Create lasting memories in our comfortable accommodations."
                ) : currentLanguage === "sq" ? (
                  "Krijoni kujtime të paharrushme në Hotel Arabesque"
                ) : currentLanguage === "sr" ? (
                  <>Stvorite trajne uspomene u našem udobnom smještaju.</>
                ) : (
                  <>Schaffen Sie bleibende Erinnerungen in unseren komfortablen Unterkünften.</>
                )}
              </p>
            </div>
            <div>
              <h5>
                {currentLanguage === "en" ? (
                  "Enjoyment"
                ) : currentLanguage === "sq" ? (
                  "Kënaqësi"
                ) : currentLanguage === "sr" ? (
                  <>Uživanje</>
                ) : (
                  <>Vergnügen</>
                )}
              </h5>
              <p>
                {currentLanguage === "en" ? (
                  "Indulge in enjoyable moments in our inviting spaces."
                ) : currentLanguage === "sq" ? (
                  "KKënaquni dhe krijoni momente të bukura në ambientet tona plot gjallëri dhe komoditet."
                ) : currentLanguage === "sr" ? (
                  <>Indulge in enjoyable moments in our inviting spaces.</>
                ) : (
                  <>Gönnen Sie sich genussvolle Momente in unseren einladenden Räumlichkeiten.</>
                )}
              </p>
            </div>
            <div>
              <h5>
                {currentLanguage === "en" ? (
                  "Nature"
                ) : currentLanguage === "sq" ? (
                  "Natyrë"
                ) : currentLanguage === "sr" ? (
                  <>Priroda</>
                ) : (
                  <>Natur</>
                )}
              </h5>
              <p>
                {currentLanguage === "en" ? (
                  "Connect with nature in our eco-friendly rooms."
                ) : currentLanguage === "sq" ? (
                  "Lidhu me natyrën dhe përjeto freskinë e detit me ne."
                ) : currentLanguage === "sr" ? (
                  <>Povežite se s prirodom u našim ekološkim sobama.</>
                ) : (
                  <>Verbinden Sie sich mit der Natur in unseren umweltfreundlichen Zimmern.</>
                )}
              </p>
            </div>
          </div>
          <video autoPlay muted loop>
            <source src={section2vid} type="video/mp4" />
          </video>
          <div>
            <div>
              <h5>
                {currentLanguage === "en" ? (
                  "Comfort"
                ) : currentLanguage === "sq" ? (
                  "Rehati"
                ) : currentLanguage === "sr" ? (
                  <>Udobnost</>
                ) : (
                  <>Komfort</>
                )}
              </h5>
              <p>
                {currentLanguage === "en" ? (
                  "Experience unparalleled comfort in our well-designed rooms."
                ) : currentLanguage === "sq" ? (
                  "Përjetoni rehati maksimale në ambientet tona moderne."
                ) : currentLanguage === "sr" ? (
                  <>
                    Doživite udobnost bez premca u našim dobro dizajniranim
                    sobama.
                  </>
                ) : (
                  <>Erleben Sie unvergleichlichen Komfort in unseren gut gestalteten Zimmern.</>
                )}
              </p>
            </div>
            <div>
              <h5>
                {currentLanguage === "en" ? (
                  "Elegance"
                ) : currentLanguage === "sq" ? (
                  "Eleganca"
                ) : currentLanguage === "sr" ? (
                  <>Elegancija</>
                ) : (
                  <>Eleganz</>
                )}
              </h5>
              <p>
                {currentLanguage === "en" ? (
                  "Indulge in enjoyable moments in our inviting spaces."
                ) : currentLanguage === "sq" ? (
                  "Ambienti ynë elegant, ofron mundësi të shumta që ju të kënaqeni më shumë se asnjëherë më parë."
                ) : currentLanguage === "sr" ? (
                  <>
                    Prepustite se ugodnim trenucima u našim privlačnim
                    prostorima.
                  </>
                ) : (
                  <>Gönnen Sie sich genussvolle Momente in unseren einladenden Räumlichkeiten.</>
                )}
              </p>
            </div>
            <div>
              <h5>
                {currentLanguage === "en" ? (
                  "Cleanliness"
                ) : currentLanguage === "sq" ? (
                  "Pastërtia"
                ) : currentLanguage === "sr" ? (
                  <>Čistoća</>
                ) : (
                  <>Sauberkeit</>
                )}
              </h5>
              <p>
                {currentLanguage === "en" ? (
                  "Rest assured in our impeccably clean rooms."
                ) : currentLanguage === "sq" ? (
                  "Ndihuni të sigurtë në dhomat tona të pastra dhe komode për pushime të paharrueshme."
                ) : currentLanguage === "sr" ? (
                  <>Budite sigurni u naše besprijekorno čiste sobe.</>
                ) : (
                  <>In unseren tadellos sauberen Zimmern können Sie sich beruhigt zurücklehnen.</>
                )}
              </p>
            </div>
          </div>
        </div>
        <p style={{ textAlign: "center" }}>
          {currentLanguage === "en" ? (
            <>Enjoy your vacation</>
          ) : currentLanguage === "sq" ? (
            <>Shijoni pushimet tuaja</>
          ) : currentLanguage === "sr" ? (
            <>Uživajte u odmoru</>
          ) : (
            <>Genieß deinen Urlaub</>
          )}
        </p>
      </div>
      <div className={styles.roomsWrapper}>
        <div className={styles.text}>
          <h2>
            {currentLanguage === "en" ? (
              "Our Fancy Hotel Rooms"
            ) : currentLanguage === "sq" ? (
              "Dhomat e Hotelit"
            ) : currentLanguage === "sr" ? (
              <>Naše elegantne hotelske sobe</>
            ) : (
              <>Unsere schicken Hotelzimmer</>
            )}
          </h2>
          <p>
            {currentLanguage === "en" ? (
              "Discover comfort and elegance in our stylishly appointed hotel rooms, designed for your ultimate relaxation and convenience."
            ) : currentLanguage === "sq" ? (
              "Zbuloni rehati dhe elegancë në dhomat tona të dizajnuara për t'ju ofruar relaks dhe komoditet të plotë."
            ) : currentLanguage === "sr" ? (
              <>
                Otkrijte udobnost i eleganciju u našim elegantno uređenim
                hotelskim sobama, dizajniranim za vaše vrhunsko opuštanje i
                udobnost.
              </>
            ) : (
              <>Discover comfort and elegance in our stylishly appointed hotel rooms, designed for your ultimate relaxation and convenience.</>
            )}
          </p>
        </div>
        <div className={styles.blueWrapper}>
          <div className={styles.gallery} id="gallery">
            {roomsResponse.map((res, index) => {
              return (
                <div key={index} className={styles.imgWrapper} id="galleryImg">
                  <p className={styles.imgText}>
                    {apiSuccess ? res.attributes.title : "Loading..."}
                  </p>
                  <div className={styles.gradient} />
                  <img
                    onClick={() => {
                      window.open(`/rooms?room=${res.id}`, "_self");
                    }}
                    src={
                      apiSuccess
                        ? `${backUrl}${res.attributes.images.data[0].attributes.url}`
                        : placeholder
                    }
                    alt=""
                  />
                </div>
              );
            })}
          </div>
          <div className={styles.buttonWrapper}>
            <svg
              width="50"
              height="50"
              onClick={() => {
                scrollButtons(-1);
              }}
              className={styles.button}
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="25"
                cy="25"
                r="24.5"
                transform="matrix(-1 0 0 1 50 0)"
                stroke="white"
              />
              <path
                d="M14.5408 25.4389C19.3854 25.4389 23.3128 21.5116 23.3128 16.667M14.5408 25.4389C19.3854 25.4389 23.3128 29.3662 23.3128 34.2109M14.5408 25.4389H35.0877"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
            <svg
              width="50"
              height="50"
              onClick={() => {
                scrollButtons(1);
              }}
              style={{ transform: "rotate(180deg)" }}
              className={styles.button}
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="25"
                cy="25"
                r="24.5"
                transform="matrix(-1 0 0 1 50 0)"
                stroke="white"
                fill="none"
              />
              <path
                d="M14.5408 25.4389C19.3854 25.4389 23.3128 21.5116 23.3128 16.667M14.5408 25.4389C19.3854 25.4389 23.3128 29.3662 23.3128 34.2109M14.5408 25.4389H35.0877"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div className={styles.facts}>
            <div className={styles.fact}>
              <img src={freeParking} alt="" />
              <h4>
                {currentLanguage === "en" ? (
                  "Free Parking"
                ) : currentLanguage === "sq" ? (
                  "Parkim falas"
                ) : currentLanguage === "sr" ? (
                  <>Besplatan Parking</>
                ) : (
                  <>Gratis Parkplätze</>
                )}
              </h4>
            </div>
            <div className={styles.fact}>
              <img src={family} alt="" />
              <h4>
                {currentLanguage === "en" ? (
                  "Family Rooms"
                ) : currentLanguage === "sq" ? (
                  "Dhomat familjare"
                ) : currentLanguage === "sr" ? (
                  <>Porodične Sobe</>
                ) : (
                  <>Familienzimmer</>
                )}
              </h4>
            </div>
            <div className={styles.fact}>
              <img src={noSmoking} alt="" />
              <h4>
                {currentLanguage === "en" ? (
                  "Non-smoking"
                ) : currentLanguage === "sq" ? (
                  "Ndalohet duhani"
                ) : currentLanguage === "sr" ? (
                  <>Zabranjeno Pušenje</>
                ) : (
                  <>Nichtraucher</>
                )}
              </h4>
            </div>
            <div className={styles.fact}>
              <img src={foodTray} alt="" />
              <h4>
                {currentLanguage === "en" ? (
                  "Room Service"
                ) : currentLanguage === "sq" ? (
                  "Shërbimi në dhomë"
                ) : currentLanguage === "sr" ? (
                  <>Sobna Usluga</>
                ) : (
                  <>Zimmerservice</>
                )}
              </h4>
            </div>
            <div className={styles.fact}>
              <img src={wifiLocation} alt="" />
              <h4>
                {currentLanguage === "en" ? (
                  "Free Wifi"
                ) : currentLanguage === "sq" ? (
                  "Wifi falas"
                ) : currentLanguage === "sr" ? (
                  <>Besplatan Wifi</>
                ) : (
                  <>Gratis Wifi</>
                )}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section3}>
        <div className={styles.happyCustomers}>
          <img src={qoute} alt="" />
          <p>
            {currentLanguage === "en" ? (
              "Happy Clients"
            ) : currentLanguage === "sq" ? (
              "Klientë të lumtur"
            ) : currentLanguage === "sr" ? (
              <>Sretni Klijenti</>
            ) : (
              <>Zufriedene Kunden</>
            )}
          </p>
        </div>
        <div className={styles.reviewsWrapper} id="reviewsWrapper">
          {reviewsResponse.map((res, index) => {
            return (
              <div key={index} className={styles.review} id="review">
                <h4>{apiSuccess ? res.attributes.reviewText : "Loading..."}</h4>
                <div className={styles.reviewerInfo}>
                  <h6>{res.attributes.reviewer}</h6>
                  <p>{res.attributes.room}</p>
                  <div className={styles.stars}>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 2.33325L17.605 9.63659L25.6666 10.8149L19.8333 16.4966L21.21 24.5233L14 20.7316L6.78998 24.5233L8.16665 16.4966L2.33331 10.8149L10.395 9.63659L14 2.33325Z"
                        fill="#394D8B"
                      />
                    </svg>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        opacity: res.attributes.stars >= 2 ? "1" : "0.4",
                      }}
                    >
                      <path
                        d="M14 2.33325L17.605 9.63659L25.6666 10.8149L19.8333 16.4966L21.21 24.5233L14 20.7316L6.78998 24.5233L8.16665 16.4966L2.33331 10.8149L10.395 9.63659L14 2.33325Z"
                        fill="#394B8B"
                      />
                    </svg>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        opacity: res.attributes.stars >= 3 ? "1" : "0.4",
                      }}
                    >
                      <path
                        d="M14 2.33325L17.605 9.63659L25.6666 10.8149L19.8333 16.4966L21.21 24.5233L14 20.7316L6.78998 24.5233L8.16665 16.4966L2.33331 10.8149L10.395 9.63659L14 2.33325Z"
                        fill="#394B8B"
                      />
                    </svg>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        opacity: res.attributes.stars >= 4 ? "1" : "0.4",
                      }}
                    >
                      <path
                        d="M14 2.33325L17.605 9.63659L25.6666 10.8149L19.8333 16.4966L21.21 24.5233L14 20.7316L6.78998 24.5233L8.16665 16.4966L2.33331 10.8149L10.395 9.63659L14 2.33325Z"
                        fill="#394B8B"
                      />
                    </svg>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        opacity: res.attributes.stars >= 5 ? "1" : "0.4",
                      }}
                    >
                      <path
                        d="M14 2.33325L17.605 9.63659L25.6666 10.8149L19.8333 16.4966L21.21 24.5233L14 20.7316L6.78998 24.5233L8.16665 16.4966L2.33331 10.8149L10.395 9.63659L14 2.33325Z"
                        fill="#394B8B"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.reviewButtonWrapper}>
          <svg
            onClick={() => {
              scrollReviews(-1);
            }}
            width="50"
            height="50"
            viewBox="0 0 50 50"
            className={styles.buttons}
            style={{
              left: "70px",
            }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="25"
              cy="25"
              r="25"
              transform="matrix(-1 0 0 1 50 0)"
              fill="#1F2C34"
            />
            <path
              d="M14.5408 25.4389C19.3854 25.4389 23.3128 21.5116 23.3128 16.667M14.5408 25.4389C19.3854 25.4389 23.3128 29.3662 23.3128 34.2109M14.5408 25.4389H35.0877"
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>
          <svg
            onClick={() => {
              scrollReviews(1);
            }}
            width="50"
            height="50"
            className={styles.buttons}
            style={{
              transform: "rotate(180deg)",
              right: "70px",
            }}
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="25"
              cy="25"
              r="25"
              transform="matrix(-1 0 0 1 50 0)"
              fill="#1F2C34"
            />
            <path
              d="M14.5408 25.4389C19.3854 25.4389 23.3128 21.5116 23.3128 16.667M14.5408 25.4389C19.3854 25.4389 23.3128 29.3662 23.3128 34.2109M14.5408 25.4389H35.0877"
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
      <div className={styles.section4}>
        <p className={styles.enjoyText}>
          {currentLanguage === "en" ? (
            "Enjoy your vacation"
          ) : currentLanguage === "sq" ? (
            "Shijoni pushimet tuaja"
          ) : currentLanguage === "sr" ? (
            <>Uživajte u odmoru</>
          ) : (
            <>Genieß deinen Urlaub</>
          )}
        </p>
        <h2>
          {currentLanguage === "en" ? (
            "Book Your Magical Vacation"
          ) : currentLanguage === "sq" ? (
            "Rezervoni pushimet tuaja magjike"
          ) : currentLanguage === "sr" ? (
            <>Rezervirajte Svoj Čarobni Odmor</>
          ) : (
            <>Buchen Sie Ihren magischen Urlaub</>
          )}
        </h2>
        <button
          onClick={() => {
            window.open("https://www.booking.com/Share-hAUEA1", "_self");
          }}
        >
          {currentLanguage === "en" ? (
            "Book Now"
          ) : currentLanguage === "sq" ? (
            "Rezervoni Tani"
          ) : currentLanguage === "sr" ? (
            <>Rezerva Odmah</>
          ) : (
            <>Reservieren</>
          )}
        </button>
      </div>
      <div className={styles.section5}>
        <KosovoMap />
        <div className={styles.blueSection}>
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
                <>E-mail adresa</>
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
    </div>
  );
};

export default Home;

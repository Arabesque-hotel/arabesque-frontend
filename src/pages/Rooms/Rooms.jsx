import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Rooms.module.scss";
import axios from "axios";
import { useLanguage } from "../../context/Language/LanguageContext";

import freeParking from "../../assets/roomsParking.svg";
import family from "../../assets/family.svg";
import noSmoking from "../../assets/noSmoking.svg";
import service from "../../assets/foodTray.svg";
import freeWifi from "../../assets/wifiLocation.svg";

function scrollGallery(index, galleryIndex) {
  let gallery = document.getElementById(`gallery${galleryIndex}`);
  let galleryImg = gallery.children[0];
  let galleryImgWidth = galleryImg.getBoundingClientRect().width + 0; //plus the gap
  let scrollTarget = Math.min(
    index * galleryImgWidth, //makes the scrolled distance snap into integers (0,1,2) and multiply that integer with the width of an image to get perfect snapping every button press, and even when the user has ruined the alignment after using the scrollbar
    galleryImgWidth * gallery.children.length
  );

  gallery.scrollTo({
    top: 0,
    left: scrollTarget,
    behavior: "smooth",
  });
}
let mouseX = 0;
let targetGallery = undefined;
let intervalId = [];
let finalScrollValue = 0;
let diff = 0;
let currentIndex = 0;
const backUrl = "http://localhost:1337";

let scrollTo = undefined;

const Rooms = () => {
  const { currentLanguage } = useLanguage();

  const [searchParams] = useSearchParams();
  scrollTo = parseInt(searchParams.get("room"));
  const [roomsResponse, setRoomsResponse] = useState([]);
  const [apiSuccess, setApiSuccess] = useState("loading...");

  useEffect(() => {
    if (currentLanguage !== "") {
      axios
        .get(
          backUrl +
            `/api/rooms?populate=deep&locale=${currentLanguage}&sort=order`
        )
        .then((res) => {
          setRoomsResponse(res.data.data);
          setTimeout(() => {
            setApiSuccess("Success");
          }, 50);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentLanguage]);

  document.onmouseup = handleMouseUp;

  function handleMouseUp(e) {
    document.body.style.cursor = "unset";
    if (targetGallery === undefined) {
      return;
    }
    let galleryIndex = parseInt(targetGallery.id.replace("gallery", ""));
    scrollGallery(currentIndex, galleryIndex);

    for (let id of intervalId) {
      //incase something happens, clicking the gallery will remove ALL intervals
      clearInterval(id);
    }
  }

  document.onmousemove = updateMousePos;
  function updateMousePos(e) {
    mouseX = e.clientX;
  }

  const [mobile, setMobile] = useState(window.innerWidth <= 1080);
  window.onresize = () => {
    setMobile(window.innerWidth <= 1080);
  };

  return (
    <div>
      <div className={styles.Rooms}>
        <h2
          style={{
            textAlign: "center",
            display: apiSuccess === "Success" ? "none" : "unset",
          }}
        >
          {apiSuccess}
        </h2>
        {roomsResponse.map((data, index) => {
          return (
            <Gallery
              reverse={index % 2 === 1}
              key={index}
              data={data}
              index={index}
              mobile={mobile}
            />
          );
        })}
      </div>
      <div className={styles.section4}>
        <p className={styles.enjoyText}>
          {currentLanguage === "en" ? (
            "Enjoy your Vacation"
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
            <>Rezervirajte svoj čarobni odmor</>
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
            "Rezervoni tani"
          ) : currentLanguage === "sr" ? (
            <>Rezerva</>
          ) : (
            <>Reservieren</>
          )}
        </button>
      </div>
    </div>
  );
};

const Gallery = ({ reverse, data, index, mobile }) => {
  const [currentImg, setCurrentImg] = useState(0);
  function handleButtons(dir) {
    targetGallery = document.getElementById(`gallery${index}`);
    let gallery = document.getElementById(`gallery${index}`);
    finalScrollValue = gallery.scrollLeft;
    let galleryImg = gallery.children[0];
    let galleryImgWidth = galleryImg.getBoundingClientRect().width + 0; //plus the gap
    let imgIndex = Math.round(gallery.scrollLeft / galleryImgWidth) + dir;

    if (imgIndex >= 0 && imgIndex < gallery.children.length) {
      setCurrentImg(imgIndex);
      scrollGallery(imgIndex, index);
    }
    currentIndex = imgIndex;
  }

  function handleMouseDown(e, index) {
    currentIndex = currentImg;
    targetGallery = document.getElementById(`gallery${index}`);
    let initScrollValue = targetGallery.scrollLeft;
    let initMouseX = mouseX;

    intervalId.push(
      setInterval(() => {
        handleDrag(targetGallery, initScrollValue, initMouseX);
      }, 10)
    );
  }

  function handleDrag(gallery, initScrollValue, initMouseX) {
    diff = initMouseX - mouseX;
    finalScrollValue = initScrollValue + diff;
    gallery.scrollLeft = finalScrollValue;
    document.body.style.cursor = "grabbing";
    let imgWidth = gallery.children[0].getBoundingClientRect().width;
    let index = Math.round(finalScrollValue / imgWidth);
    if (index >= 0 && index < gallery.children.length) {
      setCurrentImg(index);
      currentIndex = index;
    }
  }

  function handleDots(dotIndex) {
    scrollGallery(dotIndex, index);
    targetGallery = document.getElementById(`gallery${index}`);
    setCurrentImg(dotIndex);
    currentIndex = dotIndex;
  }

  const ref = React.useRef(null);

  useEffect(() => {
    if (scrollTo !== undefined && scrollTo === data.id) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
    handleDots(0);
    let touchstartX = 0;
    let touchendX = 0;

    function checkDirection() {
      let diff = touchendX - touchstartX; //we love basic maths, pythagoras would be proud
      if (diff < 0 && Math.abs(diff) > 50) {
        handleButtons(1);
      }
      if (diff > 0 && Math.abs(diff) > 50) {
        handleButtons(-1);
      }
    }

    document
      .getElementById(`gallery${index}`)
      .addEventListener("touchstart", (e) => {
        touchstartX = e.changedTouches[0].screenX;
      });

    document
      .getElementById(`gallery${index}`)
      .addEventListener("touchend", (e) => {
        touchendX = e.changedTouches[0].screenX;
        checkDirection();
      });
  }, []);

  const { currentLanguage } = useLanguage();
  return (
    <div
      className={styles.roomWrapper}
      style={{
        flexDirection: mobile ? "column" : reverse ? "row-reverse" : "row",
      }}
      ref={ref}
    >
      <div className={styles.galleryWrapper}>
          <svg
            onClick={() => {
              handleButtons(-1);
            }}
            className={styles.galleryButton}
            style={{ left: "20px" }}
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
            onClick={() => {
              handleButtons(1);
            }}
            className={styles.galleryButton}
            style={{ transform: "rotate(180deg)", right: "20px" }}
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
        <div
          className={styles.dots}
          style={{ width: `${data.attributes.images.data.length * 42}px` }}
        >
          {data.attributes.images.data.map((img, dotIndex) => {
            return (
              <div
                key={dotIndex}
                onClick={() => {
                  handleDots(dotIndex);
                }}
                className={
                  !(dotIndex === currentImg) ? styles.dot : styles.selectedDot
                }
              />
            );
          })}
        </div>
        <div className={styles.gallery} id={`gallery${index}`}>
          {data.attributes.images.data.map((img, imgIndex) => {
            return (
              <img
                key={imgIndex}
                src={backUrl + img.attributes.url}
                alt=""
                draggable={false}
                onMouseDown={(e) => {
                  handleMouseDown(e, index);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.information}>
        <div>
          <h3>{data.attributes.title}</h3>
          <div className={styles.infoWrapper}>
            {data.attributes.info.map((infoSegment, infoIndex) => {
              return (
                <div key={infoIndex} className={styles.infoSegment}>
                  <div
                    className={styles.dot}
                    style={{
                      display:
                        infoIndex === 0 //reversed: infoIndex < data.attributes.info.length - 1
                          ? "none"
                          : "unset",
                    }}
                  />
                  <h6>{infoSegment.text}</h6>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <p>{data.attributes.description}</p>
        </div>
        <div className={styles.tagWrapper}>
          {data.attributes.tags.length !== 0 ? (
            data.attributes.tags.map((tag, tagIndex) => {
              return (
                <div key={tagIndex} className={styles.tagSegment}>
                  <img src={backUrl + tag.icon.data.attributes.url} alt="" />
                  <p>{tag.tagText}</p>
                </div>
              );
            })
          ) : (
            <>
              <div className={styles.tagSegment}>
                <img src={freeParking} alt="" />
                <p>Free parking</p>
              </div>
              <div className={styles.tagSegment}>
                <img src={family} alt="" />
                <p>Family Rooms</p>
              </div>
              <div className={styles.tagSegment}>
                <img src={noSmoking} alt="" />
                <p>Non-smoking</p>
              </div>
              <div className={styles.tagSegment}>
                <img src={service} alt="" />
                <p>Room Service</p>
              </div>
              <div className={styles.tagSegment}>
                <img src={freeWifi} alt="" />
                <p>Free Wifi</p>
              </div>
            </>
          )}
        </div>
        <button
          className={styles.bookNow}
          onClick={() => {
            window.open(
              data.attributes.button_link === null
                ? "https://www.booking.com/hotel/me/arabesque.en-gb.html"
                : data.attributes.button_link,
              "_self"
            );
          }}
        >
          {currentLanguage === "en" ? (
            "Book Now"
          ) : currentLanguage === "sq" ? (
            "Rezervoni tani"
          ) : currentLanguage === "sr" ? (
            <>Rezerva</>
          ) : (
            <>Reservieren</>
          )}
        </button>
      </div>
    </div>
  );
};

export default Rooms;

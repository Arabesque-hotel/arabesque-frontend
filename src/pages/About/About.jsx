import React, { useEffect, useState } from "react";
import styles from "./About.module.scss";
import KosovoMap from "../../components/KosovoMap/KosovoMap";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLanguage } from "../../context/Language/LanguageContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const About = () => {
  const { currentLanguage } = useLanguage();
  const [mobile, setMobile] = useState(window.innerWidth <= 1080);

  //to prevent the scrolling sections being unaligned, we scroll to the current image each resize, since resizing is what unaligns the scrolls
  window.onresize = () => {
    scrollReviews(0, "instant");
    setMobile(window.innerWidth <= 1080);
    //scrollAmenities(currentImg, "instant");
  };

  function scrollReviews(direction, style = "smooth") {
    if (
      document.getElementById("reviewsWrapper") === null ||
      document.getElementById("review") === null
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

  const [reviewsResponse, setReviewsResponse] = useState([]);
  const [galleryResponse, setGalleryResponse] = useState([]);
  const backUrl = "http://localhost:1337";

  useEffect(() => {
    if (currentLanguage !== "") {
      axios
        .get(backUrl + `/api/reviews?locale=${currentLanguage}`)
        .then((res) => {
          setReviewsResponse(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get(
          backUrl +
            `/api/about-amenities-gallery?populate=deep&locale=${currentLanguage}`
        )
        .then((res) => {
          setGalleryResponse(res.data.data.attributes.imageAndTitle);
        })
        .catch((err) => {});
    }
  }, [currentLanguage]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <h2>
          {currentLanguage === "en" ? (
            <>
              Hotel Arabesque
              <br />
              located in Ulcinj, Montenegro
            </>
          ) : currentLanguage === "sq" ? (
            <>
              Hotel Arabesque
              <br />
              ndodhet në Ulcinj, Montenegro
            </>
          ) : currentLanguage === "sr" ? (
            <>
              Hotel Arabesque
              <br />
              nalazi se u Ulcinj, Montenegro
            </>
          ) : (
            <>
              Hotel Arabesque
              <br />
              gelegen in Ulcinj, Montenegro
            </>
          )}
        </h2>
      </div>
      <div className={styles.infoSection}>
        <div className={styles.left}>
          <p>
            {currentLanguage === "en" ? (
              <>About Us</>
            ) : currentLanguage === "sq" ? (
              <>Rreth Nesh</>
            ) : currentLanguage === "sr" ? (
              <>O nama</>
            ) : (
              <>Über Uns</>
            )}
          </p>
          <h3>
            {currentLanguage === "en" ? (
              <>
                Where you are
                <br />
                our most valued asset
              </>
            ) : currentLanguage === "sq" ? (
              <>
                Ku ju jeni pasuria
                <br />
                jonë më e çmuar
              </>
            ) : currentLanguage === "sr" ? (
              <>
                Gdje si naša
                <br />
                najvrednija imovina
              </>
            ) : (
              <>
                Wo Sie unser
                <br />
                wertvollstes Kapital sind
              </>
            )}
          </h3>
        </div>
        <div className={styles.right}>
          <p>
            {currentLanguage === "en" ? (
              <>
                Hotel Arabesque boasts a prime location near Ulcinj's Small
                Beach, just 150 steps from the sea (a 4-minute walk) and 0.8 km
                from the historic Old Town of Ulcinj.
                <br />
                <br />
                Situated at Mujo Ulqinaku Street, 12 in Ulcinj, the hotel is
                only 758 meters from the city center.
                <br />
                <br />
                An airport shuttle service is available upon request. The hotel
                offers spacious family rooms, ideal for large families with
                children. Parking is conveniently located both inside and
                outside the hotel. Guests can also enjoy a recreational terrace.
                Additionally, Arabesque Apartments & Suites feature a pool on
                the 5th floor with stunning open views.
                <br />
                <br />
                The hotel staff is multilingual, speaking Albanian, English,
                German, French, Italian, and Serbian.
                <br />
                <br />
                Please note that services are payable in cash only.
              </>
            ) : currentLanguage === "sq" ? (
              <>
                Hotel Arabesque është i vendosur në një lokacion të shkëlqyer,
                vetëm 150 hapa (4 minuta në këmbë) nga Plazhi i Vogël i Ulqinit
                dhe 0.8 km nga Qyteti Historik i Vjetër i Ulqinit.
                <br />
                <br />
                Adresa e hotelit është Rruga Mujo Ulqinaku 12, Ulqin, 758 metra
                nga qendra e qytetit.
                <br />
                <br />
                Ne ofrojmë transfer nga aeroporti sipas kërkesës për të
                lehtësuar arritjen tuaj. Hoteli ka dhoma familjare, të
                përshtatshme për familjet e mëdha dhe për fëmijët. Parkimi është
                i disponueshëm brenda dhe jashtë hotelit, dhe të ftuarit mund të
                shijojnë një tarracë rekreative. Po ashtu, Arabesque Apartamente
                & Suites ka një pishinë në katin e 5-të me pamje të
                jashtëzakonshme.
                <br />
                <br />
                Stafi ynë flet shqip, anglisht, gjermanisht, frëngjisht,
                italisht dhe serbisht për t'ju ndihmuar në çdo moment.
                <br />
                <br />
                Ju lutemi vini re se shërbimet paguhen vetëm me para në dorë.
              </>
            ) : currentLanguage === "sr" ? (
              <>
                Hotel Arabesque se može pohvaliti odličnom lokacijom u blizini
                ulcinjskog Malog Plaža, samo 150 koraka od mora (4 minute hoda)
                i 0,8 km od istorijskog Starog grada Ulcinja.
                <br />
                <br />
                Hotel se nalazi u ulici Mujo Ulqinaku 12 u Ulcinju samo 758
                metara od centra grada.
                <br />
                <br />
                Usluga prijevoza od/do aerodroma dostupna je na zahtjev. Hotel
                nudi prostrane porodične sobe, idealne za velike porodice sa
                djeca. Parking je povoljno smješten i unutar i izvan hotela.
                Gosti također mogu uživati ​​na terasi za rekreaciju. Osim toga,
                Arabesque Apartments & Suites ima bazen na 5. sprat sa
                zadivljujućim otvorenim pogledom.
                <br />
                <br />
                Osoblje hotela govori više jezika, govori albanski, engleski,
                nemački, francuski, italijanski i srpski.
                <br />
                <br />
                Napominjemo da se usluge plaćaju samo u gotovini.
              </>
            ) : (
              <>
                Das Hotel Arabesque bietet eine erstklassige Lage in der Nähe
                des kleinen Strandes von Ulcinj, nur 150 Schritte vom Meer
                entfernt (4 Gehminuten) und 0,8 km von der historischen Altstadt
                von Ulcinj.
                <br />
                <br />
                Das Hotel befindet sich in der Mujo Ulqinaku Straße 12 in
                Ulcinj, nur 758 Meter vom Stadtzentrum entfernt.
                <br />
                <br />
                Ein Flughafentransfer ist auf Anfrage verfügbar. Das Hotel
                bietet geräumige Familienzimmer, ideal für große Familien mit
                Kindern. Parkplätze sind sowohl innerhalb als auch außerhalb des
                Hotels vorhanden. Den Gästen steht auch eine Freizeitterrasse
                zur Verfügung. Darüber hinaus verfügen die Arabesque Apartments
                & Suites über einen Pool im 5. Stock mit atemberaubender freier
                Aussicht.
                <br />
                <br />
                Das Hotelpersonal ist mehrsprachig und spricht Albanisch,
                Englisch, Deutsch, Französisch, Italienisch und Serbisch.
                <br />
                <br />
                Bitte beachten Sie, dass Dienstleistungen nur in bar bezahlt
                werden können.
              </>
            )}
          </p>
          <button
            onClick={() => {
              window.open("https://www.booking.com/Share-hAUEA1", "_self");
            }}
          >
            {currentLanguage === "en" ? (
              <>Book Now</>
            ) : currentLanguage === "sq" ? (
              <>Rezervoni tani</>
            ) : currentLanguage === "sr" ? (
              <>Reserva</>
            ) : (
              <>Reservieren</>
            )}
          </button>
        </div>
      </div>
      <div className={styles.amenities}>
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M59.6271 28.1073L56.8393 22.2779C56.2382 21.0217 54.9833 20.2018 53.6007 20.1266L53.8111 19.8483C54.6076 18.7877 54.7954 17.4187 54.3145 16.1852L51.9401 10.0473C51.5644 9.077 50.7979 8.29474 49.8436 7.89608L44.0126 5.48157C42.5999 4.89486 40.9844 5.21078 39.8948 6.27888L39.3914 6.77533V6.45187C39.3914 4.98511 38.5348 3.63118 37.2047 2.99934L31.6292 0.366691C30.5922 -0.12223 29.4125 -0.12223 28.3756 0.366691L22.8 2.99934C21.47 3.62365 20.6134 4.97759 20.6134 6.45187V6.7678L20.11 6.27888C19.0204 5.21078 17.4048 4.89486 15.9922 5.48157L10.1611 7.89608C9.19932 8.29474 8.4404 9.077 8.0647 10.0473L5.69021 16.1852C5.2093 17.4187 5.40468 18.7877 6.19367 19.8483L6.40407 20.1266C5.02145 20.2018 3.76659 21.0217 3.16545 22.2779L0.37767 28.1073C-0.133295 29.1679 -0.125782 30.3864 0.400212 31.447L3.52612 37.7654C4.0972 38.9313 5.19429 39.6985 6.45667 39.8564C5.45728 40.9095 5.1492 42.459 5.65265 43.8205L7.72655 49.349C8.07971 50.2968 8.78606 51.0565 9.71031 51.4777L16.1049 54.4037C17.5626 55.0657 19.2909 54.7497 20.4105 53.6064L20.6209 53.3883V53.5462C20.6209 55.013 21.4775 56.3669 22.8075 56.9988L28.383 59.6314C28.9015 59.8721 29.4576 60 30.0061 60C30.5547 60 31.1182 59.8797 31.6292 59.6314L37.2047 56.9988C38.5348 56.3745 39.3914 55.0205 39.3914 53.5462V53.3883L39.6018 53.6064C40.7214 54.7497 42.4496 55.0657 43.9074 54.4037L50.302 51.4777C51.2262 51.0565 51.9325 50.2968 52.2857 49.349L54.3596 43.8205C54.8706 42.459 54.555 40.9095 53.5556 39.8564C54.818 39.6985 55.9075 38.9237 56.4861 37.7654L59.612 31.447C60.123 30.3939 60.1305 29.1754 59.6271 28.1073ZM41.6381 27.7989L39.6694 25.8056C39.489 25.6176 39.3838 25.3694 39.3838 25.1136V22.9398H46.064L41.6381 27.7989ZM41.7207 31.8983L46.8229 37.0583H39.444L39.5341 34.6513C39.5416 34.4182 39.6318 34.1925 39.7896 34.0195L41.7207 31.8983ZM41.8635 8.29473C42.149 8.01643 42.5624 7.93369 42.9306 8.09165L48.7615 10.5062C49.0095 10.6115 49.2049 10.8146 49.3026 11.0628L51.677 17.2006C51.7973 17.524 51.7522 17.8776 51.5493 18.1484L50.3771 19.7129C50.1892 19.9611 49.8962 20.1116 49.5881 20.1116H39.3838V10.7243L41.8635 8.29473ZM36.566 20.1041H34.5823C34.3193 20.1041 34.0713 19.9987 33.8834 19.8107L32.7188 18.6448C32.5309 18.4568 32.4257 18.2085 32.4257 17.9378C32.4257 17.6745 32.5309 17.4188 32.7263 17.2382L36.566 13.4773V20.1041ZM23.4312 6.44436C23.4312 6.06075 23.6567 5.71474 23.9948 5.54926L29.5703 2.91661C29.8408 2.78874 30.1489 2.78874 30.4119 2.91661L35.9874 5.54926C36.3331 5.71474 36.551 6.06075 36.551 6.44436V9.52833L30.735 15.2224C30.4269 15.5308 30.1714 15.8768 29.9836 16.2604C29.7957 15.8843 29.5478 15.5308 29.2322 15.2224L23.4162 9.52833V6.44436H23.4312ZM27.5716 17.9453C27.5716 18.2085 27.4739 18.4643 27.286 18.6523L26.1213 19.8182C25.9335 20.0063 25.6855 20.1116 25.4225 20.1116H23.4387V13.4848L27.2785 17.2457C27.4663 17.4338 27.5716 17.682 27.5716 17.9453ZM8.31268 17.2006L10.6871 11.0628C10.7848 10.8146 10.9802 10.6115 11.2282 10.5062L17.0592 8.09165C17.1794 8.039 17.3072 8.01643 17.4349 8.01643C17.6904 8.01643 17.9384 8.11422 18.1262 8.30226L20.6059 10.7243V20.1116H10.4016C10.0935 20.1116 9.79296 19.9611 9.61262 19.7129L8.4404 18.1484C8.23752 17.8776 8.19245 17.5165 8.31268 17.2006ZM18.3591 27.7989L13.9333 22.9323H20.6134V25.1061C20.6134 25.3694 20.5157 25.6176 20.3279 25.7981L18.3591 27.7989ZM20.2076 34.0195C20.3654 34.1925 20.4556 34.4182 20.4631 34.6513L20.5533 37.0583H13.1743L18.2765 31.8983L20.2076 34.0195ZM6.93005 37.0658C6.55434 37.0658 6.2162 36.8552 6.04338 36.5167L2.91747 30.1984C2.78221 29.9201 2.78223 29.6117 2.90997 29.3334L5.69773 23.4964C5.86304 23.1579 6.2087 22.9323 6.59192 22.9323H9.66522C9.94325 22.9323 10.2062 23.0526 10.3941 23.2557L16.3603 29.8072L9.19935 37.0583H6.93005V37.0658ZM20.6134 49.349L18.3892 51.6206C18.0961 51.914 17.6528 51.9967 17.2771 51.8237L10.8825 48.8977C10.6421 48.7849 10.4617 48.5894 10.3716 48.3487L8.29763 42.8201C8.16238 42.459 8.25256 42.0528 8.52307 41.7745L10.3941 39.879H20.6209V49.349H20.6134ZM36.566 53.5462C36.566 53.9298 36.3406 54.2759 36.0024 54.4413L30.4269 57.074C30.1564 57.2019 29.8483 57.2019 29.5853 57.074L24.0098 54.4413C23.6642 54.2759 23.4463 53.9298 23.4463 53.5462V50.5074L29.3975 44.4372C29.6455 44.189 29.8483 43.9107 30.0061 43.6249C30.1715 43.9183 30.3743 44.189 30.6148 44.4372L36.566 50.5074V53.5462ZM23.4312 46.4757V39.8941H25.8283C26.0988 39.8941 26.3618 40.0069 26.5421 40.2025L27.3837 41.09C27.7519 41.4812 27.7444 42.0829 27.3687 42.459L23.4312 46.4757ZM36.566 46.4757L32.6286 42.459C32.2529 42.0754 32.2529 41.4737 32.6135 41.09L33.4477 40.2025C33.6355 40.0069 33.8985 39.8941 34.169 39.8941H36.566V46.4757ZM37.7007 32.1165C37.092 32.7784 36.7464 33.6434 36.7088 34.546L36.6111 37.0658H34.1615C33.117 37.0658 32.1101 37.5021 31.3962 38.2618L30.5622 39.1494C30.3368 39.3826 30.1489 39.6458 29.9986 39.9166C29.8483 39.6458 29.6605 39.3901 29.4351 39.1494L28.5935 38.2618C27.8796 37.5021 26.8652 37.0658 25.8283 37.0658H23.3786L23.2809 34.546C23.2509 33.6434 22.8977 32.7859 22.2891 32.1165L20.2602 29.8825L22.3341 27.7839C23.048 27.0618 23.4387 26.114 23.4387 25.0986V22.9248H25.4225C26.4369 22.9248 27.3987 22.5261 28.1201 21.804L29.2848 20.6381C29.5853 20.3372 29.8183 19.9987 29.9986 19.6377C30.179 20.0063 30.4194 20.3448 30.72 20.6381L31.8847 21.804C32.6061 22.5261 33.5603 22.9248 34.5823 22.9248H36.566V25.0986C36.566 26.1065 36.9568 27.0618 37.6631 27.7839L39.737 29.8825L37.7007 32.1165ZM51.7071 42.8276L49.6332 48.3561C49.543 48.6044 49.3552 48.8 49.1222 48.9053L42.7277 51.8312C42.3519 52.0042 41.9011 51.9215 41.6156 51.6282L39.3914 49.3566V39.8941H49.6182L51.4892 41.7896C51.7522 42.0604 51.8424 42.4665 51.7071 42.8276ZM57.0723 30.1909L53.9463 36.5092C53.781 36.8477 53.4354 37.0583 53.0597 37.0583H50.7828L43.6219 29.8072L49.5881 23.2557C49.776 23.0526 50.0389 22.9323 50.317 22.9323H53.3903C53.766 22.9323 54.1192 23.1504 54.2845 23.4964L57.0723 29.3258C57.2075 29.6042 57.2075 29.9201 57.0723 30.1909Z"
            fill="#1F2C34"
          />
        </svg>
        <h3>
          {currentLanguage === "en" ? (
            <>Amenities We Offer</>
          ) : currentLanguage === "sq" ? (
            <>Komoditetet që Ofrojmë</>
          ) : currentLanguage === "sr" ? (
            <>Sadržaji Koje Nudimo</>
          ) : (
            <>Von uns angebotene Annehmlichkeiten</>
          )}
        </h3>
        <Swiper
          pagination={{
            clickable: true,
            bulletActiveClass: styles.selectedDot,
            bulletClass: styles.dot,
            el: `.${styles.dots}`,
          }}
          modules={[Pagination]}
          centeredSlides={true}
          slidesPerView={mobile ? 1.3 : 2.2}
          spaceBetween={mobile ? 10 : 30}
          initialSlide={2} //FIX FIX FIX FIX FIX FIX FIX
          className={styles.gallery}
        >
          {galleryResponse.map((data, index) => {
            return (
              <SwiperSlide
                key={index}
                className={styles.image}
                id={`imgId${index}`}
                style={{
                  background: `url(${
                    backUrl + data.image.data.attributes.url
                  }) lightgray 50% / cover no-repeat`,
                }}
              >
                <h4>{data.text}</h4>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className={styles.dots}>
          <div className={styles.dot} />
        </div>
      </div>
      <div className={styles.cardsWrapper}>
        <div className={styles.card}>
          <svg
            width="65"
            height="70"
            viewBox="0 0 65 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.698 59.6164C17.4472 58.7208 21.3212 58.0386 25.8207 57.7064C27.4168 59.3893 29.1222 61.0837 30.9369 62.7895C31.5534 63.3691 32.5144 63.3691 33.1309 62.7895C34.9456 61.0837 36.651 59.3893 38.2471 57.7064C42.7466 58.0386 46.6206 58.7208 49.3698 59.6164C50.7715 60.0731 51.852 60.5761 52.5717 61.0968C53.3042 61.6267 53.5678 62.102 53.5678 62.4915C53.5678 62.9662 53.1709 63.5615 52.0818 64.2052C51.0262 64.8292 49.4654 65.4084 47.4929 65.9015C43.5556 66.8859 38.0898 67.5 32.0339 67.5C25.978 67.5 20.5121 66.8859 16.5748 65.9015C14.6024 65.4084 13.0416 64.8292 11.9859 64.2052C10.8969 63.5615 10.5 62.9662 10.5 62.4915C10.5 62.102 10.7636 61.6267 11.4961 61.0968C12.2158 60.5761 13.2963 60.0731 14.698 59.6164ZM32.4571 60.2737C32.2227 60.5057 31.8451 60.5057 31.6107 60.2737C18.2055 47.0085 11.6017 34.8982 11.6017 23.9322C11.6017 12.6478 20.7495 3.5 32.0339 3.5C43.3183 3.5 52.4661 12.6478 52.4661 23.9322C52.4661 34.8982 45.8623 47.0085 32.4571 60.2737ZM32.0339 32.1441C37.1776 32.1441 41.3475 27.9742 41.3475 22.8305C41.3475 17.6868 37.1776 13.5169 32.0339 13.5169C26.8902 13.5169 22.7203 17.6868 22.7203 22.8305C22.7203 27.9742 26.8902 32.1441 32.0339 32.1441Z"
              stroke="#1F2C34"
            />
          </svg>
          <h4>
            {currentLanguage === "en" ? (
              <>Prime Location</>
            ) : currentLanguage === "sq" ? (
              <>Vendndodhja Kryesore</>
            ) : currentLanguage === "sr" ? (
              <>Odlična Lokacija</>
            ) : (
              <>Hauptsitz</>
            )}
          </h4>
          <p>
            {currentLanguage === "en" ? (
              <>
                Located steps from Small Beach and near Ulcinj's Old Town, Hotel
                Arabesque offers convenient access to both beachside relaxation
                and cultural exploration.
              </>
            ) : currentLanguage === "sq" ? (
              <>
                E vendosur vetëm disa hapa nga Plazhi i Vogël dhe pranë Qytetit
                të Vjetër të Ulqinit, Hotel Arabesque ofron një lokacion të
                përshtatshëm për të shijuar relaksimin buzë plazhit dhe për të
                eksploruar pasuritë kulturore të qyteti.
              </>
            ) : currentLanguage === "sr" ? (
              <>
                Smešten na nekoliko koraka od Male plaže i u blizini Starog
                grada Ulcinja, hotel Arabesque nudi pogodan pristup opuštanju na
                plaži i kulturnom istraživanju.
              </>
            ) : (
              <>
                Das Hotel Arabesque liegt nur wenige Schritte vom Kleinen Strand
                entfernt und in der Nähe der Altstadt von Ulcinj. Von hier aus
                können Sie bequem am Strand entspannen und kulturelle
                Sehenswürdigkeiten erkunden.
              </>
            )}
          </p>
        </div>
        <div className={styles.card}>
          <svg
            width="65"
            height="70"
            viewBox="0 0 65 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17 25C18.5823 25 20.129 24.5308 21.4446 23.6518C22.7602 22.7727 23.7855 21.5233 24.391 20.0615C24.9965 18.5997 25.155 16.9911 24.8463 15.4393C24.5376 13.8874 23.7757 12.462 22.6569 11.3431C21.538 10.2243 20.1126 9.4624 18.5607 9.15372C17.0089 8.84504 15.4003 9.00347 13.9385 9.60897C12.4767 10.2145 11.2273 11.2399 10.3482 12.5554C9.46919 13.871 9 15.4178 9 17C9.00212 19.1211 9.84565 21.1547 11.3455 22.6545C12.8453 24.1544 14.8789 24.9979 17 25ZM11.1797 13.111L10 16.9999C10.0021 18.8558 10.7403 20.6351 12.0526 21.9474C13.3649 23.2597 15.1442 23.9979 17.0001 24L20.889 22.8203L23.4672 19.6788L23.8655 15.6344L21.9497 12.0503L18.3656 10.1345L14.3212 10.5328L11.1797 13.111Z"
              fill="#1F2C34"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17 53.709C16.9939 51.7091 17.5901 49.7537 18.7109 48.0974C19.8317 46.4411 21.4252 45.1606 23.284 44.4226L26.9898 42.9407C26.6831 42.7144 26.3912 42.4715 26.1151 42.2135C24.7233 40.913 23.7334 39.2293 23.2787 37.3627C22.7339 35.1258 22.9923 32.7686 24.0089 30.7029L22.9529 30.0996C21.1386 29.0675 19.0871 28.5249 16.9998 28.5249C14.9124 28.5249 12.861 29.0675 11.0466 30.0996L5.03296 33.5371C3.80878 34.2373 2.79117 35.2482 2.08301 36.4677C1.37485 37.6873 1.00126 39.0722 1 40.4824V53C1.00212 55.1211 1.84565 57.1547 3.34548 58.6545C4.84532 60.1544 6.87892 60.9979 9 61H17V53.709ZM16 53.7104C15.9936 51.5103 16.6496 49.3591 17.8827 47.537C19.116 45.7145 20.8693 44.3054 22.9146 43.4933L25.0996 42.6196C23.7408 41.2359 22.7711 39.504 22.3071 37.5994C21.7815 35.4414 21.9344 33.1819 22.7323 31.1253L22.4584 30.9688C20.7949 30.0226 18.9136 29.5249 16.9998 29.5249C15.0862 29.5249 13.2055 30.0223 11.5421 30.9683L11.5411 30.9688L5.52942 34.4052C4.45818 35.0179 3.56749 35.9027 2.94779 36.9699C2.32813 38.037 2.00118 39.2489 2 40.4829V52.9995C2.00198 54.8555 2.74016 56.635 4.05259 57.9474C5.36513 59.26 7.14479 59.9981 9.001 60H16V53.7104Z"
              fill="#1F2C34"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.0259 50.3419C21.3536 51.3358 20.9961 52.5091 21 53.709V61H45V53.709C45.0039 52.5088 44.6461 51.3353 43.9734 50.3414C43.3007 49.3474 42.3442 48.5791 41.2285 48.1366L35.9725 46.0331C34.0654 45.2675 31.9363 45.2675 30.0292 46.0331L24.7694 48.1366C23.6542 48.5795 22.6982 49.348 22.0259 50.3419ZM40.8599 49.0662L40.857 49.065L35.601 46.9615L35.6 46.9611C33.9319 46.2915 32.0698 46.2915 30.4017 46.9611L30.4005 46.9616L25.1385 49.066C24.21 49.4348 23.414 50.0746 22.8542 50.9022C22.2944 51.7297 21.9967 52.7066 22 53.7057L22 53.709L22 60H44V53.7058C44.0032 52.7065 43.7054 51.7294 43.1453 50.9019C42.5851 50.0743 41.7887 49.4345 40.8599 49.0662Z"
              fill="#1F2C34"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M36.3334 39.9888C35.3467 40.6481 34.1867 41 33 41C31.4092 40.9984 29.884 40.3658 28.7591 39.2409C27.6342 38.116 27.0016 36.5908 27 35C27 33.8133 27.3519 32.6533 28.0112 31.6666C28.6705 30.6799 29.6075 29.9109 30.7039 29.4567C31.8003 29.0026 33.0067 28.8838 34.1705 29.1153C35.3344 29.3468 36.4035 29.9182 37.2426 30.7574C38.0818 31.5965 38.6532 32.6656 38.8847 33.8295C39.1162 34.9933 38.9974 36.1997 38.5433 37.2961C38.0892 38.3925 37.3201 39.3295 36.3334 39.9888ZM33.001 40C33.9895 39.9998 34.9559 39.7066 35.7779 39.1574C36.6001 38.6079 37.241 37.8271 37.6194 36.9134C37.9978 35.9998 38.0969 34.9945 37.9039 34.0245C37.711 33.0546 37.2348 32.1637 36.5355 31.4645C35.8363 30.7652 34.9454 30.289 33.9755 30.0961C33.0055 29.9032 32.0002 30.0022 31.0866 30.3806C30.173 30.759 29.3921 31.3999 28.8426 32.2222C28.2934 33.0441 28.0002 34.0105 28 34.999C28.0013 36.3249 28.5286 37.5962 29.4662 38.5338C30.4038 39.4714 31.6751 39.9987 33.001 40Z"
              fill="#1F2C34"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M49 32.5248C46.9127 32.5248 44.8612 33.0674 43.0469 34.0995L42.9165 34.174C42.9254 34.2796 42.9396 34.3837 42.9538 34.4878C42.9769 34.6564 43 34.825 43 34.9999C42.9954 36.542 42.6326 38.062 41.9402 39.4399C41.418 40.4791 40.7192 41.4161 39.8777 42.2104C39.6033 42.4693 39.3138 42.7131 39.0102 42.9403L42.7163 44.4235C44.575 45.1612 46.1686 46.4415 47.2893 48.0977C48.4101 49.7539 49.0062 51.7092 49 53.709V61H57C59.1211 60.9979 61.1547 60.1544 62.6545 58.6545C64.1544 57.1547 64.9979 55.1211 65 53V44.4824C64.9987 43.0724 64.6253 41.6877 63.9174 40.4682C63.2096 39.2487 62.1925 38.2375 60.9688 37.537L54.9531 34.0995C53.1388 33.0674 51.0873 32.5248 49 32.5248ZM44 34.9999V35.0029C43.9949 36.6999 43.5957 38.3725 42.8337 39.8889C42.3282 40.8951 41.6721 41.8142 40.891 42.6159L43.0852 43.494L43.0863 43.4945C45.1313 44.3064 46.8844 45.7151 48.1175 47.5373C49.3506 49.3595 50.0066 51.5107 50 53.7109L50 53.7121L50 60H56.999C58.8552 59.9981 60.6349 59.26 61.9474 57.9474C63.26 56.6349 63.9981 54.8552 64 52.999V44.4834C63.9989 43.2494 63.672 42.0375 63.0526 40.9702C62.4331 39.9029 61.5429 39.0179 60.4719 38.4049L54.4587 34.9687C52.7951 34.0225 50.9138 33.5248 49 33.5248C47.2556 33.5248 45.5385 33.9381 43.9885 34.7278C43.9953 34.813 44 34.9045 44 34.9999Z"
              fill="#1F2C34"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M53.4446 27.6518C52.129 28.5308 50.5822 29 49 29C46.8789 28.9979 44.8453 28.1544 43.3455 26.6545C41.8457 25.1547 41.0021 23.1211 41 21C41 19.4178 41.4692 17.871 42.3482 16.5554C43.2273 15.2399 44.4767 14.2145 45.9385 13.609C47.4003 13.0035 49.0089 12.845 50.5607 13.1537C52.1126 13.4624 53.538 14.2243 54.6569 15.3431C55.7757 16.462 56.5376 17.8874 56.8463 19.4393C57.155 20.9911 56.9965 22.5997 56.391 24.0615C55.7855 25.5233 54.7602 26.7727 53.4446 27.6518ZM49.001 28C50.3851 27.9998 51.7381 27.5893 52.889 26.8203C54.0401 26.0511 54.9373 24.9579 55.4672 23.6788C55.997 22.3997 56.1356 20.9922 55.8655 19.6344C55.5954 18.2765 54.9287 17.0292 53.9497 16.0503C52.9708 15.0713 51.7235 14.4046 50.3656 14.1345C49.0078 13.8644 47.6003 14.003 46.3212 14.5328C45.0421 15.0627 43.9489 15.9599 43.1797 17.111C42.4107 18.2619 42.0002 19.6149 42 20.999C42.0019 22.8552 42.7401 24.6349 44.0526 25.9474C45.3651 27.2599 47.1448 27.9981 49.001 28Z"
              fill="#1F2C34"
            />
          </svg>
          <h4>
            {currentLanguage === "en" ? (
              <>Family-Friendly Acommodations</>
            ) : currentLanguage === "sq" ? (
              <>Akomodime Familjare</>
            ) : currentLanguage === "sr" ? (
              <>Obiteljski Smještaj</>
            ) : (
              <>Familienfreundliche Unterkünfte</>
            )}
          </h4>
          <p>
            {currentLanguage === "en" ? (
              <>
                Spacious family rooms cater to large families, ensuring comfort
                and convenience for a memorable stay.
              </>
            ) : currentLanguage === "sq" ? (
              <>
                Dhomat tona të dizajnuara për familje ofrojnë rehati dhe
                komoditet të jashtëzakonshëm për familjet e mëdha, duke
                garantuar një qëndrim të paharrueshëm.
              </>
            ) : currentLanguage === "sr" ? (
              <>
                Prostrane porodične sobe služe za velike porodice, osiguravajući
                udobnost i udobnost za nezaboravan boravak.
              </>
            ) : (
              <>
                Geräumige Familienzimmer sind für große Familien geeignet und
                gewährleisten Komfort und Bequemlichkeit für einen
                unvergesslichen Aufenthalt.
              </>
            )}
          </p>
        </div>
        <div className={styles.card}>
          <svg
            width="67"
            height="70"
            viewBox="0 0 67 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24.5598 20.1977C23.7222 20.1977 23.0439 20.8759 23.0439 21.7136L23.0413 53.984C23.0413 54.8217 23.7196 55.5 24.5572 55.5H30.5616C31.3991 55.5 32.0737 54.8189 32.0776 53.983L32.0776 53.9807V44.6449H35.6258C38.8895 44.6449 41.9599 43.3726 44.2684 41.0643C46.5771 38.7585 47.8494 35.6852 47.8494 32.4213C47.8494 29.1575 46.577 26.0869 44.2686 23.7785C41.9628 21.4698 38.8896 20.1977 35.6258 20.1977H24.5598ZM24.5598 21.1977C24.2745 21.1977 24.0439 21.4282 24.0439 21.7136L24.0413 53.9841C24.0413 54.2694 24.2719 54.5 24.5572 54.5H30.5616C30.8415 54.5 31.0757 54.2712 31.0776 53.9794V43.6449H35.6258C38.6243 43.6449 41.4405 42.478 43.5615 40.357C45.6821 38.2391 46.8494 35.4202 46.8494 32.4213C46.8494 29.4228 45.6825 26.6066 43.5615 24.4856C41.4436 22.3649 38.6247 21.1977 35.6258 21.1977H24.5598Z"
              fill="#1F2C34"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.6544 5.0936C24.7251 3.37518 29.0454 2.5 33.5 2.5C37.9544 2.5 42.2749 3.3725 46.3459 5.09371C50.2759 6.75638 53.8058 9.13547 56.8339 12.1661C59.8643 15.1966 62.2435 18.724 63.9062 22.654C65.6247 26.7247 66.5 31.0454 66.5 35.5C66.5 39.9544 65.6275 44.2749 63.9063 48.3459C62.2436 52.2759 59.8645 55.8058 56.8339 58.8339C53.8034 61.8643 50.276 64.2435 46.346 65.9062C42.2753 67.6246 37.9546 68.5 33.5 68.5C29.046 68.5 24.7251 67.6275 20.6541 65.9063C16.7241 64.2436 13.1942 61.8645 10.1661 58.8339C7.13568 55.8034 4.7565 52.276 3.09376 48.346C1.37534 44.2753 0.5 39.9546 0.5 35.5C0.5 31.0456 1.3725 26.7251 3.09371 22.6541C4.75638 18.7241 7.13547 15.1942 10.1661 12.1661C13.1965 9.13575 16.7245 6.75632 20.6544 5.0936ZM33.5 3.5C29.1786 3.5 24.9905 4.34859 21.0433 6.01488C17.2327 7.62718 13.813 9.93347 10.8732 12.8732C7.93355 15.8103 5.62712 19.2325 4.01477 23.0435C2.34609 26.9903 1.5 31.1784 1.5 35.5C1.5 39.8213 2.34854 44.0092 4.01472 47.9563C5.62703 51.7671 7.93353 55.1871 10.8734 58.1269C13.8105 61.0666 17.2325 63.3729 21.0435 64.9852C24.9903 66.6539 29.1787 67.5 33.5 67.5C37.8214 67.5 42.0095 66.6514 45.9567 64.9851C49.7673 63.3728 53.1872 61.0664 56.1269 58.1266C59.0666 55.1895 61.3729 51.7675 62.9852 47.9565C64.6539 44.0096 65.5 39.8216 65.5 35.5C65.5 31.1786 64.6514 26.9905 62.9851 23.0433C61.3728 19.2327 59.0664 15.8128 56.1266 12.8731C53.1895 9.93339 49.7674 7.62708 45.9564 6.01472C42.0096 4.34604 37.8216 3.5 33.5 3.5Z"
              fill="#1F2C34"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M30.5619 26.318C29.7242 26.318 29.0459 26.9963 29.0459 27.834V37.0138C29.0459 37.8514 29.7242 38.5297 30.5619 38.5297H35.1506C36.7802 38.5297 38.3147 37.8921 39.4683 36.7413L39.4692 36.7404C40.6203 35.5865 41.2553 34.0518 41.2553 32.4227C41.2553 29.0569 38.5164 26.318 35.1506 26.318H30.5619ZM30.5619 27.318C30.2765 27.318 30.0459 27.5486 30.0459 27.834V37.0138C30.0459 37.2992 30.2765 37.5297 30.5619 37.5297H35.1506C36.5139 37.5297 37.7947 36.9982 38.7617 36.0338C39.7257 35.0671 40.2553 33.7865 40.2553 32.4227C40.2553 29.6092 37.9641 27.318 35.1506 27.318H30.5619Z"
              fill="#1F2C34"
            />
          </svg>
          <h4>
            {currentLanguage === "en" ? (
              <>Convenient Parking</>
            ) : currentLanguage === "sq" ? (
              <>Parkim i përshtatshëm</>
            ) : currentLanguage === "sr" ? (
              <>Pogodan Parking</>
            ) : (
              <>Bequemes Parken</>
            )}
          </h4>
          <p>
            {currentLanguage === "en" ? (
              <>
                Ample parking options inside and outside the hotel provide ease
                of access for guests.
              </>
            ) : currentLanguage === "sq" ? (
              <>
                Opsionet e bollshme të parkimit brenda dhe jashtë hotelit
                ofrojnë lehtësi aksesi për mysafirët.
              </>
            ) : currentLanguage === "sr" ? (
              <>
                Brojne mogućnosti parkiranja unutar i izvan hotela pružaju
                lakoću pristupa za goste.
              </>
            ) : (
              <>
                Zahlreiche Parkmöglichkeiten innerhalb und außerhalb des Hotels
                ermöglichen den Gästen eine bequeme Anfahrt.
              </>
            )}
          </p>
        </div>
        <div className={styles.card}>
          <svg
            width="65"
            height="70"
            viewBox="0 0 65 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31.3518 4.03866L31.6599 3.86082C31.66 3.86079 31.6601 3.86075 31.6601 3.86072C32.4957 3.37973 33.5235 3.37976 34.359 3.86082L59.8526 18.5664L59.853 18.5666C62.0324 19.8215 63.319 22.3949 62.9058 24.9629L62.9021 24.9861L62.9006 25.0096C62.7323 27.5768 60.7814 29.4503 58.6114 29.4503C57.5424 29.4503 56.5349 29.0036 55.7621 28.2389L55.411 27.8915L55.0593 28.2383C54.2829 29.0039 53.2778 29.4503 52.2094 29.4503C51.1403 29.4503 50.1328 29.0036 49.36 28.2389L49.0089 27.8915L48.6572 28.2383C47.8808 29.0039 46.8758 29.4503 45.8073 29.4503C44.7382 29.4503 43.7307 29.0036 42.9579 28.2389L42.6068 27.8915L42.2552 28.2383C41.4787 29.0039 40.4736 29.4503 39.4052 29.4503C38.3362 29.4503 37.3286 29.0036 36.5558 28.2389L36.2034 27.8902L35.8517 28.2397C35.4374 28.6514 34.9485 28.9706 34.4211 29.1795L34.1051 29.3046V29.6444V41.1491V41.6491H34.6051H45.8042C46.41 41.6491 46.9032 42.1422 46.9032 42.7481C46.9032 43.3539 46.41 43.847 45.8042 43.847H34.6051H34.1051V44.347V63.5472V64.0472H34.6051H41.0042C41.61 64.0472 42.1031 64.5403 42.1031 65.1462C42.1031 65.752 41.61 66.2451 41.0042 66.2451H25.0051C24.3992 66.2451 23.9061 65.752 23.9061 65.1462C23.9061 64.5403 24.3992 64.0472 25.0051 64.0472H31.4041H31.9041V63.5472V44.347V43.847H31.4041H20.205C19.5992 43.847 19.1061 43.3539 19.1061 42.7481C19.1061 42.1422 19.5992 41.6491 20.205 41.6491H31.4041H31.9041V41.1491V29.6444H31.4257L31.598 29.1829C31.0715 28.9745 30.5849 28.6553 30.1662 28.242L29.8151 27.8954L29.4639 28.2418C28.6874 29.0074 27.6824 29.4538 26.6139 29.4538C25.5449 29.4538 24.5373 29.0071 23.7645 28.2424L23.4135 27.895L23.0618 28.2418C22.2853 29.0074 21.2803 29.4538 20.2118 29.4538C19.1428 29.4538 18.1352 29.0071 17.3624 28.2424L17.0114 27.895L16.6597 28.2418C15.8832 29.0074 14.8782 29.4538 13.8097 29.4538C12.7407 29.4538 11.7332 29.0071 10.9604 28.2424L10.6093 27.895L10.2576 28.2418C9.48115 29.0074 8.47609 29.4538 7.40762 29.4538C5.1454 29.4538 3.12139 27.4192 3.10759 24.6922L3.10747 24.6681L3.10503 24.6441C2.8579 22.2148 4.06325 19.8632 6.16952 18.6477L6.16953 18.6477L6.1724 18.6461C14.9206 13.5199 27.5692 6.2213 31.3518 4.03866ZM4.70306 55.1053V54.5552L4.62024 54.5631L1.5137 34.9212C1.41893 34.3217 1.82894 33.7582 2.42993 33.6631L2.35186 33.1693L2.42993 33.6631C3.02942 33.5684 3.59299 33.9784 3.68799 34.5794L4.18186 34.5013L3.688 34.5794L6.00399 49.2283L6.0707 49.6502H6.49786H15.399C17.7749 49.6502 19.6991 51.5744 19.6991 53.9503V65.1493C19.6991 65.7552 19.2059 66.2483 18.6001 66.2483C17.9942 66.2483 17.5011 65.7552 17.5011 65.1493V58.7503V58.2503H17.0011H7.40103H6.90103V58.7503V65.1493C6.90103 65.7552 6.40788 66.2483 5.80204 66.2483C5.1962 66.2483 4.70306 65.7551 4.70306 65.1493V55.1053ZM59.5054 49.6502L59.5288 49.1541L59.996 49.2279L62.312 34.579C62.407 33.978 62.9706 33.568 63.5701 33.6628C64.1711 33.7578 64.5811 34.3213 64.4863 34.9208L61.3063 55.0272L61.3002 55.066V55.1053V65.1492C61.3002 65.7551 60.807 66.2482 60.2012 66.2482C59.5953 66.2482 59.1022 65.7551 59.1022 65.1492V58.7502V58.2502H58.6022H49.0021H48.5021V58.7502V65.1492C48.5021 65.7551 48.009 66.2482 47.4032 66.2482C46.7973 66.2482 46.3042 65.7551 46.3042 65.1492V53.9502C46.3042 51.5743 48.2283 49.6502 50.6042 49.6502H59.5054Z"
              stroke="#1F2C34"
            />
          </svg>
          <h4>
            {currentLanguage === "en" ? (
              <>Relaxing Terrace</>
            ) : currentLanguage === "sq" ? (
              <>Tarracë relaksuese</>
            ) : currentLanguage === "sr" ? (
              <>Opuštajuća Terasa</>
            ) : (
              <>Entspannungsterrasse</>
            )}
          </h4>
          <p>
            {currentLanguage === "en" ? (
              <>
                Enjoy a peaceful retreat on the hotel's recreational terrace,
                offering views and a serene atmosphere.
              </>
            ) : currentLanguage === "sq" ? (
              <>
                Shijoni një pushim të qetë në tarracën rekreative të hotelit,
                duke ofruar pamje dhe një atmosferë të qetë.
              </>
            ) : currentLanguage === "sr" ? (
              <>
                Uživajte u mirnom odmoru na hotelskoj rekreativnoj terasi, nudi
                pogled i spokojnu atmosferu.
              </>
            ) : (
              <>
                Genießen Sie einen ruhigen Rückzugsort auf der Freizeitterrasse
                des Hotels mit Aussicht und heiterer Atmosphäre.
              </>
            )}
          </p>
        </div>
        <div className={styles.card}>
          <svg
            width="66"
            height="70"
            viewBox="0 0 66 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.62972 50.9565V55.4768C3.95418 57.8866 6.60034 59.5243 9.62299 59.5243C12.6648 59.5243 15.2781 57.8866 16.6162 55.4932C17.0285 54.7513 17.8144 54.7513 18.2238 55.4932C19.5455 57.8866 22.1752 59.5243 25.2006 59.5243C28.2562 59.5243 30.9023 57.8701 32.2103 55.4438C32.5868 54.7678 33.4221 54.7513 33.7848 55.4438C35.0928 57.8701 37.7389 59.5243 40.7945 59.5243C43.8172 59.5243 46.4469 57.8866 47.7714 55.4932C48.178 54.7513 48.9667 54.7513 49.3926 55.4932C50.7171 57.8866 53.3468 59.5243 56.3694 59.5243C59.4113 59.5243 62.0382 57.8866 63.3627 55.4768L63.3632 50.9565M63.3629 43.7133V48.217C62.0385 50.6268 59.4115 52.2645 56.3697 52.2645C53.347 52.2645 50.7173 50.6433 49.3929 48.2472C48.967 47.4916 48.1783 47.4916 47.7716 48.2472C46.4472 50.6406 43.8175 52.2645 40.7948 52.2645C37.7392 52.2645 35.093 50.6103 33.7851 48.184C33.4389 47.5245 32.6035 47.4915 32.2106 48.2005C30.9026 50.6103 28.2564 52.2617 25.2009 52.2617C22.1755 52.2617 19.5458 50.6405 18.2241 48.2444C17.8146 47.4888 17.0287 47.4888 16.6165 48.2444C15.2784 50.6378 12.6651 52.2617 9.62327 52.2617C6.60062 52.2617 3.95445 50.6241 2.63 48.2142V43.7105M63.3627 40.9709C62.0382 43.3808 59.4113 45.0185 56.3694 45.0185C53.3468 45.0185 50.7171 43.3808 49.3926 40.9873C48.9667 40.2482 48.178 40.2482 47.7714 41.0038C46.4469 43.3972 43.8172 45.0211 40.7945 45.0211C37.7389 45.0211 35.0928 43.3669 33.7848 40.9406C33.4221 40.2481 32.5868 40.2619 32.2103 40.9406C30.9023 43.3642 28.2562 45.0211 25.2006 45.0211C22.1752 45.0211 19.5455 43.3835 18.2238 40.99C17.8144 40.2509 17.0285 40.2509 16.6162 41.0065C15.2781 43.3999 12.6648 45.0239 9.62299 45.0239C6.60034 45.0239 3.95418 43.3862 2.62972 40.9763M21.6912 14.6079V40.5476C21.6912 43.7763 26.5741 43.7461 26.5741 40.5476V35.618H39.4395V40.5476C39.4395 43.7928 44.3224 43.7598 44.3224 40.5476V14.6079M5.20153 66.3582H60.7958C63.1122 66.3582 65 64.4677 65 62.154V17.1748C65 14.8583 63.1095 12.9705 60.7958 12.9705H56.2618C56.3553 12.671 56.3883 12.355 56.3718 12.0252C56.1492 7.18903 52.4479 3.89688 47.694 4.00732C46.3063 4.05404 44.9379 4.40302 43.7096 5.04604C40.8903 6.54087 39.4422 9.28319 39.4422 12.4323V12.9681H38.4969C38.5931 12.6521 38.6371 12.3058 38.6233 11.9596C38.3568 7.13986 34.6554 3.86433 29.9153 4.00432C28.5442 4.05103 27.1895 4.4 25.9776 5.02924C23.1583 6.52407 21.6938 9.28292 21.6938 12.4316V12.9675H5.20423C2.89052 12.9675 1 14.858 1 17.1717V62.1509C0.997255 64.4701 2.88508 66.3582 5.20153 66.3582ZM51.6291 12.9701H44.3224V12.4343C44.3224 10.3075 45.7541 8.92252 47.8342 8.88953C49.9115 8.84282 51.4256 10.1508 51.5053 12.2913C51.5053 12.5276 51.5522 12.7475 51.6291 12.9701ZM26.5716 14.6077V16.7345H39.437V14.6077H26.5716ZM33.8811 12.97C33.8042 12.7337 33.7547 12.4974 33.7547 12.2446C33.6448 10.1206 32.117 8.81259 30.0534 8.87576C27.9897 8.93896 26.5719 10.3239 26.5719 12.4342V12.97L33.8811 12.97ZM41.0774 32.3726H24.9199V26.9703H41.0802V32.3726H41.0774ZM24.9199 25.3793V19.977H41.0802V25.3793H24.9199Z"
              stroke="#1F2C34"
            />
          </svg>
          <h4>
            {currentLanguage === "en" ? (
              <>Rooftop Pool with Views</>
            ) : currentLanguage === "sq" ? (
              <>Pishinë në çati me pamje të jashtëzakonshme</>
            ) : currentLanguage === "sr" ? (
              <>Bazen Na Krovu sa Pogledom</>
            ) : (
              <>Pool auf dem Dach mit Aussicht</>
            )}
          </h4>
          <p>
            {currentLanguage === "en" ? (
              <>
                Arabesque Apartments & Suites feature a rooftop pool on the 5th
                floor, offering stunning open views and a refreshing escape.
              </>
            ) : currentLanguage === "sq" ? (
              <>
                Në katin e 5-të të Hotel Arabesque, do të gjeni një pishinë në
                çati që ofron pamje të mrekullueshme dhe një vend të freskët për
                t'u relaksuar.
              </>
            ) : currentLanguage === "sr" ? (
              <>
                Arabesque Apartments & Suites ima bazen na krovu na 5 sprat,
                koji nudi zadivljujući otvoren pogled i osvježavajući bijeg.
              </>
            ) : (
              <>
                Die Arabesque Apartments & Suites verfügen über einen Pool auf
                dem Dach in der 5. Etage, der einen atemberaubenden Ausblick und
                eine erfrischende Zuflucht bietet.
              </>
            )}
          </p>
        </div>
        <div className={styles.card}>
          <svg
            width="65"
            height="70"
            viewBox="0 0 65 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1_13_1544" fill="white">
              <path d="M22.1507 36.1644C22.1219 36.1171 22.0905 36.0712 22.0568 36.0272L21.9629 35.9261L21.8618 35.8322L21.7246 35.7383L21.6668 35.6733L21.5224 35.6083L21.3996 35.5578H21.3274L21.0457 35.5H20.7496C20.6737 35.5109 20.5989 35.5278 20.5257 35.5506H20.4607C20.3957 35.5506 20.3307 35.6011 20.2657 35.6372L20.2007 35.6878C20.1445 35.7189 20.0913 35.7551 20.0418 35.7961C20.0094 35.8213 19.9803 35.8504 19.9551 35.8828L19.8396 35.9911L19.7529 36.1283L19.6879 36.215L11.0212 52.1039C10.9297 52.2707 10.8721 52.454 10.8516 52.6431C10.8311 52.8323 10.8482 53.0236 10.9019 53.2062C10.9556 53.3887 11.0448 53.5589 11.1644 53.7068C11.2841 53.8548 11.4318 53.9776 11.599 54.0683C11.8052 54.1917 12.0381 54.2635 12.2779 54.2778C12.5349 54.2814 12.7881 54.2163 13.0116 54.0894C13.235 53.9624 13.4206 53.7781 13.549 53.5556L16.6835 47.7778H25.2057L28.3401 53.5556C28.4686 53.7781 28.6541 53.9624 28.8776 54.0894C29.101 54.2163 29.3543 54.2814 29.6112 54.2778C29.8627 54.2817 30.1111 54.2221 30.3335 54.1044C30.5007 54.0137 30.6484 53.8909 30.768 53.7429C30.8877 53.595 30.9769 53.4248 31.0306 53.2423C31.0843 53.0597 31.1014 52.8684 31.0809 52.6792C31.0604 52.4901 31.0028 52.3068 30.9112 52.14L22.2446 36.2511L22.1507 36.1644ZM18.2579 44.8889L20.9446 39.9633L23.6312 44.8889H18.2579Z" />
              <path d="M60.6667 3H27.4444C26.2952 3 25.193 3.45655 24.3803 4.2692C23.5677 5.08186 23.1111 6.18406 23.1111 7.33333V28.2778H4.33333C3.18406 28.2778 2.08186 28.7343 1.2692 29.547C0.456546 30.3596 0 31.4618 0 32.6111V57.1667C0 58.3159 0.456546 59.4181 1.2692 60.2308C2.08186 61.0434 3.18406 61.5 4.33333 61.5H7.94444V66.5556C7.94468 66.8391 8.02835 67.1163 8.18503 67.3526C8.34171 67.5889 8.56447 67.7739 8.82555 67.8844C9.00369 67.9603 9.19526 67.9996 9.38889 68C9.76329 68.0004 10.1232 67.8554 10.3928 67.5956L16.6978 61.5H37.5556C38.7048 61.5 39.807 61.0434 40.6197 60.2308C41.4323 59.4181 41.8889 58.3159 41.8889 57.1667V36.2222H48.3022L54.6072 42.3178C54.8768 42.5776 55.2367 42.7226 55.6111 42.7222C55.8047 42.7218 55.9963 42.6826 56.1744 42.6067C56.4355 42.4961 56.6583 42.3111 56.815 42.0748C56.9717 41.8385 57.0553 41.5613 57.0556 41.2778V36.2222H60.6667C61.8159 36.2222 62.9181 35.7657 63.7308 34.953C64.5434 34.1404 65 33.0382 65 31.8889V7.33333C65 6.18406 64.5434 5.08186 63.7308 4.2692C62.9181 3.45655 61.8159 3 60.6667 3ZM39 57.1667C39 57.5498 38.8478 57.9172 38.5769 58.188C38.306 58.4589 37.9386 58.6111 37.5556 58.6111H16.1128C15.7384 58.6107 15.3785 58.7557 15.1089 59.0156L10.8333 63.1467V60.0556C10.8333 59.6725 10.6812 59.3051 10.4103 59.0342C10.1394 58.7633 9.77198 58.6111 9.38889 58.6111H4.33333C3.95024 58.6111 3.58284 58.4589 3.31196 58.188C3.04107 57.9172 2.88889 57.5498 2.88889 57.1667V32.6111C2.88889 32.228 3.04107 31.8606 3.31196 31.5897C3.58284 31.3188 3.95024 31.1667 4.33333 31.1667H23.1111V31.8889C23.1111 33.0382 23.5677 34.1404 24.3803 34.953C25.193 35.7657 26.2952 36.2222 27.4444 36.2222H39V57.1667ZM62.1111 31.8889C62.1111 32.272 61.9589 32.6394 61.688 32.9103C61.4172 33.1812 61.0498 33.3333 60.6667 33.3333H55.6111C55.228 33.3333 54.8606 33.4855 54.5897 33.7564C54.3188 34.0273 54.1667 34.3947 54.1667 34.7778V37.8689L49.8911 33.7378C49.6215 33.478 49.2616 33.3329 48.8872 33.3333H27.4444C27.0614 33.3333 26.694 33.1812 26.4231 32.9103C26.1522 32.6394 26 32.272 26 31.8889V7.33333C26 6.95024 26.1522 6.58284 26.4231 6.31196C26.694 6.04107 27.0614 5.88889 27.4444 5.88889H60.6667C61.0498 5.88889 61.4172 6.04107 61.688 6.31196C61.9589 6.58284 62.1111 6.95024 62.1111 7.33333V31.8889Z" />
              <path d="M52.7222 13.8333H45.5V11.6667C45.5 11.2836 45.3478 10.9162 45.0769 10.6453C44.806 10.3744 44.4386 10.2222 44.0556 10.2222C43.6725 10.2222 43.3051 10.3744 43.0342 10.6453C42.7633 10.9162 42.6111 11.2836 42.6111 11.6667V13.8333H35.3889C35.0058 13.8333 34.6384 13.9855 34.3675 14.2564C34.0966 14.5273 33.9444 14.8947 33.9444 15.2778C33.9444 15.6609 34.0966 16.0283 34.3675 16.2992C34.6384 16.57 35.0058 16.7222 35.3889 16.7222H39.6572C39.9914 18.2362 40.5386 19.6951 41.2822 21.0556C41.5576 21.5541 41.8614 22.0364 42.1922 22.5C40.3909 24.2799 38.1469 25.5465 35.6922 26.1689C35.3225 26.2723 35.0091 26.5184 34.8208 26.8529C34.6326 27.1875 34.5849 27.5831 34.6883 27.9528C34.7918 28.3225 35.0378 28.6359 35.3724 28.8242C35.7069 29.0124 36.1025 29.0601 36.4722 28.9567C39.33 28.2103 41.9437 26.7316 44.0556 24.6667C46.1689 26.7121 48.7729 28.1795 51.6172 28.9278C51.8003 28.979 51.9916 28.9937 52.1803 28.9709C52.369 28.9482 52.5514 28.8885 52.7171 28.7953C52.8827 28.7021 53.0284 28.5771 53.1458 28.4276C53.2631 28.2781 53.3499 28.1069 53.4011 27.9239C53.4523 27.7408 53.467 27.5495 53.4443 27.3608C53.4215 27.1721 53.3618 26.9897 53.2686 26.824C53.1754 26.6584 53.0505 26.5127 52.901 26.3953C52.7514 26.278 52.5803 26.1912 52.3972 26.14C49.9413 25.5088 47.6977 24.235 45.8972 22.4494C47.0991 20.6998 47.9614 18.7398 48.4394 16.6717H52.7222C53.1053 16.6717 53.4727 16.5195 53.7436 16.2486C54.0145 15.9777 54.1667 15.6103 54.1667 15.2272C54.1667 14.8441 54.0145 14.4767 53.7436 14.2058C53.4727 13.935 53.1053 13.7828 52.7222 13.7828V13.8333ZM44.0556 20.0878C43.4228 19.0371 42.9368 17.9047 42.6111 16.7222H45.5C45.1743 17.9047 44.6883 19.0371 44.0556 20.0878Z" />
            </mask>
            <path
              d="M22.1507 36.1644C22.1219 36.1171 22.0905 36.0712 22.0568 36.0272L21.9629 35.9261L21.8618 35.8322L21.7246 35.7383L21.6668 35.6733L21.5224 35.6083L21.3996 35.5578H21.3274L21.0457 35.5H20.7496C20.6737 35.5109 20.5989 35.5278 20.5257 35.5506H20.4607C20.3957 35.5506 20.3307 35.6011 20.2657 35.6372L20.2007 35.6878C20.1445 35.7189 20.0913 35.7551 20.0418 35.7961C20.0094 35.8213 19.9803 35.8504 19.9551 35.8828L19.8396 35.9911L19.7529 36.1283L19.6879 36.215L11.0212 52.1039C10.9297 52.2707 10.8721 52.454 10.8516 52.6431C10.8311 52.8323 10.8482 53.0236 10.9019 53.2062C10.9556 53.3887 11.0448 53.5589 11.1644 53.7068C11.2841 53.8548 11.4318 53.9776 11.599 54.0683C11.8052 54.1917 12.0381 54.2635 12.2779 54.2778C12.5349 54.2814 12.7881 54.2163 13.0116 54.0894C13.235 53.9624 13.4206 53.7781 13.549 53.5556L16.6835 47.7778H25.2057L28.3401 53.5556C28.4686 53.7781 28.6541 53.9624 28.8776 54.0894C29.101 54.2163 29.3543 54.2814 29.6112 54.2778C29.8627 54.2817 30.1111 54.2221 30.3335 54.1044C30.5007 54.0137 30.6484 53.8909 30.768 53.7429C30.8877 53.595 30.9769 53.4248 31.0306 53.2423C31.0843 53.0597 31.1014 52.8684 31.0809 52.6792C31.0604 52.4901 31.0028 52.3068 30.9112 52.14L22.2446 36.2511L22.1507 36.1644ZM18.2579 44.8889L20.9446 39.9633L23.6312 44.8889H18.2579Z"
              stroke="#1F2C34"
              strokeWidth="2"
              mask="url(#path-1-inside-1_13_1544)"
            />
            <path
              d="M60.6667 3H27.4444C26.2952 3 25.193 3.45655 24.3803 4.2692C23.5677 5.08186 23.1111 6.18406 23.1111 7.33333V28.2778H4.33333C3.18406 28.2778 2.08186 28.7343 1.2692 29.547C0.456546 30.3596 0 31.4618 0 32.6111V57.1667C0 58.3159 0.456546 59.4181 1.2692 60.2308C2.08186 61.0434 3.18406 61.5 4.33333 61.5H7.94444V66.5556C7.94468 66.8391 8.02835 67.1163 8.18503 67.3526C8.34171 67.5889 8.56447 67.7739 8.82555 67.8844C9.00369 67.9603 9.19526 67.9996 9.38889 68C9.76329 68.0004 10.1232 67.8554 10.3928 67.5956L16.6978 61.5H37.5556C38.7048 61.5 39.807 61.0434 40.6197 60.2308C41.4323 59.4181 41.8889 58.3159 41.8889 57.1667V36.2222H48.3022L54.6072 42.3178C54.8768 42.5776 55.2367 42.7226 55.6111 42.7222C55.8047 42.7218 55.9963 42.6826 56.1744 42.6067C56.4355 42.4961 56.6583 42.3111 56.815 42.0748C56.9717 41.8385 57.0553 41.5613 57.0556 41.2778V36.2222H60.6667C61.8159 36.2222 62.9181 35.7657 63.7308 34.953C64.5434 34.1404 65 33.0382 65 31.8889V7.33333C65 6.18406 64.5434 5.08186 63.7308 4.2692C62.9181 3.45655 61.8159 3 60.6667 3ZM39 57.1667C39 57.5498 38.8478 57.9172 38.5769 58.188C38.306 58.4589 37.9386 58.6111 37.5556 58.6111H16.1128C15.7384 58.6107 15.3785 58.7557 15.1089 59.0156L10.8333 63.1467V60.0556C10.8333 59.6725 10.6812 59.3051 10.4103 59.0342C10.1394 58.7633 9.77198 58.6111 9.38889 58.6111H4.33333C3.95024 58.6111 3.58284 58.4589 3.31196 58.188C3.04107 57.9172 2.88889 57.5498 2.88889 57.1667V32.6111C2.88889 32.228 3.04107 31.8606 3.31196 31.5897C3.58284 31.3188 3.95024 31.1667 4.33333 31.1667H23.1111V31.8889C23.1111 33.0382 23.5677 34.1404 24.3803 34.953C25.193 35.7657 26.2952 36.2222 27.4444 36.2222H39V57.1667ZM62.1111 31.8889C62.1111 32.272 61.9589 32.6394 61.688 32.9103C61.4172 33.1812 61.0498 33.3333 60.6667 33.3333H55.6111C55.228 33.3333 54.8606 33.4855 54.5897 33.7564C54.3188 34.0273 54.1667 34.3947 54.1667 34.7778V37.8689L49.8911 33.7378C49.6215 33.478 49.2616 33.3329 48.8872 33.3333H27.4444C27.0614 33.3333 26.694 33.1812 26.4231 32.9103C26.1522 32.6394 26 32.272 26 31.8889V7.33333C26 6.95024 26.1522 6.58284 26.4231 6.31196C26.694 6.04107 27.0614 5.88889 27.4444 5.88889H60.6667C61.0498 5.88889 61.4172 6.04107 61.688 6.31196C61.9589 6.58284 62.1111 6.95024 62.1111 7.33333V31.8889Z"
              stroke="#1F2C34"
              strokeWidth="2"
              mask="url(#path-1-inside-1_13_1544)"
            />
            <path
              d="M52.7222 13.8333H45.5V11.6667C45.5 11.2836 45.3478 10.9162 45.0769 10.6453C44.806 10.3744 44.4386 10.2222 44.0556 10.2222C43.6725 10.2222 43.3051 10.3744 43.0342 10.6453C42.7633 10.9162 42.6111 11.2836 42.6111 11.6667V13.8333H35.3889C35.0058 13.8333 34.6384 13.9855 34.3675 14.2564C34.0966 14.5273 33.9444 14.8947 33.9444 15.2778C33.9444 15.6609 34.0966 16.0283 34.3675 16.2992C34.6384 16.57 35.0058 16.7222 35.3889 16.7222H39.6572C39.9914 18.2362 40.5386 19.6951 41.2822 21.0556C41.5576 21.5541 41.8614 22.0364 42.1922 22.5C40.3909 24.2799 38.1469 25.5465 35.6922 26.1689C35.3225 26.2723 35.0091 26.5184 34.8208 26.8529C34.6326 27.1875 34.5849 27.5831 34.6883 27.9528C34.7918 28.3225 35.0378 28.6359 35.3724 28.8242C35.7069 29.0124 36.1025 29.0601 36.4722 28.9567C39.33 28.2103 41.9437 26.7316 44.0556 24.6667C46.1689 26.7121 48.7729 28.1795 51.6172 28.9278C51.8003 28.979 51.9916 28.9937 52.1803 28.9709C52.369 28.9482 52.5514 28.8885 52.7171 28.7953C52.8827 28.7021 53.0284 28.5771 53.1458 28.4276C53.2631 28.2781 53.3499 28.1069 53.4011 27.9239C53.4523 27.7408 53.467 27.5495 53.4443 27.3608C53.4215 27.1721 53.3618 26.9897 53.2686 26.824C53.1754 26.6584 53.0505 26.5127 52.901 26.3953C52.7514 26.278 52.5803 26.1912 52.3972 26.14C49.9413 25.5088 47.6977 24.235 45.8972 22.4494C47.0991 20.6998 47.9614 18.7398 48.4394 16.6717H52.7222C53.1053 16.6717 53.4727 16.5195 53.7436 16.2486C54.0145 15.9777 54.1667 15.6103 54.1667 15.2272C54.1667 14.8441 54.0145 14.4767 53.7436 14.2058C53.4727 13.935 53.1053 13.7828 52.7222 13.7828V13.8333ZM44.0556 20.0878C43.4228 19.0371 42.9368 17.9047 42.6111 16.7222H45.5C45.1743 17.9047 44.6883 19.0371 44.0556 20.0878Z"
              stroke="#1F2C34"
              strokeWidth="2"
              mask="url(#path-1-inside-1_13_1544)"
            />
          </svg>
          <h4>
            {currentLanguage === "en" ? (
              <>Multilingual Hospitality</>
            ) : currentLanguage === "sq" ? (
              <>Mikpritja shumëgjuhëshe</>
            ) : currentLanguage === "sr" ? (
              <>višejezično gostoprimstvo</>
            ) : (
              <>Mehrsprachige Gastfreundschaft</>
            )}
          </h4>
          <p>
            {currentLanguage === "en" ? (
              <>
                Our staff speaks Albanian, English, German, French, Italian, and
                Serbian, ensuring personalized service and effective
                communication.
              </>
            ) : currentLanguage === "sq" ? (
              <>
                Stafi ynë flet shqip, anglisht, gjermanisht, frëngjisht,
                italisht dhe serbisht, duke siguruar shërbim të personalizuar
                dhe komunikim efektiv.
              </>
            ) : currentLanguage === "sr" ? (
              <>
                Naše osoblje govori albanski, engleski, nemački, francuski,
                italijanski i srpski, obezbeđujući personalizovanu i efikasnu
                uslugu komunikacija.
              </>
            ) : (
              <>
                Unser Personal spricht Albanisch, Englisch, Deutsch,
                Französisch, Italienisch und Serbisch und gewährleistet so
                persönlichen Service und effektive Kommunikation.
              </>
            )}
          </p>
        </div>
      </div>
      <div className={styles.section3}>
        <div className={styles.happyCustomers}>
          <svg
            width="100"
            height="90"
            viewBox="0 0 100 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.15"
              d="M76.1134 90C68.2861 90 62.6181 87.1154 59.1093 81.3462C55.6005 75.5769 53.8462 68.9423 53.8462 61.4423C53.8462 57.1154 54.386 52.3558 55.4656 47.1634C56.5452 41.9712 58.5695 36.7789 61.5385 31.5865C64.7773 26.1058 69.2308 20.7692 74.8988 15.5769C80.5668 10.0962 88.1242 4.90385 97.5709 0L100 3.89423C94.6019 9.375 90.2834 14.1346 87.0445 18.1731C84.0756 22.2115 81.7814 25.9615 80.1619 29.4231C78.5425 32.8846 77.4629 36.0577 76.9231 38.9423C76.6532 41.8269 76.5182 44.8558 76.5182 48.0288C76.5182 50.3365 77.193 52.0673 78.5425 53.2211C79.892 54.0865 81.3765 55.2404 82.9959 56.6827C85.4251 58.4135 87.5844 60.1442 89.4737 61.875C91.6329 63.3173 92.7125 66.4904 92.7125 71.3942C92.7125 76.5865 91.0931 81.0577 87.8543 84.8077C84.6154 88.2692 80.7018 90 76.1134 90ZM22.6721 90C14.8448 90 9.04184 87.1154 5.26316 81.3462C1.75439 75.5769 0 68.9423 0 61.4423C0 57.1154 0.539811 52.5 1.61943 47.5962C2.69906 42.4039 4.8583 37.0673 8.09717 31.5865C11.336 26.1058 15.7895 20.7692 21.4575 15.5769C27.1255 10.0962 34.6829 4.90385 44.1296 0L46.5587 3.89423C41.1606 9.375 36.8421 14.1346 33.6032 18.1731C30.6343 22.2115 28.3401 25.9615 26.7206 29.4231C25.1012 32.8846 24.0216 36.0577 23.4818 38.9423C23.2119 41.8269 23.0769 44.8558 23.0769 48.0288C23.0769 50.3365 23.6167 52.0673 24.6964 53.2211C26.0459 54.375 27.5304 55.3846 29.1498 56.25C31.309 57.6923 33.4683 59.4231 35.6275 61.4423C38.0567 63.1731 39.2713 66.4904 39.2713 71.3942C39.2713 76.5865 37.6518 81.0577 34.413 84.8077C31.444 88.2692 27.5304 90 22.6721 90Z"
              fill="#EDF0F5"
            />
          </svg>
          <p>
            {currentLanguage === "en" ? (
              <>Happy Clients</>
            ) : currentLanguage === "sq" ? (
              <>Klientë të lumtur</>
            ) : currentLanguage === "sr" ? (
              <>Sretni Klijenti</>
            ) : (
              <>Zufriedene Kunden</>
            )}
          </p>
        </div>
        <div className={styles.reviewsWrapper} id="reviewsWrapper">
          {reviewsResponse.map((data, index) => {
            return (
              <div key={index} className={styles.review} id="review">
                <h4>{data.attributes.reviewText}</h4>
                <div className={styles.reviewerInfo}>
                  <h6>{data.attributes.reviewer}</h6>
                  <p>{data.attributes.room}</p>
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
                        opacity: data.attributes.stars >= 2 ? "1" : "0.4",
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
                        opacity: data.attributes.stars >= 3 ? "1" : "0.4",
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
                        opacity: data.attributes.stars >= 4 ? "1" : "0.4",
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
                        opacity: data.attributes.stars >= 5 ? "1" : "0.4",
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
              left: "70*1.33333px",
            }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="25"
              cy="25"
              r="25"
              transform="matrix(-1 0 0 1 50 0)"
              fill="white"
            />
            <path
              d="M14.541 25.4389C19.3856 25.4389 23.3129 21.5116 23.3129 16.667M14.541 25.4389C19.3856 25.4389 23.3129 29.3662 23.3129 34.2109M14.541 25.4389H35.0879"
              stroke="#1F2C34"
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
              right: "70*1.33333px",
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
              fill="white"
            />
            <path
              d="M14.541 25.4389C19.3856 25.4389 23.3129 21.5116 23.3129 16.667M14.541 25.4389C19.3856 25.4389 23.3129 29.3662 23.3129 34.2109M14.541 25.4389H35.0879"
              stroke="#1F2C34"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
      <KosovoMap />
    </div>
  );
};

export default About;

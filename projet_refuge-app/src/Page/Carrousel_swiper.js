import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import css page
import "../Carrousel_swiper.css";

const dogs = [
    { name: "Milo", age: "2 Ans 1/2", race: "Européen", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechat/chat_blancroux_1.1.jpg" },
    { name: "Bella", age: "1 An", race: "Berger malinois", Sexe: "Femelle stérilisé", imgSrc: "/img/img_galeriechien/chien_malinois_2.1.jpg" },
    { name: "Bogart", age: "3 Ans", race: "Européen", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechat/chat_blancnoir1.webp" },
    { name: "Lucky", age: "4 Ans", race: "American staff", Sexe: "Mâle stérilisé", imgSrc: "/img/img_galeriechien/chien_brun_1.2.jpg" },
    { name: "Coco", age: "1 an 1/2", race: "Siamois", Sexe: "Femelle stérilisé", imgSrc: "/img/img_galeriechat/chat_siamois_1.2.jpg" },
];

const Carousel_swiper = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;

    const handleNext = () => {
        if (currentIndex + itemsPerPage >= dogs.length) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (currentIndex === 0) {
            setCurrentIndex(dogs.length - itemsPerPage);
        } else {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    useEffect(() => {
        const autoScroll = setInterval(() => {
            handleNext();
        }, 3500);
        return () => clearInterval(autoScroll);
    }, [currentIndex]);

    return (
        <div className="carousel_container">
            <Swiper
                modules={[EffectCoverflow, Navigation, Pagination]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={2}
                loop={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 150,
                    modifier: 2.5,
                    slideShadows: false,
                }}
                navigation={true}
                pagination={{ clickable: true }}
                className="custom-swiper"
            >
                {dogs.map((dog, index) => (
                    <SwiperSlide key={`dog-${index}`}>
                        <div className="swiper_card">
                            <img className="swiper_card_image" src={dog.imgSrc} alt={`Photo de ${dog.name}`} />
                            <div className="swiper_card_info">
                                <h3 className="h3card_info_swiper">{dog.name}</h3>
                                <p>Âge : {dog.age}</p>
                                <p>Race : {dog.race}</p>
                                <p>Sexe : {dog.Sexe}</p>
                                <Link to={`/Ficheperso_animal`} className="swiper_details_button">Détails</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carousel_swiper;

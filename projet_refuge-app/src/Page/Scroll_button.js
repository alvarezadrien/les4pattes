import React, { useState, useEffect } from "react";
import "../Scroll_button.css";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <button
            id="scrollBtn"
            className={isVisible ? "show" : "hide"}
            onClick={scrollToTop}
            title="Aller en haut"
        >
            ↑
        </button>
    );
};

export default ScrollToTopButton;

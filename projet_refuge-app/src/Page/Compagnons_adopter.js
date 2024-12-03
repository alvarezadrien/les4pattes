import React from "react";
import '../Compagnons_adopter.css';

const Compagnons_adopter = () => {
    return (
        <div className="page_compagnons">
            <section className="container_compagnons">
                <div className="animal_group_compagnons">
                    <div className="item_flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img src="/img/chat_galeriefiche.jpg" alt="Photo de Diablo" />
                                <h3>Diablo</h3>
                                <span>Sexe : Mâle</span>
                                <span>Âge : 3 ans</span>
                            </div>
                            <div className="flip-card-back">
                                <p className="animal-description">
                                    Depuis son adoption, Diablo a trouvé sa place dans une famille aimante. Il s'adapte bien à son nouveau foyer et aime passer du temps à jouer avec ses jouets. C'est un chat calme et affectueux, toujours prêt pour une caresse.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Compagnons_adopter;

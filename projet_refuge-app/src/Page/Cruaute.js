import React from 'react';
import '../Cruaute.css';

const Cruaute = () => {
    return (
        <div>
            <section className="page_cruaute">
                <h1 className="h1_titre_cruaute">Témoin de cruauté ?</h1>
            </section>

            <div className="container_para_cruaute1">
                <p className="para_cruaute1">
                    La cruauté animale est inacceptable, chaque année des milliers d'animaux en souffrent,
                    d'abandon, de maltraitance ou de la négligence de la part de leur maître. Certains propriétaires peuvent
                    aller jusqu'à la maltraitance physique envers leurs animaux, par exemple : coups jusqu'aux blessures et manque de soins.
                    La maltraitance de privation de nourriture, d'eau ou de vie adaptée à leurs besoins.
                </p>
            </div>

            <div className="container_cruaute_chat">
                <div className="container_img_cruaute1">
                    <img src="/img/chat_abandon1.jpeg" alt="Chat abandonné" />
                </div>
                <div className="container_paragraphes">
                    <p className="para01">
                        La lutte contre la maltraitance est
                        l'une des grandes priorités de notre refuge.
                    </p>
                    <p className="para02">
                        En sensibilisant et en agissant, nous pouvons construire un monde où ces injustices n'ont plus leur place.
                    </p>
                </div>
            </div>

            <div className="container_cruaute">
                <div className="div_h2_cruaute1">
                    <h2 className="h2_titre03">Que faire si vous êtes témoin de cruauté animale ?</h2>
                </div>

                <div className="div_para03">
                    <p className="para03">
                        Si vous êtes témoin d'une situation de cruauté ou de négligence,
                        vous pouvez appeler notre numéro d'urgence en cas de situation
                        grave au 0492764208 ou la police au 101. Si c'est des animaux autres
                        que des chiens et chats, contactez-nous et nous ferons le nécessaire
                        pour qu'ils soient pris en charge avec les meilleurs soins et respect.
                    </p>
                </div>

                <div className="div_para04">
                    <p className="para04">
                        Prenez aussi des notes de la situation pour aider nos équipes à mieux comprendre.
                    </p>
                </div>
            </div>

            <div className="div_container_img0">
                <div className="container_img_cruaute2">
                    <img src="/img/img_chien_cruauté1.jpeg" alt="Chien victime de cruauté" />
                </div>

                <div className="container_img_cruaute3">
                    <img src="/img/images_chien_cruauté2.jpeg" alt="Chien en détresse" />
                </div>
            </div>

            <div className="container_para05">
                <h2 className="h2_titre05">Petites actions, grands impacts</h2>
                <p className="para05">
                    La cruauté envers les animaux est une réalité que nous ne pouvons ignorer. Mais tout le monde peut contribuer à changer les choses, même à petite échelle. Voici quelques façons d'agir pour défendre ceux qui ne peuvent pas parler pour eux-mêmes.
                </p>
            </div>

            <div className="container_cruaute6">
                <div className="div_h2_cruaute06">
                    <h2 className="h2_titre06">éduquez votre entourage</h2>
                </div>

                <div className="div_para06">
                    <ol className='ol_li'>
                        <li>Les signes de maltraitance ou négligence</li>
                        <li>Apprenez leur tout le respect envers les animaux</li>
                        <li>Les avantages d’adopter un animal au lieu d’acheter</li>
                    </ol>
                </div>
            </div>

            <div className="container_cruaute7">
                <div className="div_h2_cruaute07">
                    <h2 className="h2_titre06">Soyez un consommateur responsable</h2>
                </div>

                <div className="div_para07">
                    <ol className='ol_li'>
                        <li>évitez les produits issus de l’exploitation animal</li>
                        <li>Soutenez les entreprises respueuses du bien être animal</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Cruaute;

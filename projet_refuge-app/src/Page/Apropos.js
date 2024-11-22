import React from "react";
import '../Apropos.css'
import Navbar from '../components/Navbar/Navbar'

const Apropos = () => {
    return (
        <div>
            <div className="container_img_propos">
                <div className="img0">
                    <img src="/img/img_etablissement.jpg" alt="" />
                </div>

                {/* Côté gauche */}

                <div className="img_1">
                    <img src="/img/téléchargement (1).jpeg" alt="" width={230} height={230} />
                </div>
                <div className="img_2">
                    <img src="/img/téléchargement (2).jpeg" alt="" width={230} height={230} />
                </div>

                {/* Côté droit */}

                <div className="img_3">
                    <img src="/img/téléchargement(3).jpeg" alt="" width={230} height={230} />
                </div>
                <div className="img_4">
                    <img src="/img/téléchargement (4).jpeg" alt="" width={230} height={230} />
                </div>

            </div>

            {/* Div pattes propos */}
            <div className="pattes_propos">
                <h2>Les 4 pattes</h2>
                <img src="/img/img_aide_soins.jpg" alt="" width={500} height={420} />

                <p className="paragraphe_pattes">L’association Protectrice des Animaux Les 4 <br />
                    pattes est l’une des plus anciennes sociétés <br />
                    de protection animale de Belgique. Nous hébergeons <br />
                    des chiens et chats dans notre centre d’accueils <br />
                    à Bruxelles (Anderlecht)
                    <br /><br />
                    Nous accueillons en moyenne près de 100 <br />
                    chiens et chats par mois, victimes d’abandons. <br />
                    Nous prenons soin d’eux et nous efforçons <br />
                    de leur trouver des familles pour les adopter.
                </p>

                <div className="img_homme_chien">
                    <img src="/img/homme_chien.jpg" alt="" width={500} height={500} />
                </div>

                <p className="paragraphe_pattes2">
                    Une moyenne journalière de 600 pensionnaires exige <br />
                    de grandes quantités de nourriture, sans compter l’entretien <br />
                    des niches, des soins vétérinaires…  Les 4 pattes n’est <br />
                    subventionnée par aucun pouvoir public. Nous <br />
                    subsistons grâce aux cotisations de nos membres <br />
                    et à leurs dons permanents, leurs legs et leurs donations.
                </p>
            </div>

            <hr />

            <div className="histoire">
                <h2>Notre histoire</h2>

                <div className="img_histoire1">
                    <img src="/img/ancien_refuge.jpg" alt="" />
                </div>

                <p className="paragraphe_histoire1">
                    Les 4 pattes est aujourd’hui l’une des plus importantes et plus anciennes sociétés de protection animale de Belgique : la Société Contre la Cruauté envers les Animaux – son nom d’origine – a été fondée en 1908 par Jules Ruhl. C’est par amour pour les animaux que ce dernier, encore tout jeune docteur en sciences naturelles, a fait bâtir, avec ses fonds propres, des refuges pour les animaux en détresse à Verviers, sa ville natale, mais aussi à Liège, Namur, Dinant, Charleroi, Mons, La Louvière, Ostende, Louvain et encore à Bruxelles, où l’asile-refuge de la Rue des Papillons  à Anderlecht était bien connu du public bruxellois : un service d’accueil y fonctionnait sans interruption depuis son ouverture ! La dénomination
                    « Les 4 pattes » trouve d’ailleurs son origine dans ce lieu-dit, vraisemblablement l’ancien pré commun de ce « petit village de métayers » qu’était Anderlecht à l’époque. Très vite, la Société Contre la Cruauté envers les Animaux est appelée
                    Les 4 pattes et ce nom est devenu celui sous lequel désormais l’on désigne la société. Toujours en 1908, Jules Ruhl crée le premier service d’enlèvement d’animaux à domicile… qui s‘effectuait en carriole, le seul moyen de transport que
                    Les 4 pattes disposait alors !
                    C’est également Jules Ruhl qui a fondé la revue Nos Meilleurs Amis, où il plaide en faveur des animaux. Il rédigeait seul tous les articles ! Mais Jules Ruhl n’a pas eu que des amis : en cette période d’avant-guerre 1914-1918, il avait des adversaires dont le but, pour certains, était d’obtenir le maximum de rendement des animaux pour le tractage de leurs chariots et voitures. Pensons aux sort réservé aux chevaux dans les mines de charbon par exemple… Mais Jules Ruhl est convaincant et son travail commence à payer : en mars 1929, il remporte une écrasante victoire en obtenant la promulgation de la loi protégeant les animaux. Il en avait rédigé le texte lui-même !
                </p>

                <div className="div_histoire2">
                    <div className="img_histoire2">
                        <img src="/img/spa-jules.jpg" alt="" />
                    </div>

                    <p className="paragraphe_histoire2">
                        Jules Ruhl est resté à la pointe du combat contre la cruauté envers les animaux pendant 28 ans, jusqu’à ce jour fatal du 31 décembre 1936 : Jules Ruhl meurt des suites d’un accident à la gare du Midi, à Bruxelles, alors qu’il contrôlait le transport de quelques chevaux à destination de Paris.
                        Grâce à lui et à son œuvre, des millions d’animaux ont échappé à une souffrance barbare.
                        Son but, qui est encore et toujours  le nôtre aujourd’hui, est de combattre en tout lieu et toute circonstance les souffrances infligées aux animaux, quels qu’ils soient.
                        Mais malgré le décès de son fondateur,
                        Les 4 pattes continue à se développer, notamment grâce aux nombreux appuis de hauts personnages et l’intérêt profond du premier souverain de Belgique, Léopold Ier.
                    </p>
                </div>

            </div>

        </div>
    );
};

export default Apropos
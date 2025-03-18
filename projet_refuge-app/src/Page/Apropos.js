import React from "react";
import "../Apropos.css";

const Apropos = () => {
  return (
    <div>
      <div className="container_img_propos" />

      <div className="div_propos1">
        <div className="rectangle_propos1">
          <h2>Notre mission</h2>

          <p>
            L'association protectrice des animauix Les 4 pattes est l'une des
            plus anciennes sociétés de protection animale de Belgique. Nous
            hébergeons des chiens et chats dans notre centre d'accueils à
            Bruxelles (Anderlecht). Nous accueillons en moyenne près de 100
            chiens et chats par mois, victimes d'abandons. Nous prenons soin
            d'eux et nous efforçons de leur trouver des familles pour les
            adopter.
          </p>
        </div>
        <div className="image_propos1">
          <img
            src="/img/img_aide_soins.jpg"
            alt="Image de deux soigneurs avec un chien"
          />
        </div>

        {/* Espace entre div par bande color */}
        <div className="div_espace1" />

        <div className="div_propos2">
          <div className="image_propos2">
            <img
              src="/img/homme_chien_propos.jpg"
              alt="Homme en orange tiens un chien dans ces bras"
            />
          </div>
          <div className="rectangle_propos2">
            <h2>Notre mission</h2>

            <p>
              Une moyenne journalière de 600 pensionnaire exige de grandes
              quantités de nourriture, sans compter l'entretien, des niches, des
              soins vétérinaires… Les 4 pattes n'est subventionnée par aucun
              pouvoir public. Nous subsistons grâce aux cotisations de nos
              membres et à leurs dons permanents, leurs legs et leurs donations.
            </p>
          </div>
        </div>

        {/* Espace entre div par bande color */}
        <div className="div_espace1" />
      </div>
      {/* Partie notre histoire */}

      <div className="container_histoire">
        <h1 className="h1_histoire">Notre histoire</h1>

        <div className="image_histoire1">
          <img
            src="/img/ancien_refuge.jpg"
            alt="Image en noire et blanc, qui represente les refuge avant"
          />
        </div>
      </div>

      {/* Partie bas de histoire */}
      <div className="container_histoire2">
        <div className="div_container_histoire1">
          <p>
            Les 4 pattes est aujourd’hui l’une des plus importantes et plus
            anciennes sociétés de protection animale de Belgique : la Société
            Contre la Cruauté envers les Animaux – son nom d’origine – a été
            fondée en 1908 par Jules Ruhl. C’est par amour pour les animaux que
            ce dernier, encore tout jeune docteur en sciences naturelles, a fait
            bâtir, avec ses fonds propres, des refuges pour les animaux en
            détresse à Verviers, sa ville natale, mais aussi à Liège, Namur,
            Dinant, Charleroi, Mons, La Louvière, Ostende, Louvain et encore
            à Bruxelles, où l’asile-refuge de la Rue des Papillons  à Anderlecht
            était bien connu du public bruxellois : un service d’accueil y
            fonctionnait sans interruption depuis son ouverture ! La
            dénomination « Les 4 pattes » trouve d’ailleurs son origine dans ce
            lieu-dit, vraisemblablement l’ancien pré commun de ce « petit
            village de métayers » qu’était Anderlecht à l’époque. Très vite, la
            Société Contre la Cruauté envers les Animaux est appelée Les 4
            pattes et ce nom est devenu celui sous lequel désormais l’on désigne
            la société. Toujours en 1908, Jules Ruhl crée le premier service
            d’enlèvement d’animaux à domicile… qui s‘effectuait en carriole, le
            seul moyen de transport que Les 4 pattes disposait alors ! C’est
            également Jules Ruhl qui a fondé la revue Nos Meilleurs Amis, où il
            plaide en faveur des animaux. Il rédigeait seul tous les articles !
            Mais Jules Ruhl n’a pas eu que des amis : en cette période
            d’avant-guerre 1914-1918, il avait des adversaires dont le but, pour
            certains, était d’obtenir le maximum de rendement des animaux pour
            le tractage de leurs chariots et voitures. Pensons aux sort réservé
            aux chevaux dans les mines de charbon par exemple… Mais Jules Ruhl
            est convaincant et son travail commence à payer : en mars 1929, il
            remporte une écrasante victoire en obtenant la promulgation de la
            loi protégeant les animaux. Il en avait rédigé le texte lui-même !
          </p>
        </div>
        <div className="div_container_histoire2">
          <figure className="img_jules">
            <img src="/img/spa-jules.jpg" alt="" />
            <figcaption className="mini_titre">
              {" "}
              Jules Ruhl (Créateur du refuge)
            </figcaption>
          </figure>

          <p>
            Jules Ruhl est resté à la pointe du combat contre la cruauté envers
            les animaux pendant 28 ans, jusqu’à ce jour fatal du 31 décembre
            1936 : Jules Ruhl meurt des suites d’un accident à la gare du Midi,
            à Bruxelles, alors qu’il contrôlait le transport de quelques chevaux
            à destination de Paris. Grâce à lui et à son œuvre, des millions
            d’animaux ont échappé à une souffrance barbare. Son but, qui est
            encore et toujours  le nôtre aujourd’hui, est de combattre en tout
            lieu et toute circonstance les souffrances infligées aux animaux,
            quels qu’ils soient. Mais malgré le décès de son fondateur, Les 4
            pattes continue à se développer, notamment grâce aux nombreux appuis
            de hauts personnages et l’intérêt profond du premier souverain de
            Belgique, Léopold Ier.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Apropos;

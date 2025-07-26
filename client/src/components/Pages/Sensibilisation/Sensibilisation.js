import React from "react";
import "./Sensibilisation.css";

const Sensibilisation = () => {
  return (
    <>
      <div className="container_sensibilisation1">
        <h1 className="h1_sensi1">Sensibilisation</h1>
        <div className="div_container_sensi1">
          <img src="/img/pexels_chien_heureux_sensi.jpg" alt="" />
          <div className="text_sensi1">
            <h2>
              Pourquoi la sensibilisation est-elle importante pour un refuge ?
            </h2>
            <p>
              Les refuges sont des lieux d’accueil et de protection pour des
              animaux souvent maltraités ou abandonnés. Cependant, leur mission
              ne se limite pas à accueillir et soigner ces animaux. La
              sensibilisation est un outil essentiel pour prévenir les abandons
              et améliorer le bien-être des animaux à long terme. En élevant la
              conscience du public sur la situation des animaux en refuge, nous
              pouvons contribuer à un avenir où chaque animal est respecté et
              pris en charge de manière responsable. La sensibilisation permet
              également d’encourager l’adoption, de promouvoir la stérilisation
              et de créer une culture de respect envers nos compagnons à quatre
              pattes.
            </p>
          </div>
        </div>
      </div>

      {/* grid */}
      <div className="container_sensi_grid">
        <div className="grid_item_sensi1">
          <h3>Les enjeux de la protection animale</h3>
          <p>
            Chaque année, des millions d’animaux sont abandonnés dans le monde
            entier. Ces animaux se retrouvent dans des situations de grande
            détresse, souvent sans abri et sans soins appropriés. L'abandon
            d'animaux est une réalité tragique qui peut être évitée si nous
            prenons conscience des responsabilités liées à l’adoption d’un
            animal.
          </p>
        </div>
        <div className="grid_item_sensi2">
          <h3>Les raisons de ces abandons sont diverses</h3>
          <p>
            déménagement, perte d'intérêt pour l'animal, manque de moyens pour
            assurer ses soins ou simplement une décision irréfléchie.
            Malheureusement, ces animaux se retrouvent souvent dans des refuges
            déjà saturés. Cela engendre un surpeuplement, limitant ainsi la
            capacité d’accueil et d’accompagnement des refuges.
          </p>
        </div>
        <div className="grid_item_sensi3">
          <h3>Stérilisation : une nécessité pour lutter contre l'abandon</h3>
          <p>
            Le manque de stérilisation des animaux domestiques est également un
            problème majeur. Chaque année, des milliers d’animaux naissent sans
            que personne ne soit prêt à les accueillir, contribuant ainsi à
            l’augmentation du nombre d'animaux sans foyer.
          </p>
        </div>
        <div className="grid_item_sensi">
          <img src="/img/chien chat .jpeg" alt="" />
        </div>
        <div className="grid_item_sensi">
          <img src="/img/chat_galerie.jpg" alt="" />
        </div>
        <div className="grid_item_sensi">
          <img src="/img/Chien_fiche1.jpg" alt="" />
        </div>
      </div>

      <hr />

      <div className="container_sensi2">
        <div className="text_sensi2">
          <h3>Que pouvons-nous faire pour chnager la situation</h3>
          <p>
            Adopter plutôt qu'acheter L'adoption est une solution essentielle
            pour donner une nouvelle vie à un animal. En choisissant d’adopter
            dans un refuge, vous offrez une chance à un animal abandonné de
            vivre dans un foyer aimant. Chaque adoption compte et aide à alléger
            la charge des refuges tout en réduisant les souffrances animales.
          </p>
        </div>
        <div className="img_sensi2">
          <div>
            <img
              src="/img/pexels-kevin-early-492318467-29011426.jpg"
              alt=""
              width={300}
              height={300}
            />
          </div>
          <div>
            <p>
              Ensemble, nous pouvons faire la différence ! La sensibilisation à
              la cause animale est un travail continu, et chaque action compte.
              Que vous choisissiez d’adopter, de faire un don ou de vous
              impliquer en tant que bénévole, vous avez le pouvoir de changer la
              vie d’un animal en refuge. Ensemble, faisons en sorte que chaque
              animal reçoive l’amour et l’attention qu’il mérite, et
              construisons un avenir où les abandons seront de moins en moins
              fréquents.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sensibilisation;

import React from 'react';
import '../Equipe.css';

const Equipe = () => {
    return (
        <div>
            <div className='container_img_equipe'>
                <h1 className='h1_equipe'>Notre équipe</h1>
            </div>

            <p className='para1'>
            Au Refuge les 4 pattes, nous sommes fiers de notre 
            équipe dévouée qui travaille sans relâche pour offrir 
            un environnement sûr et aimant à nos amis à quatre pattes. 
            Chacun de nos membres joue un rôle essentiel dans le bien-être de nos animaux. 
            Découvrez ci-dessous les différents rôles au sein de notre refuge :
            </p>

            <div className='img1_equipe'>
                <img src="/img/téléchargement (4).jpeg" alt="" />
            </div>

            <h2 className='role_equipe'>Le rôle de notre équipe</h2>

            <div className='img2_equipe'>
                <img src="/img/veto_equipe.webp" alt="" />
            </div>

            <p className='para2'>
            <strong>Vétérinaire</strong> <br />
            Le vétérinaire du refuge est responsable de 
            la santé physique et mentale de nos animaux.
            Il effectue des examens réguliers, administre 
            des vaccinations, et traite les maladies ou blessures.
            Son expertise est essentielle pour assurer que chaque 
            animal est en bonne santé et prêt à trouver un nouveau foyer.
            </p>

            <p className='para3'> 
                <strong>Soigneurs animaliers</strong> <br />
                Nos soigneurs animaliers sont au 
                cœur du refuge. Ils s'occupent quotidiennement 
                des chiens et des chats en leur offrant nourriture, 
                soins, et affection. Ils passent du temps avec les 
                animaux, les sortent en promenade, et jouent avec eux 
                pour garantir leur bien-être physique et émotionnel.
            </p>

            <div className='img3_equipe'>
                <img src="/img/soigneur_refuge.jpg" alt="" />
            </div>

            <div className='img4_equipe'>
                <img src="/img/nettoie_refuge.jpg" alt="" />
            </div>

            <p className='para4'>
            <strong>Agent de nettoyage</strong> <br />
            Bien que souvent sous-estimé, l'agent 
            de nettoyage joue un rôle essentiel pour 
            maintenir un environnement sain et sécurisé 
            pour nos animaux. Il s'assure que tous les 
            espaces sont propres, ce qui aide à prévenir 
            les maladies et à offrir un cadre agréable tant pour 
            les animaux que pour les visiteurs.
            </p>

        </div>
    )
}

export default Equipe
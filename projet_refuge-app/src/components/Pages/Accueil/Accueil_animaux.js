import React from 'react'
import './Accueil_animaux.css'

const Accueil_animaux = () => {
    return (
        <div className='page_accueil'>
            <div className='container_accueil1'>
                <h1 className='h1_accueil'>L'accueil des animaux</h1>

                <div className='container_img_accueil'>
                    <div className='img_accueil1'>
                        <img src="/img/photo_chien_accueil1.jpg" alt="" width={330} height={330} />
                    </div>

                    <div className='img_accueil2'>
                        <img src="/img/animals-chien_et_chat.jpg" alt="" width={600} height={350} />
                    </div>

                    <div className='img_accueil3'>
                        <img src="img/photo_cat_accueil1.jpg" alt="" width={330} height={330} />
                    </div>
                </div>
            </div>

            <h2 className='h2_accueil'>L'accueil</h2>

            <p className='para_accueil1'>
                Au refuge Les 4 Pattes, chaque animal
                trouve une seconde chance pour commencer
                une nouvelle vie, pleine de soin et d'attention.
                Dès leur arrivée, nos équipes dévouées veillent à
                offrir un environnement sécurisé et rassurant, adapté
                aux besoins de chaque compagnon. Que ce soit un chien,
                un chat, notre priorité est leur bien-être.
            </p>

            <p className='para_accueil2'>
                Les animaux sont soigneusement évalués
                dès leur arrivée pour garantir leur
                santé et leur sécurité. Nous leur offrons
                des soins vétérinaires, une alimentation
                équilibrée et une attention particulière
                pour les aider à se sentir chez eux. De plus,
                nous mettons en place des programmes d'adaptation
                pour ceux qui ont besoin de temps pour se remettre
                de leurs expériences passées.
            </p>

            <div className='img_accueil_chat'>
                <img src="/img/photo_cat_accueil2.jpg" alt="" width={800} height={300} />
            </div>

            <p className='para_accueil3'>
                Notre mission est d'accompagner chaque animal
                sur le chemin de l'adoption, en leur donnant
                l'opportunité de trouver une famille aimante
                et responsable. Chez Les 4 Pattes, nous croyons
                que chaque animal mérite une chance et nous nous
                engageons à leur offrir tout le soutien nécessaire
                jusqu'à leur nouvelle vie.
            </p>
        </div>
    )
}

export default Accueil_animaux
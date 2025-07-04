import React from 'react'
import './Adhesions.css'

const Adhesions = () => {
    return (
        <div className='page_adhesions'>

            <div className='container_img_adhesions'>
                <div className='div_img_adhesions1'>
                    <img src="/img/photo_cat_accueil2.jpg" alt="Chat principal" width={1000} height={400} />
                </div>
                <div className='div_img_adhesions2'>
                    <img src="/img/photo_cat_accueil1.jpg" alt="Petit chat" width={340} height={340} />
                </div>
                <div className='div_para_adhesions1'>
                    <h1 className='h1_adhesions'>Adhésions</h1>

                    <p className='para_adhesions1'>
                        Tout ce que nous accomplissons,
                        nous le devons à votre générosité.
                        Pour renforcer notre impact, envisagez
                        de devenir membre !
                    </p>
                </div>
            </div>
            <h2 className='h2_adhesions'>Explorez nos différentes options de soutien</h2>

            <div className='ul_container_adhesions'>
                <ul className='ul_adhesions'>
                    <li>La cotisation en tant que membres adhérent : **15€**</li>
                    <li>La cotisation en tant que membre sympathisant : **25€**</li>
                    <li>La cotisation en tant que membre protecteur : **60€**</li>
                    <li>La cotisation en tant que membre à vie : **250€** (à ne payer qu'une seule fois)</li>
                </ul>
            </div>

            {/* LE CHAT EST MAINTENANT À GAUCHE DU TEXTE DANS CE BLOC */}
            <div className='container_paiement'>
                <img src="/img/contact-cat.png" alt="Icône de chat" className="cat_image_paiement" />
                <div className='payment_details_wrapper'> {/* Nouveau wrapper pour le texte */}
                    <h5 className='h5_adhesions'>Voici notre numéro de compte pour le paiement</h5>
                    <span className='span_bank'>BE 79 1140 2004 0000 3102 8079 8178</span>

                    <ul className='ul_bank'>
                        <li>Vous pouvez payer anonymement</li>
                        <li>Vous pouvez payer avec votre numéro d'adhérent en communication</li>
                    </ul>
                </div>
            </div>

            <hr />

            <div className='div_para_adhesions'>
                <div className='div_para_adhesions2'>
                    <p className='para_adhesions2'>
                        En devenant membre de notre association, vous entrez dans une communauté
                        engagée pour la cause animale. Mais quels sont les avantages que vous obtenez
                        en adhérant à notre cause ?
                        En plus de soutenir nos actions en faveur du bien-être animal,
                        votre adhésion vous donne accès à une gamme d'avantages exclusifs.
                        En tant que membre, vous recevrez une carte de membre, symbole de votre engagement envers notre mission !
                    </p>
                </div>

                <div className='div_para_adhesions3'>
                    <p className='para_adhesions3'>

                        Mais ce n'est pas tout ! En tant que membre,
                        vous aurez également accès à notre magazine, une source
                        d'informations précieuse sur les dernières avancées dans nos domaines
                        d'action. Notre revue vous tiendra informé des progrès réalisés, des défis
                        à relever et des initiatives qui façonnent un avenir meilleur pour les animaux.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Adhesions
import React from 'react'
import '../Conditions_adoption.css'

const Conditions_adoption = () => {
    return (
        <div className='page_container_conditions'>
            <div className='img_conditions'>
                <img src="/img/images_condi_adopt.jpg" alt="" />
            </div>

            <h1 className='h1_adopt'>Nos conditions d'adoption</h1>

                <p className='paragraphe_adopt1'>
                    Pour adopter un animal dans notre refuge, vous devez avoir au moins 18 ans 
                    et résider en Belgique. Nous cherchons des familles ou des individus prêts à 
                    offrir un foyer stable et aimant à nos compagnons à quatre pattes. Adopter un 
                    animal est un engagement à long terme, et nous vous encourageons à bien réfléchir 
                    avant de prendre cette décision. Offrez à un chien ou un chat une seconde chance 
                    et faites de leur vie une belle aventure !
                </p>

                <h4 className='h4_moyen_adopt'>Si vous souhaitez adopter un animal ou si vous avez des questions, nous serions ravis de vous aider ! Vous pouvez nous contacter de plusieurs façons :</h4>
                <ul className='ul_moyen_adopt'>
                    <li>Appelez-nous au : <a href="tel:+32492764208">+32492764208</a></li>
                    <li>Envoyez-nous un message à : <a href="mailto:adrienalvarez15@gmail.com">adrienalvarez15@gmail.com</a></li>
                    <li>Remplissez notre <a href="/Formulaire d'adoption">formulaire d’adoption</a></li>
                </ul>

                <div className='img_adopt1'>
                    <img src="/img/images_chien_chat_imgadopt1.jpg" alt="" />
                </div>

                <div className='div_respecter'>
                    <h5>Ce que vous devez respecter lorsque vous adoptez l'un de nos animaux</h5>

                    <ul className='ul_respecter'>
                        <li>Faire vacciner l'animal chaque année chez un vétérinaire.</li>
                        <li>Ne pas céder, donner ou vendre l'animal.</li>
                        <li>Accepter la visite de notre équipe afin de vérifier les conditions de vie de l'animal adopté dans son nouveau foyer.</li>
                        <li>L'animal doit vivre à la même adresse que son maître.</li>
                    </ul>
                </div>

                <hr className='hr_adopt'/>

                <div className="div_frais">
                    <h5>Contribution aux frais d’adoption</h5>
                        <ul className='ul_frais'>
                            <li>Chatons et chats adultes - 180 €</li>
                            <li>Sauvetage Chat - DON LIBRE</li>
                            <li>Chiot (- 6 mois) - 280 €</li>
                            <li>Chien - 190 €</li>
                            <li>Sauvetage Chien - DON LIBRE</li>
                        </ul>
                </div>

                <div className='img_adopt2'>
                    <img src="/img/images_chien_frais.jpg" alt="" />
                </div>


        </div>
    )
}

export default Conditions_adoption
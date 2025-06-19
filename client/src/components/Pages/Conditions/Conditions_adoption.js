import React from 'react'
import './Conditions_adoption.css'

const Conditions_adoption = () => {
    return (
        <div className='page_container_conditions'>
            <div className='hero_section'>
                <img src="/img/pexels_chien_adopt.jpg" alt="Chien et chat adoptés ensemble" className='hero_image' />
                <h1 className='hero_title'>Nos conditions d'adoption</h1>
                <p className='hero_text'>
                    Pour adopter un animal dans notre refuge, vous devez avoir au moins 18 ans
                    et résider en Belgique. Nous cherchons des familles ou des individus prêts à
                    offrir un foyer stable et aimant à nos compagnons à quatre pattes. Adopter un
                    animal est un engagement à long terme, et nous vous encourageons à bien réfléchir
                    avant de prendre cette décision. Offrez à un chien ou un chat une seconde chance
                    et faites de leur vie une belle aventure !
                </p>
            </div>

            <section className='contact_section'>
                <h2 className='section_title'>Des questions ? Contactez-nous !</h2>
                <ul className='contact_list'>
                    <li>Appelez-nous au : <a href="tel:+32492764208" className='contact_link'>+32492764208</a></li>
                    <li>Envoyez-nous un message à : <a href="mailto:adrienalvarez15@gmail.com" className='contact_link'>adrienalvarez15@gmail.com</a></li>
                    <li>Remplissez notre <a href="/Formulaire d'adoption" className='contact_link'>formulaire d’adoption</a></li>
                </ul>
            </section>

            <section className='requirements_section'>
                <div className='image_and_text_block reverse'>
                    <div className='image_container'>
                        <img src="/img/images_chien_chat_imgadopt1.jpg" alt="Chien et chat ensemble" className='block_image' />
                    </div>
                    <div className='text_container'>
                        <h3 className='block_title'>Ce que vous devez respecter lorsque vous adoptez l'un de nos animaux</h3>
                        <ul className='checklist'>
                            <li>Faire vacciner l'animal chaque année chez un vétérinaire.</li>
                            <li>Ne pas céder, donner ou vendre l'animal.</li>
                            <li>Accepter la visite de notre équipe afin de vérifier les conditions de vie de l'animal adopté dans son nouveau foyer.</li>
                            <li>L'animal doit vivre à la même adresse que son maître.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className='fees_section'>
                <div className='image_and_text_block'>
                    <div className='image_container'>
                        <img src="/img/images_chien_frais.jpg" alt="Chien avec de l'argent" className='block_image' />
                    </div>
                    <div className='text_container'>
                        <h3 className='block_title'>Contribution aux frais d’adoption</h3>
                        <ul className='fees_list'>
                            <li>Chatons et chats adultes - 180 €</li>
                            <li>Sauvetage Chat - DON LIBRE</li>
                            <li>Chiot (- 6 mois) - 280 €</li>
                            <li>Chien - 190 €</li>
                            <li>Sauvetage Chien - DON LIBRE</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className='included_section'>
                <h3 className='section_subtitle'>Le coût de participation de l'adoption comprend :</h3>
                <ul className='included_list'>
                    <li>Passeport de l'animal</li>
                    <li>La puce électronique et l'enregistrement de l'animal</li>
                    <li>10% de réduction dans des animaleries</li>
                    <li>Une contribution à la survie du refuge</li>
                    <li>Un nouveau membre de votre famille</li>
                </ul>
            </section>

            <h2 className='main_heading'>Vous souhaitez adopter un animal ?</h2>

            <div className='adoption_cards_container'>
                <div className='adoption_card'>
                    <div className='card_image_container'>
                        <img src="/img/istock_chien_adopte.jpg" alt="Chien adopté" className='card_image' />
                    </div>
                    <h3 className='card_title'>À la recherche d'un chien ?</h3>
                    <p className='card_text'>
                        Notre refuge accueille de nombreux chiens en attente d'une famille aimante. Découvrez tous
                        nos protégés sur notre page "Galeriechien". Certains d'entre eux séjournent chez nous depuis
                        plusieurs années et méritent une nouvelle chance.
                    </p>
                    <h3 className='card_title'>Vous souhaitez adopter un chien ?</h3>
                    <p className='card_text'>
                        **Remplir notre formulaire d'adoption :** Afin de trouver le compagnon idéal pour vous, nous vous invitons à remplir notre formulaire en ligne. Celui-ci nous permettra de mieux connaître votre situation (type de logement, présence d'enfants, etc.) et de vous proposer les chiens les plus adaptés.
                    </p>
                    <p className='card_text'>
                        **Prendre rendez-vous :** Une fois votre demande reçue, nous vous contacterons pour organiser une visite de notre refuge.
                    </p>
                    <p className='card_text'>
                        **Faire connaissance :** Lors de votre visite, vous pourrez rencontrer les chiens et profiter de nos parcs à jeux spécialement aménagés pour vous aider à faire votre choix.
                    </p>
                    <p className='card_text'>
                        **Plusieurs visites possibles :** Afin de s'assurer que l'adoption se déroule dans les meilleures conditions, plusieurs visites peuvent être nécessaires.
                    </p>
                    <h3 className='card_title'>Informations importantes :</h3>
                    <p className='card_text'>
                        **Chiens trouvés :** Les chiens trouvés sont mis en adoption après un délai légal de 15 jours afin de permettre à leurs propriétaires de les retrouver.
                    </p>
                    <p className='card_text'>
                        **Chiens saisis :** Les chiens saisis en raison de maltraitance ne sont pas immédiatement disponibles à l'adoption. Leur situation est évaluée au cas par cas par les autorités compétentes.
                    </p>
                    <p className='card_text'>
                        **Chiens donnés :** Les chiens confiés à notre refuge peuvent généralement être adoptés rapidement après un examen vétérinaire.
                    </p>
                    <p className='card_text'>
                        **Tous nos chiens sont :** vaccinés, traités contre la rage, stérilisés et identifiés par puce.
                    </p>
                    <button className='call_to_action_button'><a href="/Galeriechien" className='button_link'>Nos chiens</a></button>
                </div>

                <div className='adoption_card'>
                    <div className='card_image_container'>
                        <img src="/img/istock_chat_adopte.jpg" alt="Chat adopté" className='card_image' />
                    </div>
                    <h3 className='card_title'>À la recherche d'un chat ?</h3>
                    <p className='card_text'>
                        Notre refuge accueille de nombreux chats en attente d'une famille aimante. Découvrez tous
                        nos protégés sur notre page "Galeriechat". Certains d'entre eux séjournent chez nous depuis
                        plusieurs années et méritent une nouvelle chance.
                    </p>
                    <h3 className='card_title'>Vous souhaitez adopter un chat ?</h3>
                    <p className='card_text'>
                        **Remplir notre formulaire d'adoption :** Afin de trouver le compagnon idéal pour vous, nous vous invitons à remplir notre formulaire en ligne. Celui-ci nous permettra de mieux connaître votre situation (type de logement, présence d'enfants, etc.) et de vous proposer les chats les plus adaptés.
                    </p>
                    <p className='card_text'>
                        **Prendre rendez-vous :** Une fois votre demande reçue, nous vous contacterons pour organiser une visite de notre refuge.
                    </p>
                    <p className='card_text'>
                        **Faire connaissance :** Lors de votre visite, vous pourrez rencontrer les chats et profiter de nos parcs à jeux spécialement aménagés pour vous aider à faire votre choix.
                    </p>
                    <p className='card_text'>
                        **Plusieurs visites possibles :** Afin de s'assurer que l'adoption se déroule dans les meilleures conditions, plusieurs visites peuvent être nécessaires.
                    </p>
                    <h3 className='card_title'>Informations importantes :</h3>
                    <p className='card_text'>
                        **Chats trouvés :** Les chats trouvés sont mis en adoption après un délai légal de 15 jours afin de permettre à leurs propriétaires de les retrouver.
                    </p>
                    <p className='card_text'>
                        **Chats donnés :** Les chats confiés à notre refuge peuvent généralement être adoptés rapidement après un examen vétérinaire.
                    </p>
                    <p className='card_text'>
                        **Tous nos chats sont :** vaccinés, traités contre la rage, stérilisés et identifiés par puce.
                    </p>
                    <button className='call_to_action_button'><a href="/Galeriechat" className='button_link'>Nos chats</a></button>
                </div>
            </div>
        </div>
    )
}

export default Conditions_adoption;
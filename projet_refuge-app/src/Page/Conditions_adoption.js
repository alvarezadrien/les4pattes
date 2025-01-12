import React from 'react'
import '../Conditions_adoption.css'

const Conditions_adoption = () => {
    return (
        <div className='page_container_conditions'>
            <div className='img_conditions'>
                <img src="/img/pexels_chien_adopt.jpg" alt="" />
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

            <div className='frais_comprend'>
                <h3 className='h3_comprend'>Le coûts de participation de l'adoption comprend</h3>
                <ul>
                    <li>Passeport de l'animal</li>
                    <li>La puce électronique et l'enregistrement de l'animal</li>
                    <li>10% de réduction dans des animaleries</li>
                    <li>Une contribution à la survie du refuge</li>
                    <li>Un nouveau membre de votre famille</li>
                </ul>
            </div>

            <h2 className='souhait_adopter'>Vous souhaitez adopter un animal</h2>

            <div className='div_container_chien_chat_souhait'>
                <div className='container_souhait1'>
                    <div className='img_souhait1'>
                        <img src="/img/istock_chien_adopte.jpg" alt="" />
                    </div>

                    <h4 className='h4_souhait'>À la recherche d'un chien ?</h4>

                    <p className='para_souhait1'>
                        Notre refuge accueille de nombreux chiens en
                        attente d'une famille aimante. Découvrez tous
                        nos protégés sur notre page "Galeriechien".
                        Certains d'entre eux séjournent chez nous depuis
                        plusieurs années et méritent une nouvelle chance.
                    </p>

                    <h4 className='h4_souhait'>Vous souhaitez adopter un chien ?</h4>

                    <p className='para_souhait1'>
                        Remplir notre formulaire d'adoption : Afin de trouver le compagnon idéal pour vous, nous vous invitons à remplir notre formulaire en ligne. Celui-ci nous permettra de mieux connaître votre situation (type de logement, présence d'enfants, etc.) et de vous proposer les chiens les plus adaptés.
                    </p>

                    <p className='para_souhait1'>
                        Prendre rendez-vous : Une fois votre demande reçue, nous vous contacterons pour organiser une visite de notre refuge.
                    </p>

                    <p className='para_souhait1'>
                        Faire connaissance : Lors de votre visite, vous pourrez rencontrer les chiens et profiter de nos parcs à jeux spécialement aménagés pour vous aider à faire votre choix.
                    </p>

                    <p className='para_souhait1'>
                        Plusieurs visites possibles : Afin de s'assurer que l'adoption se déroule dans les meilleures conditions, plusieurs visites peuvent être nécessaires.
                    </p>

                    <h4 className='h4_souhait'>Informations importantes :</h4>

                    <p className='para_souhait1'>
                        Chiens trouvés : Les chiens trouvés sont mis en adoption après un délai légal de 15 jours afin de permettre à leurs propriétaires de les retrouver.
                    </p>

                    <p className='para_souhait1'>
                        Chiens saisis : Les chiens saisis en raison de maltraitance ne sont pas immédiatement disponibles à l'adoption. Leur situation est évaluée au cas par cas par les autorités compétentes.
                    </p>

                    <p className='para_souhait1'>
                        Chiens donnés : Les chiens confiés à notre refuge peuvent généralement être adoptés rapidement après un examen vétérinaire.
                    </p>

                    <p className='para_souhait1'>
                        Tous nos chiens sont : vaccinés, traités contre la rage, stérilisés et identifiés par puce.
                    </p>

                    <button className='button_souhait'><a href="/Galeriechien">Nos chiens</a></button>
                </div>

                <div className='container_souhait2'>
                    <div className='img_souhait2'>
                        <img src="/img/istock_chat_adopte.jpg" alt="" />
                    </div>

                    <h4 className='h4_souhait'>À la recherche d'un chat ?</h4>

                    <p className='para_souhait1'>
                        Notre refuge accueille de nombreux chiens en
                        attente d'une famille aimante. Découvrez tous
                        nos protégés sur notre page "Galeriechat".
                        Certains d'entre eux séjournent chez nous depuis
                        plusieurs années et méritent une nouvelle chance.
                    </p>

                    <h4 className='h4_souhait'>Vous souhaitez adopter un chat ?</h4>

                    <p className='para_souhait1'>
                        Remplir notre formulaire d'adoption : Afin de trouver le compagnon idéal pour vous, nous vous invitons à remplir notre formulaire en ligne. Celui-ci nous permettra de mieux connaître votre situation (type de logement, présence d'enfants, etc.) et de vous proposer les chiens les plus adaptés.
                    </p>

                    <p className='para_souhait1'>
                        Prendre rendez-vous : Une fois votre demande reçue, nous vous contacterons pour organiser une visite de notre refuge.
                    </p>

                    <p className='para_souhait1'>
                        Faire connaissance : Lors de votre visite, vous pourrez rencontrer les chiens et profiter de nos parcs à jeux spécialement aménagés pour vous aider à faire votre choix.
                    </p>

                    <p className='para_souhait1'>
                        Plusieurs visites possibles : Afin de s'assurer que l'adoption se déroule dans les meilleures conditions, plusieurs visites peuvent être nécessaires.
                    </p>

                    <h4 className='h4_souhait'>Informations importantes :</h4>

                    <p className='para_souhait1'>
                        Chiens trouvés : Les chiens trouvés sont mis en adoption après un délai légal de 15 jours afin de permettre à leurs propriétaires de les retrouver.
                    </p>

                    <p className='para_souhait1'>
                        Chiens saisis : Les chiens saisis en raison de maltraitance ne sont pas immédiatement disponibles à l'adoption. Leur situation est évaluée au cas par cas par les autorités compétentes.
                    </p>

                    <p className='para_souhait1'>
                        Chiens donnés : Les chiens confiés à notre refuge peuvent généralement être adoptés rapidement après un examen vétérinaire.
                    </p>

                    <p className='para_souhait1'>
                        Tous nos chiens sont : vaccinés, traités contre la rage, stérilisés et identifiés par puce.
                    </p>

                    <button className='button_souhait'><a href="/Galeriechat">Nos chats</a></button>
                </div>

            </div>

        </div>
    )
}

export default Conditions_adoption
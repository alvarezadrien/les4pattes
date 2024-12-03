import React from 'react'
import '../Savoir.css'

const Savoir = () => {
    return (
        <div className='page_container_savoir'>
            <h1 className='h1_titre_savoir'>Se qu'il fautu savoir avant d'adopter</h1>

            <div className='bull_para1'>
                <p className='para_savoir1'>
                    Adopter un animal est une belle démarche,
                    mais elle demande réflexion et préparation.
                    Voici tout ce que vous devez savoir pour vous
                    assurer que votre adoption se passe dans les
                    meilleures conditions
                </p>
            </div>

            <div className="div_img1">
                <img src="/img/img_chat_chien_respon.jpeg" alt="" />
            </div>

            <div className='container_para1'>
                <h2 className='h2_titre_savoir1'>Votre lieu de vie</h2>

                <p className='para_savoir2'>
                    Si vous êtes dans un appartement, assurez-vous que l'espace est adapté aux besoins du futur anima. Par exemple, les chats s'adaptent plus simplement à une vie en appartement tandis que les chiens, en fonction de leur taille et de l'énergie qu'ils dépensent, ils peuvent nécessiter un plus grand espace et des sorties fréquentes.
                </p>
            </div>f

            <div className='div_img2'>
                <img src="/img/img_chien_chat_savoir.png" alt="" />
            </div>

            <hr />

            <div className='div_img3'>
                <img src="/img/images_véto_page_savoir.jpeg" alt="" />
            </div>

            <div className='container_para2'>
                <h2 className='h2_titre_savoir2'>Santé et bien être de l'animal</h2>

                <p className='para_savoir3'>
                    Tous les animaux qui sont à adopter sont sur notre page web sur <a href='/Galeriechien'>"Galeriechien"</a> et <a href='/Galeriechat'>"Galeriechat"</a>. Nos animaux sont tous stérilisé, pucés et vaccinés.
                </p>
            </div>

            <div className='containre_savoir'>
                <div className='container01'>
                    <h3 className='h3_01'>Un engagement à long terme</h3>
                </div>

                <div className='container02'>
                    <p className='para01_savoir'>
                        Adopter un animal c'est un grand engagement pour plusieurs années.
                        Le futur adopter sera un membres de vôtre famille, avec ses besoins
                        en affection régulière, des soins quand il le faut.
                    </p>
                </div>
            </div>

            <div className='img_chien_long'>
                <img src="/img/img_panier_chien.jpeg" alt="" />
            </div>

            <div className='container_savoir01'>
                <div className='container03'>
                    <h3 className='h3_02'>Les frais à prévoir</h3>
                </div>

                <div className='container04'>
                    <ul className='ul_savoir01'>
                        <li>Nourriture adapté</li>
                        <li>Accesoires(panier, litière, jouets, laisse, ...)</li>
                        <li>Frais de soins véterinaire</li>
                    </ul>
                </div>
            </div>

            <hr />

            <div className='container_savoir02'>
                <div className='container05'>
                    <h3 className='h3_03'>Période d'adaptation</h3>
                </div>

                <div className='container06'>
                    <p className='para02_savoir'>
                        Lorsque vous adopter un animal,
                        il est tout à fait normal que l'animal
                        sera un peu effrayer de ce nouvel environnement,
                        pour aider cette étape d'adaptation offrez lui un
                        environnement calme et sûr. Donnez lui du temps pour s'habituer
                        à se nouvel environnement et à vous.
                    </p>
                </div>
            </div>

            <div className='container07'>
                <p className='para03_savoir'>
                    Prenez le temps de bien réfléchir,
                    et si vous êtes prêt à adopter votre futur
                    ami à quatre pattes offrez lui une nouvelle
                    maison. Contactez nous des maintenant pour en savoir plus !
                </p>
            </div>

        </div>
    )
}

export default Savoir
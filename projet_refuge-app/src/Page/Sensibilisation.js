import React from 'react'
import '../Sensibilisation.css'

const Sensibilisation = () => {
    return (
        <div className='page_sensibilisation'>
            <div className='container_sensibilisation'>
                <h1 className='h1_sensibilisation'>Sensibilisation</h1>
                <img src="/img/pexels_chien_heureux_sensi.jpg" alt="" width={650} height={350} />
            </div>
            <h2 className='h2_sensibilisation1'>Pourquoi la sensibilisation est-elle importante pour un refuge ?</h2>

            <div className='container_para_sensibilisation1'>
                <p className='para_sensibilisation1'>
                    Les refuges sont des lieux d’accueil
                    et de protection pour des animaux souvent
                    maltraités ou abandonnés. Cependant, leur
                    mission ne se limite pas à accueillir et soigner
                    ces animaux. La sensibilisation est un outil
                    essentiel pour prévenir les abandons et améliorer
                    le bien-être des animaux à long terme. En élevant
                    la conscience du public sur la situation des animaux
                    en refuge, nous pouvons contribuer à un avenir où chaque
                    animal est respecté et pris en charge de manière responsable.
                    La sensibilisation permet également d’encourager l’adoption, de
                    promouvoir la stérilisation et de créer une culture de respect envers
                    nos compagnons à quatre pattes.
                </p>
            </div>

            <h3 className='h3_para_sensibilisation1'>Les enjeux de la protection animale</h3>

            <div className='container_para_sensibilisation2'>
                <div className='div_para_sensibilisation1'>
                    <p className='para_sensibilisation2'>
                        Chaque année, des millions d’animaux sont
                        abandonnés dans le monde entier. Ces animaux
                        se retrouvent dans des situations de grande
                        détresse, souvent sans abri et sans soins
                        appropriés. L'abandon d'animaux est une réalité
                        tragique qui peut être évitée si nous prenons
                        conscience des responsabilités liées à l’adoption d’un animal.
                    </p>
                </div>
                <div className='div_img_sensibilisation1'>
                    <img src="/img/chien chat .jpeg" alt="" width={350} height={350} />
                </div>

            </div>

            <div className='container_para_sensibilisation3'>
                <div className='div_img_sensibilisation2'>
                    <img src="/img/chat_galeriefiche.jpg" alt="" width={280} height={350} />
                </div>
                <div className='div_para_sensibilisation2'>
                    <h3 className='h3_para_sensibilisation2'>Les raisons de ces abandons sont diverses</h3>
                    <p className='para_sensibilisation3'>
                        déménagement, perte d'intérêt pour l'animal,
                        manque de moyens pour assurer ses soins ou
                        simplement une décision irréfléchie. Malheureusement,
                        ces animaux se retrouvent souvent dans des refuges déjà
                        saturés. Cela engendre un surpeuplement, limitant ainsi
                        la capacité d’accueil et d’accompagnement des refuges.
                    </p>
                </div>
            </div>

            <p className='para_sensibilisation4'>
                Le manque de stérilisation des
                animaux domestiques est également
                un problème majeur. Chaque année,
                des milliers d’animaux naissent sans
                que personne ne soit prêt à les accueillir,
                contribuant ainsi à l’augmentation du nombre
                d'animaux sans foyer.Le manque de stérilisation
                des animaux domestiques est également un problème
                majeur. Chaque année, des milliers d’animaux naissent
                sans que personne ne soit prêt à les accueillir,
                contribuant ainsi à l’augmentation du nombre d'animaux sans foyer.
            </p>

            <hr />

            <h3 className='h3_para_sensibilisation3'>Que pouvons-nous faire pour changer la situation ?</h3>

            <p className='para_sensibilisation5'>
                Adopter plutôt qu'acheter
                L'adoption est une solution
                essentielle pour donner une
                nouvelle vie à un animal. En
                choisissant d’adopter dans un refuge,
                vous offrez une chance à un animal
                abandonné de vivre dans un foyer aimant.
                Chaque adoption compte et aide à alléger la
                charge des refuges tout en réduisant les souffrances animales.
            </p>

            <div className='container_para_sensibilisation4'>
                <div className='div_img_sensibilisation3'>
                    <img src="/img/pexels-kevin-early-492318467-29011426.jpg" alt="" width={280} height={350} />
                </div>
                <div className='div_para_sensibilisation3'>
                    <p className='para_sensibilisation6'>
                        Ensemble, nous pouvons faire la différence !
                        La sensibilisation à la cause animale est un
                        travail continu, et chaque action compte.
                        Que vous choisissiez d’adopter, de faire
                        un don ou de vous impliquer en tant que
                        bénévole, vous avez le pouvoir de changer
                        la vie d’un animal en refuge. Ensemble,
                        faisons en sorte que chaque animal reçoive
                        l’amour et l’attention qu’il mérite, et
                        construisons un avenir où les abandons
                        seront de moins en moins fréquents.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Sensibilisation

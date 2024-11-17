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
        </div>
    )
}

export default Equipe
import React from "react";
import '../Apropos.css'
import Navbar from '../components/Navbar/Navbar'

const Apropos = () => {
    return (
        <div>
            <div className="container_img_propos">
                <div className="img0">
                    <img src="/img/img_etablissement.jpg" alt="" />
                </div>
                
                {/* Côté gauche */}

                <div className="img_1">
                    <img src="/img/téléchargement (1).jpeg" alt="" />
                </div>
                <div className="img_2">
                    <img src="/img/téléchargement (2).jpeg" alt="" />
                </div>

                    {/* Côté droit */}

                <div className="img_3">
                    <img src="/img/téléchargement(3).jpeg" alt="" />
                </div>
                <div className="img_4">
                    <img src="/img/téléchargement (4).jpeg" alt="" />
                </div>
            </div>

            {/* Div pattes propos */}
            <div className="pattes_propos">
                <h2>Les 4 pattes</h2>

                <img src="/img/img_aide_soins.jpg" alt="" width={400} height={360}/>
            </div>
        </div>
    );
};

export default Apropos
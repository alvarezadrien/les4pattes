import React, { useState } from 'react';
import './Adhesions.css';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
    'pk_test_51RpREJ3NQxhj3yh6nevK0w2MZI077QIXnIeStlhW1yeU8Ns6sov58DU8eiK3NdFFOuze1N4utonjfGsJRi5eKUzc00IslsIW8S'
);

const Adhesions = () => {
    const [customAmount, setCustomAmount] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handlePayment = async (amount) => {
        const stripe = await stripePromise;

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/donation/create-checkout-session`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount }),
                }
            );

            const data = await response.json();

            if (data.url) {
                setShowSuccessPopup(true);
                setTimeout(() => {
                    window.location.href = data.url;
                }, 2000);
            } else {
                console.error('❌ Erreur : pas de URL dans la réponse Stripe');
            }
        } catch (error) {
            console.error('❌ Erreur lors de la création de la session :', error);
        }
    };

    return (
        <div className="page_adhesions">
            <div className="container_img_adhesions">
                <div className="div_img_adhesions1">
                    <img
                        src="/img/photo_cat_accueil2.jpg"
                        alt="Chat principal"
                        width={1000}
                        height={400}
                    />
                </div>
                <div className="div_img_adhesions2">
                    <img
                        src="/img/photo_cat_accueil1.jpg"
                        alt="Petit chat"
                        width={340}
                        height={340}
                    />
                </div>
                <div className="div_para_adhesions1">
                    <h1 className="h1_adhesions">Adhésions</h1>
                    <p className="para_adhesions1">
                        Tout ce que nous accomplissons, nous le devons à votre générosité.
                        Pour renforcer notre impact, envisagez de devenir membre !
                    </p>
                </div>
            </div>

            <h2 className="h2_adhesions">Explorez nos différentes options de soutien</h2>

            <div className="ul_container_adhesions">
                <ul className="ul_adhesions">
                    <li>
                        La cotisation en tant que membre adhérent : <strong>15€</strong>
                    </li>
                    <li>
                        La cotisation en tant que membre sympathisant : <strong>25€</strong>
                    </li>
                    <li>
                        La cotisation en tant que membre protecteur : <strong>60€</strong>
                    </li>
                    <li>
                        La cotisation en tant que membre à vie : <strong>250€</strong> (à ne
                        payer qu'une seule fois)
                    </li>
                </ul>
            </div>

            <div className="container_paiement">
                <img
                    src="/img/contact-cat.png"
                    alt="Icône de chat"
                    className="cat_image_paiement"
                />
                <div className="payment_details_wrapper">
                    <h5 className="h5_adhesions">Soutenez-nous en ligne</h5>

                    <div className="stripe_donation_container">
                        <div className="preset_buttons">
                            {[15, 25, 60, 250].map((amount) => (
                                <button key={amount} onClick={() => handlePayment(amount)}>
                                    Adhérer pour {amount}€
                                </button>
                            ))}
                        </div>

                        <div className="custom_donation">
                            <input
                                type="number"
                                min="1"
                                value={customAmount}
                                placeholder="Montant libre (€)"
                                onChange={(e) => setCustomAmount(e.target.value)}
                            />
                            <button
                                disabled={!customAmount || customAmount < 1}
                                onClick={() => handlePayment(Number(customAmount))}
                            >
                                Faire un don
                            </button>
                        </div>
                    </div>

                    <ul className="ul_bank">
                        <li>Vous pouvez payer anonymement</li>
                        <li>Ou avec votre numéro d'adhérent en communication</li>
                    </ul>
                </div>
            </div>

            <hr />

            <div className="div_para_adhesions">
                <div className="div_para_adhesions2">
                    <p className="para_adhesions2">
                        En devenant membre de notre association, vous entrez dans une
                        communauté engagée pour la cause animale. En plus de soutenir nos
                        actions, vous recevrez une carte de membre !
                    </p>
                </div>
                <div className="div_para_adhesions3">
                    <p className="para_adhesions3">
                        Vous aurez également accès à notre magazine, une source
                        d'informations précieuse sur nos actions et nos avancées.
                    </p>
                </div>
            </div>

            {showSuccessPopup && (
                <div className="success-popup">
                    <div className="success-content">
                        <img src="/img/green-paw.png" alt="Succès" />
                        <h2>Merci pour votre soutien ❤️</h2>
                        <p>Redirection en cours vers le paiement sécurisé...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Adhesions;

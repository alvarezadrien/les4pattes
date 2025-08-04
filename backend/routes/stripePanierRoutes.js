// backend/routes/stripePanierRoutes.js
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY est manquante dans les variables d’environnement.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

router.post('/panier/create-checkout-session', async (req, res) => {
    const { items, adresse, email } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Aucun article reçu.' });
    }

    try {
        const line_items = items.map((item) => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.nom,
                    images: [`${process.env.FRONTEND_URL}/${item.image}`],
                },
                unit_amount: Math.round(
                    parseFloat(item.prix.replace(',', '.').replace('€', '')) * 100
                ),
            },
            quantity: item.quantite,
        }));

        const metadata = adresse
            ? {
                rue: adresse.rue || '',
                ville: adresse.ville || '',
                codePostal: adresse.codePostal || '',
                pays: adresse.pays || '',
            }
            : {};

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/paiementsucces`,
            cancel_url: `${process.env.FRONTEND_URL}/panier`,
            customer_email: email,
            metadata,
        });

        res.status(200).json({ url: session.url });
    } catch (err) {
        console.error('❌ Erreur Stripe Panier :', err);
        res.status(500).json({ error: 'Erreur lors de la création de la session Stripe pour le panier.' });
    }
});

module.exports = router;

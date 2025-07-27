// routes/donationRoutes.js
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

// ✅ Vérifie que la clé Stripe est bien définie
if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY est manquante dans les variables d’environnement.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
    const { amount } = req.body;

    console.log('✅ Montant reçu côté serveur :', amount);

    if (!amount || isNaN(amount) || amount < 1) {
        console.error('❌ Montant invalide reçu :', amount);
        return res.status(400).json({ error: 'Montant invalide' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Adhésion - Les 4 Pattes',
                        },
                        unit_amount: Math.round(amount * 100), // Stripe attend des centimes
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/adhesions`,
        });

        console.log('✅ Session Stripe créée avec succès :', session.id);
        res.json({ url: session.url });
    } catch (err) {
        console.error('❌ Erreur lors de la création de la session Stripe :', err.message || err);
        res.status(500).json({ error: 'Erreur lors de la création de la session' });
    }
});

module.exports = router;

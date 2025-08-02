router.post("/", async (req, res) => {
    const { date, heure } = req.body;

    if (!date || !heure) {
        return res.status(400).json({ error: "Date et heure requises" });
    }

    try {
        const nouveauCreneau = new Creneau({ date, heure });
        await nouveauCreneau.save();
        res.status(201).json(nouveauCreneau);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

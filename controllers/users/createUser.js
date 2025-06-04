const User = require("../../models/User");
const validator = require("validator");

module.exports = async (req, res) => {
    const { brukernavn, email } = req.body;

    if (!brukernavn || brukernavn == "" || brukernavn.length < 1) {
        console.error(`Brukernavn er påkrevd. Fikk: ${brukernavn}`);
        return res.status(400).json({ error: "Brukernavn er påkrevd." });
    }

    if (!email || email == "" || email.length < 5) {
        console.error(`E-postadresse er påkrevd. Fikk: ${email}`);
        return res.status(400).json({ error: "E-postadresse er påkrevd." });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Ugyldig e-postadresse." });
    }

    try {
        const isUser = await User.findOne({
            $or: [{ brukernavn: brukernavn }, { email: email }],
        });
        if (isUser) {
            console.error(`Bruker allerede eksisterer: ${brukernavn}`);
            return res
                .status(400)
                .json({ error: "Bruker eksisterer allerede." });
        }
    } catch (error) {
        console.error("Feil ved sjekk av eksisterende bruker:", error);
        return res
            .status(500)
            .json({
                error: "Intern serverfeil. Kunne ikke sjekke om bruker allerede eksisterer.",
            });
    }

    try {
        const newUser = new User({
            brukernavn: brukernavn,
            email: email,
        });

        await newUser.save();
        console.log(`Bruker opprettet: ${newUser}`);
        return res
            .status(201)
            .json({ message: "Bruker opprettet", user: newUser });
    } catch (error) {
        console.error("Feil ved oppretting av bruker:", error);
        return res
            .status(500)
            .json({ error: "Intern serverfeil. Kunne ikke opprette bruker." });
    }
};

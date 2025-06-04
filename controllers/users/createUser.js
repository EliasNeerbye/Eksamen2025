const User = require("../../models/User");
const validator = require("validator");

module.exports = async (req, res) => {
    const { brukernavn, email } = req.body;
    if (!brukernavn || brukernavn == "" || brukernavn.length < 1) {
        console.error(`Brukernavn er påkrevd. Fikk: ${brukernavn}`);
        return res.status(400).json({
            success: false,
            message: "Brukernavn er påkrevd.",
            data: null,
        });
    }
    if (!email || email == "" || email.length < 5) {
        console.error(`E-postadresse er påkrevd. Fikk: ${email}`);
        return res.status(400).json({
            success: false,
            message: "E-postadresse er påkrevd.",
            data: null,
        });
    }
    if (!validator.isEmail(email)) {
        console.error(`Ugyldig e-postadresse: ${email}`);
        return res.status(400).json({
            success: false,
            message: "Ugyldig e-postadresse.",
            data: null,
        });
    }

    try {
        const isUser = await User.findOne({
            $or: [{ brukernavn: brukernavn }, { email: email }],
        });
        if (isUser) {
            console.error(`Bruker allerede eksisterer: ${brukernavn}`);
            return res.status(400).json({
                success: false,
                message: "Bruker eksisterer allerede.",
                data: null,
            });
        }
    } catch (error) {
        console.error("Feil ved sjekk av eksisterende bruker:", error);
        return res.status(500).json({
            success: false,
            message:
                "Intern serverfeil. Kunne ikke sjekke om bruker allerede eksisterer.",
            data: null,
        });
    }

    try {
        const newUser = new User({
            brukernavn: brukernavn,
            email: email,
        });
        await newUser.save();
        console.log(`Bruker opprettet: ${newUser}`);
        return res.status(201).json({
            success: true,
            message: "Bruker opprettet",
            data: { user: newUser },
        });
    } catch (error) {
        console.error("Feil ved oppretting av bruker:", error);
        return res.status(500).json({
            success: false,
            message: "Intern serverfeil. Kunne ikke opprette bruker.",
            data: null,
        });
    }
};

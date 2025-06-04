const User = require("../../models/User");

module.exports = async (req, res) => {
    const { username } = req.params;
    if (!username || username.length < 1) {
        console.error(`Brukernavn er påkrevd. Fikk: ${username}`);
        return res.status(400).json({
            success: false,
            message: "Brukernavn er påkrevd.",
            data: null,
        });
    }

    try {
        const user = await User.findOne({ brukernavn: username });
        if (!user) {
            console.error(`Bruker ikke funnet: ${username}`);
            return res.status(404).json({
                success: false,
                message: "Bruker ikke funnet.",
                data: null,
            });
        }
        console.log(`Bruker funnet: ${user}`);
        return res.status(200).json({
            success: true,
            message: "Bruker funnet",
            data: { user: user },
        });
    } catch (error) {
        console.error("Feil ved henting av bruker:", error);
        return res.status(500).json({
            success: false,
            message: "Intern serverfeil. Kunne ikke hente bruker.",
            data: null,
        });
    }
};

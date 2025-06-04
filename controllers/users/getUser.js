const User = require("../../models/User");

module.exports = async (req, res) => {
    const { username } = req.params;
    if (!username || username.length < 1) {
        console.error(`Brukernavn er påkrevd. Fikk: ${username}`);
        return res.status(400).json({ error: "Brukernavn er påkrevd." });
    }

    try {
        const user = await User.findOne({ brukernavn: username });
        if (!user) {
            console.error(`Bruker ikke funnet: ${username}`);
            return res.status(404).json({ error: "Bruker ikke funnet." });
        }
        console.log(`Bruker funnet: ${user}`);
        return res.status(200).json({ user: user });
    } catch (error) {
        console.error("Feil ved henting av bruker:", error);
        return res
            .status(500)
            .json({ error: "Intern serverfeil. Kunne ikke hente bruker." });
    }
};

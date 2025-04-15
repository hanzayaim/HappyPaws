const bcrypt = require("bcrypt");

const userDB = {
    email: "shelter003@example.com",
    passwordHash: "$2b$10$qjnqnC1PBsecFS0RLZn6uO03gnwNvp4JDkdg8PXzL/4TilrNY/kzC"
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (email !== userDB.email) {
        return res.status(401).json({ message: "Email not found." });
    }

    bcrypt.compare(password, userDB.passwordHash, (err, result) => {
        if (err) throw err;

        if (result) {
            req.session.user = { email };
            res.json({ message: "Login successfully.", email });
        } else {
            res.status(401).json({ message: "Wrong password." });
        }
    });
};

exports.profile = (req, res) => {
    if (req.session.user) {
        res.json({ message: `Hello ${req.session.user.email}, you already login.`});
    } else {
        res.status(401).json({ message: "You are not logged in." });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: "Failed to logout." });
        res.json({ message: "Logout successfully." });
    });
}
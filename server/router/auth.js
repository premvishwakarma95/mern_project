const express = require("express");
const User = require("../model/userSchema"); // here User is a collection of all user
const router = express.Router();
const bcrypt = require("bcrypt");
const authenticate = require("../middleware/authenticate");
const cookieParser = require('cookie-parser');

// this will convert(parse) cookies that are coming from frontend
router.use(cookieParser());

// with the help of promises
// router.post("/register", (req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: "pls fill all the properties" })
//     }

//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ error: "Email already exist" });
//             }
//             const user = new User({ name, email, phone, work, password, cpassword });

//             user.save().then(() => {
//                 res.status(201).json({ message: "you registered successfully" });
//             }).catch((err) => res.status(500).json({ err: "failed to registered" }));

//         }).catch((error) => res.status(500).json({ err: "not registered" }))
// });

// with the help of async-await function
router.post("/register", async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "pls fill all the properties" });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ err: "this user already exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ err: "password not matching" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            // before save in userSchema file pre method of save method will excute
            await user.save();
            return res.status(201).json({ message: "user registered successfully" });
        }


    } catch (error) {
        console.log(error)
    }
})

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ err: "please fill the all properties" });
        }

        const userLogin = await User.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, userLogin.password); // this line will check hash password to normal passward

        const token = await userLogin.generateAuthToken();
        // console.log(token);

        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 258920000),
            httpOnly: true
        });

        if (userLogin) {
            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credientials" });
            } else {
                res.status(201).json({ message: "user signin successfully" });
            }
        } else {
            res.status(400).json({ error: "Invalid Credientialss" });
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/about", authenticate, (req, res) => {
    res.send(req.rootUser);
})

router.get("/getdata", authenticate, (req, res) => {
    res.send(req.rootUser);
})

router.post("/contact", authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.json({ error: "fill the input field" })
        }

        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({ message: "user contact successfully" });
        }

    } catch (error) {
        console.log(error);
    }
})

router.get("/logout", (req, res) => {
    res.clearCookie('jwtoken', { path: "/" });
    res.status(200).send('User logout');
})

module.exports = router;
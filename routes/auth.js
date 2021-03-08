const express = require("express");
const router = express.Router();

const userModel = require("./../models/user");
const bcrypt = require("bcrypt");

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("uy");
    console.log(req.body);
    console.log("yo");
    const newUser = await userModel.find({ email: email });
    if (!newUser) {
        console.log(newUser)
      console.log("user unknown");
      res.redirect("/login");
    } else { 
        const samePassword = bcrypt.compareSync(password, newUser.password);
        if (!samePassword){
            console.log("incorrect password");
            res.redirect("login")
        } else {
            const userObject = newUser.toObject();
            delete userObject.password;
            res.session.currentUser = userObject;
            res.redirect ("/")
        }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/register", (req, res, next) => {
  res.render("auth/register");
});

module.exports = router;

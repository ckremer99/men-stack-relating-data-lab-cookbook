const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const pantryItems = currentUser.pantry
    res.render("foods/index.ejs", {
      user: req.session.user,
      pantry: pantryItems});

  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
});

router.get("/new", (req, res) => {
  res.render('foods/new.ejs', {user: req.session.user})
})

router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    const currentUser = await User.findById(req.session.user._id)
    currentUser.pantry.push(req.body)
    await currentUser.save()
    // console.log(currentUser)
    res.redirect(`/users/${currentUser._id}/foods`)

  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

module.exports = router;

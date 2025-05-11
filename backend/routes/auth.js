const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Saket@nice";

// Route 1 : Create a User using POST "/auth/": No Login Required
router.post(
  "/register",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //if there are errors, return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let success = false;

    try {
      let user = await User.findOne({ email: req.body.email });
      //checking whether this email alreafy exists or not
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry this email already exists" });
      }

      //Generating salt from bcrypt package for more security
      const salt = await bcrypt.genSalt(10);
      //Generating hashing for password
      //This secure hash string will get stored in db
      const secPass = await bcrypt.hash(req.body.password, salt);

      //creating new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      if (authtoken) {
        success = true;
        res.json({ success, authtoken });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server Error");
    }
  }
);

// Route 2 : Create an Admin using POST "/auth/createadmin": No Login Required
// For Admin
router.post(
  "/createadmin",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //if there are errors, return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      //checking whether this email alreafy exists or not
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry this email already exists" });
      }

      //Generating salt from bcrypt package for more security
      const salt = await bcrypt.genSalt(10);
      //Generating hashing for password
      //This secure hash string will get stored in db
      const secPass = await bcrypt.hash(req.body.password, salt);

      //creating new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ authtoken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server Error");
    }
  }
);

// Route 3 : Authenticate a user using POST: No Login required
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter valid password").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    //if there are errors, return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructuring the request body
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      //check whether a user with the email exists or not
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Enter a valid credentials" });
      }

      //Comparing the password with original password
      let compPass = await bcrypt.compare(password, user.password);
      if (!compPass) {
        return res
          .status(400)
          .json({ success, error: "Enter a valid credentials" });
      }
      const data = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin,
        },
      };
      const isAdmin = user.isAdmin;
      // console.log(isAdmin);

      const authtoken = jwt.sign(data, JWT_SECRET);
      if (authtoken) {
        success = true;
        res.json({ success, authtoken, isAdmin });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server Error");
    }
  }
);

// Route 4 : Fetching user details using POST : Login Required
router.post("/user", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server Error");
  }
});

// Route 5 : Get all users detais using : GET /auth/allusers : Login Required
// For admin
router.post("/allusers", fetchuser, async (req, res) => {
  try {
    let checkAdmin = req.user.isAdmin;
    if (checkAdmin) {
      const users = await User.find({});
      res.json(users);
    } else {
      return res.status(400).json({ error: "U r not authorised." });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }
});

// Route 6 : Delete an existing user detais using : DELETE /auth/deleteuser : Login Required
// For admin
router.delete("/deleteuser/:id", fetchuser, async (req, res) => {
  try {
    let checkAdmin = req.user.isAdmin;
    if (checkAdmin) {
      //Find the note to be updated and update it
      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send("Not Found");
      }

      user = await User.findByIdAndDelete(req.params.id);
      res.json({ success: "User deleted", user });
    } else {
      return res.status(400).json({ error: "U r not authorised." });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }
});

module.exports = router;

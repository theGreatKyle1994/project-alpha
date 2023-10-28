const User = require("../models/user.model");

// TODO, CREATE READ, UPDATE, DELETE

module.exports = {
  //* Register user
  registerUser: async (req, res) => {
    // Making sure Username/Email isn't taken
    const potentialUser = await User.findOne({ username: req.body.username}) || await User.findOne({ email: req.body.email });
    // If username/email is free, create user
    if (!potentialUser) {
      await User.create(req.body)
        .then((newUser) => {
          //TODO Uncomment when adding JWTs
          //! Generate token on successful register
          //! const userToken = jwt.sign(
          //!   { _id: newUser._id, username: newUser.username },
          //!   secret,
          //!   { expiresIn: "1h" }
          //! );
          // Return new user and token
          res
            .status(201, "User Created")
            //! .cookie("userToken", userToken, {
            //!   httpOnly: true,
            //!   maxAge: 2000 * 60 * 60,
            //! })
            .json(newUser);
        })
        .catch((err) => res.status(400).json(err));
    } else {
      // If username is taken, respond with error message
      res.status(400).json({
        errors: {
          username: { message: "Username/Email already Exists" },
        },
      });
    }
  },
  //* Login user
  loginUser: async (req, res) => {
    // Find User
    const potentialUser = await User.findOne({ username: req.body.username })
    // If user exists, compare passwords
    if (potentialUser) {
      // Compare passwords
      if (await bcrypt.compare(req.body.password, potentialUser.password)) {
        //TODO Uncomment this when we implement JWTs
        // Create token on password match
        //! const userToken = jwt.sign(
        //!   { _id: potentialUser._id, username: potentialUser.username },
        //!   secret,
        //!   { expiresIn: "1h" }
        //! );
        // Respond with user data and token
        res
          .status(201)
          //! .cookie("userToken", userToken, {
          //!   httpOnly: true,
          //!   maxAge: 2000 * 60 * 60,
          //! })
          .json(potentialUser);
      } else {
        // On incorrect password, respond with error messages
        res.status(400).json({
          errors: {
            password: { message: "Incorrect username/password" },
          },
        });
      }
    } else {
      // On non existant username, respond with error messages
      res.status(400).json({
        errors: {
          username: { message: "Incorrect username/password" },
        },
      });
    }
  },
  // Logout user
  logoutUser: (req, res) => {
    res
      .status(200)
      //TODO Uncomment this when we implement JWTs
      //! .clearCookie("userToken")
      .json({ message: "logout successful" });
  },
};

//* Read

//* Finds all users

module.exports.findAllUsers = (req, res) => {
  User.find()
    .then((allUsers) => res.json(allUsers))
    .catch((err) => {res.status(400).json({message: "Something went wrong finding all users", error: err});
  });
}

//* Finds one user

module.exports.findOneUser = (req, res) => {
  User.findById({_id: req.params._id})
  .then((oneUser) => res.json(oneUser))
    .catch((err) => {res.status(400).json({message: "Something went wrong finding one user", error: err});
  });
}

//* Update
module.exports.updateUser = (req, res) => {
  //* Finds the current users ID and the forms information
  User.findByIdAndUpdate({_id: req.params._id}, req.body, {
    //* Acts like a new user registration, runs the validations along with it
    new: true,
    runValidators: true,
  })
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    res.status(400).json({ message: "Error Updating User", error: err });
  });
};
//* Delete

module.exports.deleteUser = (req, res) => {
  //* Grabs current users ID
  User.deleteOne({ _id: req.params.id })
    .then((deletedUser) => {
      res.json(deletedUser);
    })
    .catch((err) => {
      res.status(400).json({ message: "Error Deleting User", error: err });
    });
};

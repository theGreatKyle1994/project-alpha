const UserController = require("../controllers/user.controller");

module.exports = (app) => {
  // TODO routes
  //*Login/Register/Logout Functions
  app.post("/api/register", UserController.registerUser);
  app.post("/api/login", UserController.loginUser);
  app.post("/api/logout", UserController.logoutUser);
  
  //*  CRUD functions
  //? Finds all users
  app.get("/api/users", UserController.findAllUsers);
  //? Finds one user
  app.get("/api/user", UserController.findOneUser);
  //? Updates current user
  app.patch("/api/updateUser", UserController.updateUser);
  //! Deletes user
  app.delete("/api/deleteUser", UserController.deleteUser)
};

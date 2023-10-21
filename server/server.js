const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser")
const port = 8000;

//* Requirements
require("dotenv").config();
//* Uncomment when JWTs are implimented
// require("./config/jwt.config");
require("./config/mongoose.config");
require("./routes/player.routes")(app);

//* App.uses
app.use(cookieParser());
app.use(express.json(), express.urlencoded({ extended: true }), cors());

//! Routes
const UserRoutes = require("./routes/user.routes");
const PlayerRoutes = require("./routes/player.routes");
const MapRoutes = require("./routes/map.routes");
const MarketRoutes = require("./routes/market.routes");
UserRoutes(app);
PlayerRoutes(app);
MapRoutes(app);
MarketRoutes(app);

app.listen(port, () => console.log(`Server live on port: ${port}`));

const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(express.json(), express.urlencoded({ extended: true }), cors());

require("./config/mongoose.config");
require("./routes/player.routes")(app);

app.listen(port, () => console.log(`Server live on port: ${port}`));

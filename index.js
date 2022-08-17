const express = require("express");
const { create } = require("express-handlebars");
const app = express();
require("dotenv").config();
const MongoDBStore = require('')

const hbs = create({
  extname: "hbs",
  defaultLayout: "layout",
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  },
});

// Register `hbs.engine` with the Express app.
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

//routing

const clientRouter = require("./routes/client/index");

app.use("/", clientRouter);

try {
  require("./helper/db");
} catch (error) {
  throw new Error("Error connecting to mongoDB");
}

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "mySession",
  expires: 1000 * 600,
});

app.use(
  session({
    secret: "SECRETKEY",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

try {
  app.listen(process.env.PORT || 3000, () => {
    console.log(
      "the server is listening on port " + /* process.env.PORT  ||*/ 3000
    );
  });
} catch (error) {
  console.error(error);
}

const express = require("express");
const { create } = require("express-handlebars");
const session = require("express-session");
const app = express();
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require("path");
require("dotenv").config();

const hbs = create({
  extname: "hbs",
  defaultLayout: "layout",
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// Register `hbs.engine` with the Express app.
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

//routing

const clientRouter = require("./routes/client/index");
const error = require("./middleware/404");

app.use("/", clientRouter);
app.use(error);

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

//MONGO_URI="mongodb+srv://Ozodbek16:q0w9e8r7@cluster0.yfxl3.mongodb.net/technostore" 
const express = require("express");
const { create } = require("express-handlebars");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();
const path = require("path");
const flash = require("connect-flash");
require("dotenv").config();

const hbs = create({
  extname: "hbs",
  defaultLayout: "layout",
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  },
});

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

app.use(express.json());
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// Register `hbs.engine` with the Express app.
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

//routing

const clientRouter = require("./routes/client/index");
const adminRouter = require("./routes/admin/index");
const error = require("./middleware/404");
const authMiddleware = require("./middleware/admin");

app.use("/", clientRouter);
app.use(`/`, require("./routes/admin/auth"));
app.use(`/${process.env.admin_url}`, authMiddleware, adminRouter);
app.use(error);

try {
  require("./helper/db");
} catch (error) {
  throw new Error("Error connecting to mongoDB");
}

try {
  app.listen(process.env.PORT || 3000, () => {
    console.log(
      "the server is listening on port " + /* process.env.PORT  ||*/ 3000
    );
  });
} catch (error) {
  console.error(error);
}

//MONGO_URI="mongodb+srv://Ozodbek16:q0w9e8r7@cluster0.yfxl3.mongodb.net/freshShop"
//admin_url="admin16"

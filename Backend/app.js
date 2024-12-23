const dotenv = require("dotenv")
dotenv.config()
const bodyParser = require('body-parser');
const cors = require("cors");
const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const sessions = require("express-session")
const { apiV1 } = require("./src/routes")
const { connectDb } = require("./src/db")
const { UserModel } = require("./src/models/user")

const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.use(
  sessions({
    domain: 'https://onlinelibrarymanagementfrontend-441sbbkay.vercel.app',
    secret: 'mysecret',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, 
              secure: true,  // Ensure cookie is only sent over HTTPS
              // sameSite: 'strict',  // Allow cookie to be sent with cross-origin requests
              // httpOnly: true,
            },
  })
)



const corsOptions = {
  origin: "https://onlinelibrarymanagementfrontend-441sbbkay.vercel.app",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  credentials: true
};

app.use(cors(corsOptions));


app.use("/v1", apiV1)

app.use((req, res) => {
  return res.status(404).json({ error: "Route not found" })
})

app.use((err, req, res, next) => {
  console.error("Error:", err)
  return res.status(500).json({ error: "Unknown server error" })
})

connectDb()
  .then(async () => {
    const admin = await UserModel.findOne({ username: "admin" })
    if (admin == null) {
      await UserModel.create({ username: "admin", password: "admin", role: "admin" })
    }
    const guest = await UserModel.findOne({ username: "guest" })
    if (guest == null) {
      await UserModel.create({ username: "guest", password: "guest", role: "guest" })
    }
  })
  .then(() => {
    app.listen(port, () => console.log(`Server is listening on http://localhost:${port}`))
  })
  .catch((err) => {
    console.error("Failed to connect to database", err)
    process.exit(1)
  })

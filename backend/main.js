const express = require("express")
const router = require("./routes/personRoutes")

const app = express()

app.use(router)
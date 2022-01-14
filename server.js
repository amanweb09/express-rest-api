require('dotenv').config();

const express = require('express')
const app = express()
const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.COOKIE_SECRET));

const dbConnection = require('./database/connection')
dbConnection();

const router = require('./router/routes');
const admin_router = require('./router/admin_routes');
app.use(router)
app.use(admin_router)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`)
})
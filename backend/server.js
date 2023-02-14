require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
const session = require('express-session');

const app = express();
const redisPort = process.env.REDIS_PORT || 6500;
const port = process.env.PORT || 3000;
const router = require('./src/routes')
const TWO_HOURS = require('./src/helpers/twoHours')
const NODE_PROD = process.env.NODE_ENV === 'production'

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sessionStore = new redisStore({ client: redisClient });
const redisStore = require('connect-redis')(session);

const redisClient = redis.createClient({
    host: 'localhost',
    port: redisPort
});

redisClient.on('error', (err) => {
    console.log("Gabisa connect ke redis. " + err);
});
redisClient.on('connect', (err) => {
    console.log("Berhasil connect ke redis");
})


app.use('/', router)
app.use(session({
    name: process.env.SESS_NAME,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: process.env.SESS_SECRET,
    cookie: {
        maxAge: TWO_HOURS,
        sameSite: true,
        secure: process.env.NODE_PROD
    }
}))

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
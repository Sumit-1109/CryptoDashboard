const express = require("express");
const cors = require("cors");
const dotenv = require ("dotenv");
const bodyParser = require("body-parser");
const coinRoutes = require('./routes/coin.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();

app.use('/api', coinRoutes); 

const PORT = process.env.PORT || 8000;

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Server Failed`)
        console.log(err);
    }
    console.log(`Server running succesfully on PORT : ${PORT}`)
})
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { dbConnect } = require("./config/dbConnect");
const { router } = require("./routes/todoRoute");
//PORT
const PORT = process.env.PORT || 5000;

const app = express();

//DABATABSE
dbConnect();

//Midelware

app.use(express.json());
app.use(cors({origin: '*'}))
app.use(express.urlencoded({ extended: true }));  





//ROUTES
app.use("/api", router);
// PORT LISTENING
app.listen(PORT, () =>
  console.log(
    `The server is running on Port : ${PORT} -  http://localhost:${PORT}`
  )
);

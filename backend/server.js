
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const colors = require("colors");
const PORT = process.env.PORT || 8000;
const techRoute = require("./routes/technicianRoutes");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const logRoute = require("./routes/LogRoutes");
//Connect Database
connectDB();

//Middleware Functionality
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//API URLs
app.use("/api/technicians", techRoute);
app.use("/api/logs", logRoute);
//Error Handler
app.use(errorHandler);


//Port to listen
app.listen(PORT, () => {
    console.log(`Server is listening at PORT: ${PORT}`.green.underline.bold);
});
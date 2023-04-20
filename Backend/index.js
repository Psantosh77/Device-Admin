import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import referralRoutes from "./routes/referal.js";
import packageRoute from "./routes/packages.js";
import countriesRoute from "./routes/countries.js";
import bannerRouter from "./routes/banner.js";
import session from "express-session";
import passport from "passport";
import morgan from "morgan";
import bodyParser from  'body-parser'

const PORT = 5000


// import "dotenv/config";
dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(session({secret: 'cats'}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true })); 


app.use(router);
app.use(referralRoutes);
app.use(bannerRouter);
app.use(packageRoute);
app.use(countriesRoute);
app.use(passport.initialize());
app.use(passport.session());

 
app.listen(PORT, ()=> console.log('Server running at port 5000'));
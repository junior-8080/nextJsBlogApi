import 'dotenv/config'
import express from 'express';
const app = express();
import cors from 'cors';
const PORT = process.env.PORT || 3004;
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { dbInit } from './utils/dbconnection.js';
import signup from './users/routes-siginup.js';
import sigin  from './users/routes-login.js';
import posts from './posts/routes.js';
import users from './users/routes.js';
import morgan from 'morgan';
import logger from './logs/logger.js';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument  from "./swagger.json";



// database initialization.
dbInit();


app.use(morgan('combined',{}));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/v1/signup",signup);
app.use("/v1/login",sigin);
app.use("/v1/posts",posts);
app.use("/v1/users",users)

// documentation
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocument));
app.listen(PORT,()=> {logger.info(`app running on port : ${PORT}`)});


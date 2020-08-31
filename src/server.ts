//Packages
// import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import http from 'http';
import enforce from 'express-sslify';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

//Routes
import routes from './routes/index-routes';

dotenv.config();

const app = express();

//COOKIE SESSION CONFIG
app.use(
   cookieSession({
      name: 'pagination-session',
      keys: [process.env.COOKIE_KEY!],
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      expires: new Date(2100, 1, 1),
   })
);

//Body Parser Setup
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Cross Origin Request
app.use(cors());

//How we will serve in production
if (process.env.NODE_ENV === 'production') {
   app.use(enforce.HTTPS({ trustProtoHeader: true }));
   // app.use(express.static(path.join(__dirname, '../client/build')));
   // //Every URL
   // app.get('*', (req, res) => {
   // 	res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
   // });
}

//Server
const port = process.env.PORT || 5000;

http
   .createServer(app)
   .listen(port, () => console.log(`Server running on port ${port}`))
   .on('error', (err) => {
      throw err;
   });

//DB CONNECTION
mongoose
   .connect(`${process.env.DB_URI}${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
   })
   .then(() => {
      console.log(`Mongoose Connected to: ${mongoose.connection.name}`);
   })
   .catch((err) => {
      console.log(`Error: ${err.message}`);
   });

// //PASSPORT INITIALIZE
// app.use(passport.initialize())
// app.use(passport.session())

app.use('/', routes);

import 'dotenv/config';
import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectToDb from './database/db.js';
import userRoutes from './routes/user.route.js';
import driverRoutes from './routes/driver.route.js';
import mapRoutes from './routes/map.route.js';
import rideRoute from './routes/rides.route.js';

const App = express();
connectToDb()
    .then(() => console.log('connected to DB'))
    .catch(err => console.log(err));
App.use(cors());
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(cookieParser());

App.get('/', (req, res) => res.send('Hello World'));

App.use('/users', userRoutes);
App.use('/drivers', driverRoutes);
App.use('/maps', mapRoutes);
App.use('/rides', rideRoute);

export default App;
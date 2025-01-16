import express from "express";
import { query } from "express-validator";
import authUser from "../middlewares/userAuth.js";
import mapController from "../controller/map.controller.js";

const router = express.Router();

router.get('/get-coordinates', query('address').isString().isLength({ min: 3 }), authUser, mapController.getCoordinates);
router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authUser, mapController.getDistanceTime);
router.get('/get-suggestions', query('input').isString().isLength({ min: 3 }), authUser, mapController.getSuggestions);

export default router;
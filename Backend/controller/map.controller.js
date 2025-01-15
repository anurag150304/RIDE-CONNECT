import { validationResult } from "express-validator";
import { getAddressCoordinates, getAutocompleteSuggestions, getDistanceAndTime } from "../services/map.service.js";

export const getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) return res.status(400).json({ error: errors.array() });
    const { address } = req.query;
    try {
        const coordinates = await getAddressCoordinates(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: "Coordinates not found" });
    }
}

export const getDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) return res.status(400).json({ error: errors.array() });
    const { origin, destination } = req.query;

    try {
        const distanceTime = await getDistanceAndTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (error) {
        res.status(404).json({ message: "Distance not found" });
    }
}

export const getSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) return res.status(400).json({ error: errors.array() });
    const { input } = req.query;

    try {
        const suggestions = await getAutocompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(404).json({ message: "Suggestions not found" });
    }
}
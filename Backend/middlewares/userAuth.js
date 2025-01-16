import blackListModule from "../modules/blackListToken.js";
import userModule from "../Modules/User.js";
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlackListed = await blackListModule.findOne({ token });
    if (isBlackListed) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModule.findById(decoded._id);

        req.user = user;
        return next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authUser;
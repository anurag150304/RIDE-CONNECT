import mongoose from 'mongoose';

export const connectToDb = async () => {
    await mongoose.connect(`${process.env.CONNECT_DB_ATLAS}`);
}
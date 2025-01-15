import mongoose from 'mongoose';

const connectToDb = async () => {
    await mongoose.connect(`${process.env.CONNECT_DB_ATLAS}`);
}

export default connectToDb;
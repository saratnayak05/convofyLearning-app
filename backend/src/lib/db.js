import mongoose from "mongoose"

export const connectDB = async () => {
    try{
       const cnn = await mongoose.connect(process.env.MONGO_URI);
       console.log(`MongoDB Connected: ${cnn.connection.host}`);
    }catch{
        console.log(`Error Connecting to  MongoDB`, error);
        process.exit(1); // 1 means failure
    }
}
import mongoose from "mongoose";

const connectToDatabase = ():void => {
    const dataBaseURL:string = process.env.DATABASE_URL ?? "null"
    mongoose.connect(dataBaseURL,)
    .then((data) => {
        console.log(`MongoDB Connected with server: ${data.connection.host}`)
    })
    .catch((error) => {
        console.log(error,"error is coming")
    })
}   

export default connectToDatabase;
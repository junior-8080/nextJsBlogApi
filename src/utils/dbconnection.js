import mongoose from 'mongoose';

export const dbInit =  async() => {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_DB_CONNECTING_STRING,{useNewUrlParser: true,useUnifiedTopology:true});
        console.log(`App connected to databse successfully`);

    } catch (error) {
        console.log(`Error connecting to mongo database: ${error.message}`)
    }
}
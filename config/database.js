const mongoose = require('mongoose')

//connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB)
        console.log(`MongoDB connected : ${conn.connection.host}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB

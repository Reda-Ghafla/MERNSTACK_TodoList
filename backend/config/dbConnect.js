const mongoose = require('mongoose');
//DOTENV



const dbConnect = async ()=>{
    
    try {
        
        const connected = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("DB connected successfully");
    } catch (error) {
         console.log( "Error ====>" + error.message)
    }
}

module.exports = {dbConnect};
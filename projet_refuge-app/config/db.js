const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://adrienalvarez15:<XpVA4QwlmaKI4je3>@refuge4pattes.iidms.mongodb.net/?retryWrites=true&w=majority&appName=Refuge4pattes";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectDB() {
    try {
        await client.connect();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectDB;

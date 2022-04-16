const { mongoUri } = require("../databaseUri.json");
const { Database } = require("./databasewrapper");
const { dbEnsure, delay } = require("./functions")
const OS = require("os");

module.exports = async client => {
    return new Promise(async (res) => {
    
        const connectionOptions = { 
            useUnifiedTopology: true,
            maxPoolSize: OS.cpus().length * 5,
            minPoolSize: OS.cpus().length,
            writeConcern: "majority",
        };
        /*
            if you have several Pools, mongo can use them to send data to them without "blocking" the sending from other datas
            Aka it will be faster, but needs more ram...
        */
        let dateNow = Date.now();
        console.log(`${String("[x] :: ".magenta)}Now loading the Database ...`.brightGreen)
        client.database = new Database(mongoUri, connectionOptions);
        client.database.on("ready", async () => {
            const DbPing = await client.database.ping();
            console.log(`[x] :: `.magenta + `LOADED THE DATABASE after: `.brightGreen + `${Date.now() - dateNow}ms\n       Database got a ${DbPing}ms ping`.green)
            // Creating the Tables
           
            client.afkDB = new client.database.table("afkDB");
            
            client.settings = new client.database.table("settings");
            
            client.setups = new client.database.table("setups");
            
            client.userProfiles = new client.database.table("userProfiles");
            
            client.keyword = new client.database.table("keyword");
            
            client.premium = new client.database.table("premium");
            
            await dbEnsure(client.afkDB, "REMIND", {
                REMIND: []
            });
        });

    })
    

}
const { MongoClient } = require("mongodb");
/* Notice all the variable such as: .uri, dbName,,db,Client  are all global 
(Outside of getdatabase function)why? because  we don't wat to create a new mongoclient or db each time
getDatabase imported and called from other files, so imake these variable global  */


/*to connect the databbase , this is standard protocol mongodb:// and 
 default acutal path localhost and port is 27017*/
const uri = "mongodb://localhost:27017";
//Database name
const dbName = "medicalportal";

let db = null;
const client = new MongoClient(uri);

async function getDatabase() {
    try{
        //connect to mongodb server , if something goes wrong we can catch the error  in the catch block
await client.connect();
/*select the database and assign it to global db variable,remember we only want one db instance, we don't create
 mew instance each time when connect to database*/
db = client.db(dbName);
return db;
    } catch(error){
console.log(error);
throw new Error(error);
    }
}

module.exports = { getDatabase, client };

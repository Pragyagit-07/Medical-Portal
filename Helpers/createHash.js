const bcrypt= require("bcrypt");

/*we want to manualy  create a password  for admin, that is why we can use this  file to create a hashed pasasword
Store  a hashed  password into a database. Never store a plain password into a database.Later on, we can use bcrypt 
library to compare the stored hashed password in the database with the password coming from the frontend request 
which will be hashed and  then they both compared.

*/
const saltRounds = 10;
async function createHash(password){
    // Remember bcrypt.Hash return the promise with the hash string  so you need to return that promise.that is why
   // we add return before bcrypt below
    return bcrypt.hash(password, saltRounds).then((hash)=>{
console.log(hash);
return hash;
    }).catch((err)=>{
        console.log(err);
        return err;
    });
}
createHash("Hello12@dmin");
module.exports = createHash;

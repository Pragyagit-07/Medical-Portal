const returnStatus = require("../Helpers/returnStatus");
const bcrypt = require("bcrypt");
const {getDatabase, client} = require("../Helpers/connectDB");
const signToken = require("../Helpers/signToken");
const fs = require("fs");
const path = require("path");

const usersController ={
signIN: async (req, res)=>{
try{
const db = await getDatabase();
var user = null;
console.log(req.body);
    //check if the email is admin email or doctor email because only admin and doctor email signin
const admin = await db.collection("admin").findOne({
email: req.body.email,
});
const doctor = await db.collection("doctors").findOne({
    email: req.body.email,
});
    if(!admin && !doctor){
return returnStatus(res, 404, true,"NOT found");
    }
if (admin){
    user = admin;
}
if (doctor){
    user = doctor;
}
/*compare the password, password is what sent to server and user.password is the hashed password from the 
database.*/
bcrypt.compare(req.body.password, user.password,(err,result)=>{
    if(err || !result){
        return returnStatus(res, 401, true, "Invalid email or password");
    }
    //Generate JSON WEB TOKEN
    const newjwt = signToken({
        email: user.email,
    });
    //send token
    return returnStatus(res, 200, false, `Welcome ${user.username}`,{
        token: newjwt,
        username: user.username,
    });
});
} catch (error){
    console.log(error);
    return returnStatus(res, 500, true, "Internal Server error");
}finally{
    if(client){
        await client.close();
    }
}
},
checkifLoggedIn: async(req, res) =>{
    try{
const db = await getDatabase()
//remember decoded token coming from verify token middleware,
const admin = await db.collection("admin").findOne({
    email: req.decodedtoken.email,
});
//check if this user is admin, if yes send admin:true object 
if(admin){
return returnStatus(res, 200, false,"okay!",{
    admin: true,

});
}
const doctor = await db.collection("doctors").findOne({
    email: req.decodedtoken.email,
});
//check if user is doctor then send yes doctor: true object,
if (doctor){
    const uploadsDir = path.join(__dirname, "/../uploads");
    var image = null;
    const files = await fs.promises.readdir(uploadsDir);
    //find the file  with corresponding user ID, regardless of extension

    const imageFile = files.find((file) => 
 file.startsWith(doctor.idnumber)
    );
    var base64Image = "";
if(imageFile){
//Read the image file
const imagePath = path.join(uploadsDir,imageFile);
  image = fs.readFileSync(imagePath);
 //convert the image into base64
 base64Image  = Buffer.from(image).toString("base64");
}
    return returnStatus(res, 200, false,"Ok" , {
        image: base64Image,
        doctor: true,
        idnumber: doctor.idnumber,
        phone: doctor.phone,
        email: doctor.email,
        username: doctor.username,
    });
}else{
    return returnStatus(res, 401, true," Unauthorised");
}
    }catch(error){
console.log("error");
return returnStatus(res, 500, true,"internal server error");
    }finally{
        if(client){
            await client.close();
        }
    }
}
};
module.exports = usersController;
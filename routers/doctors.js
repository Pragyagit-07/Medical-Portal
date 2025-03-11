const express =  require("express");
const router = express.Router();
const doctorsController = require("../controllers/doctorsController");
const verifyToken = require("../middlewares/verifyToken");
const returnStatus = require("../Helpers/returnStatus");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");


const {} = require("../middlewares/checkInputs");
const{
    checkIDNumber,
    checkPhoneNumber,
    checkEmail,
    checkPassword,
    checkUserName,
} = require("../middlewares/checkInputs")


router.post(
    "/registerdoctor",
     verifyToken,
      (req ,res, next) => {
    const uploadDir = path.join(__dirname,"..","uploads");
    const form = new formidable.IncomingForm({
        uploadDir: uploadDir,
        //allow 1 megabyte file size limit, note:1 megabyte(MB) = 1048576
     //   bytes = 1024 * 1024  
        maxFileSize: 1 * 1024 *1024,
    });
    form.parse(req, async(err, fields, files)=>{
if(err){
    return returnStatus(res, 400, true, "Error uploading file, file limit 1MB");
}

//If the data we pass from frontend is in a JSON format sp we turn it into javascriptObject
const formData = JSON.parse( fields.data);
if(formData){
    const{ idnumber, phone, email, username, password } = formData;
    /*We must attach these idnumber,phone, email, username, password to the req object so the other middlewarelike checkidnumber,
    checkPhonenumber.... so we can access these properties from the req object, remember only  formidable
    module  can extract these properties from the request.*/

  
    req.body.idnumber = idnumber;
    req.body.email = email;
    req.body.username = username;
    req.body.password = password;
    req.body.phone = phone;
   
    
    
    
    req.uploadedImageFilePath = files.file[0].filepath;
    req.uploadedImageName = files.file[0].originalFilename;
    next();

}else{
    return returnStatus(res,  400,  true, "User  data doesn't exists");
}
    });
},

checkIDNumber, 
checkEmail,
checkUserName,
checkPassword,
checkPhoneNumber,
doctorsController.registerDoctor
);

router.get("/search", doctorsController.searchDoctor);
router.post(
    "/updatecontact",
    verifyToken,
    checkIDNumber,
    checkEmail,
    checkPhoneNumber,
    doctorsController.updateContact
);

/*Error handling middleware, for this to work make sure to do something like this: return next(new error());
from other middleware whe error occurs, for example in checkIDNumber, checkPhoneNumber...... If phonenumber
is wrong or username  then if we do return next(new error()); for those middleware we can catch error and why we
do  even do this? there are situations when modules such as formidable saves the images in to a folder we want and what 
if we want to get rid off the image later on  if something goes wrong? well this is why we create a centralized
error-handling middleware below.
 */
router.use((err, req, res, next) => {
   if( req.uploadedImageFilePath ){
    /*If there is error thrown and there is uploadingImagefilePath in the req then remove the uploadingImageFilePath
    remember formidable module saves the images in a folder we define and in some cases when there is an error
    we may want to remove those images/files */
    fs.unlink(req.uploadedImageFilePath, (err)=>{
        if(err){
console.log("Error deleting temporary file",err);
        }  
console.log("File deleted successfully");
});
   }
   /*If other errors thrown  from middlewares such as checkemail, checkPassword, then we also display those error
    via err.message*/
   console.log("From doctors route middleware", err.message);
});
module.exports = router;
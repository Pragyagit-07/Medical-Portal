


const returnStatus = require("../Helpers/returnStatus");
function checkIDNumber(req, res, next){
const{ idnumber }= req.body;
if(!idnumber){
    returnStatus(res,400,true,"idnumber field is missing");
    return next(new Error("idnumber field is missing"));
}
//check if idnumber contains only numbers and it must have 8 digits assuming the idnumber of citizen have 8 digits
const idnumberRegex = /^\d{8}$/;
const result = idnumberRegex.test(idnumber);
if(!result){
    returnStatus(res, 400, true, "idnumber is invalid");
    return next(new Error("idnumber is invalid"));
}
next();
}
//check
function checkUserName(req, res, next){
const { username } = req.body;
if(!username){
    returnStatus(res, 400, true,"username  field is missing!");
    return next(new Error("username  field is missing"));
}
//check user name only contains a-z ,A-Z
const usernameRegex =/^[a-zA-Z\s]+$/;
if(username.lenght > 50){
    returnStatus(res,400, true,"username is too long");
    return next(new Error("username is to long"));
}
//check if username matches the regular expresion.
const result = usernameRegex.test(username);
if(!result){
    returnStatus(res, 400, true, "username is invalid");
    return next( new Error("username is invalid"));
}
next();
}





//check email
function checkEmail(req, res, next){
    const {email} = req.body;
    if(!email){
 returnStatus(res, 400, true,"Email is missing!");
 return next(new Error("Email is missing"));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //Total lenght of email should be greater than 50  means character, numbers.
    if(email.length > 50){
returnStatus(res,400,true,"Email  too long");
return next(new Error("Email too long"));
    }
    //This will either return true or false
    const result = emailRegex.test(email);
if(!result){
    returnStatus(res, 400, true, "Invalid Email");
    return next(new Error("Invalid email"));
}//If this line is reached ,continue  Everything is ok.
next();
}

// check Password
function checkPassword(req, res, next){
    const {password} = req.body;
    if(!password){
        returnStatus(res,400, true,"Password is missing");
        return next(new Error("Password is missing"));
           }
           
           if(password.length > 20){
       returnStatus(res,400,true,"Password  too long");
       return next(new Error("Password too long"));
           }
           
    
       //If this line is reached then ,continue  Everything is ok.
       next();
       }
       //check Address
       function checkAddress(req, res, next){
        const { address } = req.body;
        if(!address){
            returnStatus(res, 400, true,"Address is  missing");
            return next(new Error("Address is missing"));
        }
        if(address.lenght > 100){
            returnStatus(res,400, true, "address is too long ");
            return next(new Error("address is too long"));
        }//allow .,\/'
        const addressRegex = /^[a-zA-Z0-9\s.,\/'-]+$/;
        const result = addressRegex.test(address);
        if(!result){
            returnStatus(res,400, true, "address is invalid ");
            return next(new Error("address is invalid"));
        }
        next();
       }
function checkPhoneNumber(req, res, next){
    const {phone} = req.body;
    if(!phone){
        returnStatus(res,400, true,"phone number is missing");
        return next(new Error("phone number is missing"));
    }
    if(phone.lenght > 13){
        returnStatus(res,400, true, "phonenumber is too long ");
        return next(new Error("phonenumber is too long"));
    }
    const phoneRegex = /^[0-9 ()+-]+$/;
    const result= phoneRegex.test(phone);
    if(!result){
        returnStatus(res,400, true, "phonenumber is invalid ");
        return next(new Error("phonenumber is invalid"));
    }
    next();
    }

    function checkMedicalRecord(req, res, next){
      const {medicalrecord} = req.body;
      if(medicalrecord.lenght > 450){
        returnStatus(res, 400, true, "medical record too long");
        return next(new Error("medical record too long"));
      }
      const medicalRecordRegex = /^(?:[^<>|]*)$/;
      const result = medicalRecordRegex.test(medicalrecord);

      if(!result){
        returnStatus(res, 400, true, "Medical record is invalid");
         return next(new Error("medical record is invalid"));
      }
      next();
    }

module.exports = {
    checkIDNumber: checkIDNumber,
    checkUserName: checkUserName,
    checkEmail: checkEmail,
    checkPassword: checkPassword,
     checkAddress: checkAddress,
     checkPhoneNumber: checkPhoneNumber,
checkMedicalRecord: checkMedicalRecord,
};

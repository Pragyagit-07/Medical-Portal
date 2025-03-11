const{getDatabase , client} = require("../Helpers/connectDB");
const createHash = require("../Helpers/createHash");
 const returnStatus =  require("../Helpers/returnStatus");
 const createImage = require("../Helpers/createImage");
 const { json } = require("express");

const doctorsController = {
    registerDoctor : async(req,res,next)=>{
        try{
const db = await getDatabase();
const admin = await db.collection("admin").findOne({
    email: req.decodedtoken.email,
});
if(!admin){
    returnStatus(res, 401, true,"Unauthorised request");
    return next(new Error());
}
//If the email that is register doctor that is already exusts in admin collection then reject the request.

const emailExistsForAdmin = await db.collection("admin").findOne({
    email: req.body.email,
});
if(emailExistsForAdmin){
returnStatus(res, 400, true,"Ypu can't register a doctor using this email");
return next(new Error());
}
/*WE have idnumber, email for patients too, so check if idnumber, email  registering a doctor exist in  patients*/
const patient = await db.collection("patients").findOne({
    $or: [{email: req.body.email}, {idnumber: req.body.idnumber }],
});
/* If the idnumber or email use for registering a patient. we cannot use this idnumber or email for registering a doctor */
if( patient){
    returnStatus(res, 400, true,"You can't use this idnumber or email for registering a doctor");
    return next(new Error());
}
// if admin exists that's mean, this request is coming from admin ao we can create a doctor 
if(admin){
const doctors_collection = db.collection("doctors");
const doctor = await doctors_collection.findOne({
$or: [{email: req.body.email}, {idnumber: req.body.idnumber }],
});

if (doctor){
    returnStatus(res, 400, true,"Doctor already registered");
    return next(new Error());
}else{
    //create a hshed passsord for doctor
    const hash = await createHash(req.body.password);
    if (createImage(req))
        {
        console.log("Image created");
    }else{
        returnStatus(res,400, true,"Error uploading file");
        return next(new Error());
    }
    //Insert document to the db.
    const result = await doctors_collection.insertOne({
        username: req.body.username ,
        idnumber: req.body.idnumber ,
        email: req.body.email ,
        password: hash ,
        phone: req.body.phone ,

    });
    console.log("doctor registered");
    return returnStatus(res, 201, false,"Doctor Registered");
}
}
        }catch(error){
console.log(error);
 returnStatus(res, 500, true,"Internal Server Error");
return next(new Error());
        }finally{
            if(client){
                await client.close();
            }
        }
    },
 
    searchDoctor : async (req, res)=>{
        try{
const db = await getDatabase();
const doctor = await db.collection("doctors").findOne({
    idnumber: req.query.idnumber,
},
//projection help us to omit fields.in this case field with _id & password

    { projection: { _id: 0, password: 0 } }
);

if(doctor){
const doctorJson = JSON.stringify(doctor);
  return returnStatus(res, 200, false, "Doctor found",{
        doctor: doctorJson,
    });
} else{
    return returnStatus( res, 404, true, "Doctor not found!" );
}
        }
        catch(error){
            console.log(error);
return returnStatus(res, 500, true, "Internal server error");
} finally{
    if(client){
        await client.close();
    }
}
    },
    updateContact: async (req, res)=>{
        try{
            const{ phone, email, idnumber } = req.body;
            const db = await getDatabase();

            const admin = await db.collection("admin").findOne({
                email: req.decodedtoken.email,

            });
            if(admin){
                //we need to check if doctor or patient already exists with email or phone before we update
                const doctorExists = await db.collection("doctors").findOne({
                    $or:[{email: req.body.email},{ phone: req.body.phone}],
                });
                const patientExists = await db.collection("patients").findOne({
                    $or:[{email:req.body.email},{ phone: req.body.phone}],
                });
                if(doctorExists || patientExists){
                    return returnStatus(res, 404, true,"This email can't be used");
                }
                const doctor = await db.collection("doctors").findOneAndUpdate(
                    { idnumber: idnumber },
                    {$set:{
                        phone: phone,
                        email: email
                    },
                },
                {
                    returnDocument: "after",
                    projection: { _id: 0, password: 0 },
                }
                );
                if(!doctor){
                    return returnStatus(res,404,true,"Doctor was not found");
                }
                const doctorJson = JSON.stringify(doctor);
                return returnStatus(res, 201, false, "Doctor Updated",{
                    doctor: doctorJson, 
                });
            }
            //If we reach to this line it means that you aren't admin
            return returnStatus(res, 401, true, "unauthorized");
        }catch(error){
            console.log(error);
            return returnStatus(res,500, true, "Internal server error");
      }finally{
        if(client){
            await client.close();
        }
      }
    }
};


module.exports = doctorsController;
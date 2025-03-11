
const {getDatabase , client} = require("../Helpers/connectDB");
const returnStatus = require("../Helpers/returnStatus");

const patientsController = {
    registerPatient: async(req, res, next) => {
try{
const db = await getDatabase();

const doctorid =  await db.collection("doctors").findOne({
      $or: [{ email : req.body.email } ,{ idnumber : req.body.idnumber }],
});
if(doctorid){
    return returnStatus( 
        res, 
        400, 
        true, 
        "You can't register a patient using this idnumber or email" 

    );
}

const doctor = await db.collection("doctors").findOne({
 email:  req.decodedtoken.email,
});
const admin = await db.collection("admin").findOne({
    email: req.decodedtoken.email,
});
const emailExistsForAdmin = await db.collection("admin").findOne({
email:  req.body.email,
});
if(emailExistsForAdmin){
return returnStatus(res,400 ,true,"you can't register a patient using this email");
}

const medicalrecord = doctor ? [
    {
date: new Date().toLocaleDateString("en-GB"),
record: req.body.medicalrecord,

    },
]
: [];
if(doctor || admin){
const patients_collection= db.collection("patients");

const patient = await patients_collection.findOne({
    $or: [{ email : req.body.email } ,{ idnumber : req.body.idnumber }],
});
if(patient){
    return returnStatus(res,400,true,"Patient already exists");
}
const result = await patients_collection.insertOne({
       idnumber: req.body.idnumber,
       username: req.body.username,
       email: req.body.email,
       address: req.body.address,
       phone: req.body.phone,
       medicalrecord: medicalrecord,
});
//Always make sure to return  this json  format where we send status code and have a messege properly because
// we will use this in  the frontend
return returnStatus(res, 200, false,"patient added");
}
return returnStatus(res, 401, true, " You aren't allowed to register a patient");

} catch (error){
    console.log(error);
    return returnStatus(res, 500, true, "Internal server error");
}finally{
    if(client){
        await client.close();

        }    
}
    },
    //anybody can search patient , a receptionist,doctor,admin
    searchPatient: async (req, res)=>{
try{
const db =  await getDatabase();
const patient = await db.collection("patients").findOne(
    { idnumber :req.query.idnumber } ,
    { projection: { _id: 0, password: 0}  }

);
if(patient){
    const patientJson = JSON.stringify(patient);
    return returnStatus(res,200,false,"Patient Found",{
        patient: patientJson,
 });
}else{
    return returnStatus(res, 404 ,true, "Patient  not found");
}
}catch(error){
    console.error(error);
    return returnStatus(res,500,true,"Internal Server Error");
}finally{
    if(client){
        await client.close();

        }    
}
    },
    addNewMedicalRecord: async (req, res) => {
        try{
const db = await getDatabase();
const doctor = await db.collection("doctors").findOne({
    email: req.decodedtoken.email,
});
if(doctor){
    const patient = await db.collection("patients").findOneAndUpdate(
        {idnumber: req.body.idnumber },{
            $push:{
                medicalrecord:{
date: new Date().toLocaleDateString("en-GB"),
record: req.body.medicalrecord,
                },
            },
        },
        {returnDocument:"after", projection: {_id: 0, password: 0} }
    );
    if(!patient){
        return returnStatus( res, 404, true, "Patient Not Found");
    }
    const patientJson = JSON.stringify("patient");
    return returnStatus(res,201, false,"New Record For Patient Added",{
        patient: patientJson,
    });
}

return returnStatus(res,404, true, "Doctor was not found");
        } catch(error){
            console.log(error);
            return returnStatus(res, 500, true, "Internal server Error");
         }finally{
            if(client){
                await client.close();
        
                }    
        }
    },
    updateContact: async( req, res) =>{
        try{
const {phone,email,idnumber} =    req.body;
const db = await getDatabase();
const admin =  await db.collection("admin").findOne({
    email: req.decodedtoken.email,
});
if(admin){
    const adminEmailExists = await db.collection("admin").findOne({
        email: email,
    });

    const doctorEmailExists = await db.collection("doctors").findOne({
        email: email,
    });
    if( adminEmailExists || doctorEmailExists ){
return returnStatus(res, 404,true, "you cam't use this email ");
    }
    const patient = await db.collection("patients").findOneAndUpdate(
        
            {idnumber: req.body.idnumber},
            {
                $set:{
phone: phone,
email: email,
                },
            },
            { returnDocument: "after" , projection :{_id :0 ,password : 0}  }
        
    );

    if(!patient) {
        return returnStatus( res,404, true, "Patient was not found ");
    }
    const patientJson = JSON.stringify(patient);
    return returnStatus( res, 201, false , "Patient Updated",{
patient: patientJson,
    });
}
//If you are reached to this line it means you aren't admin
return returnStatus( res, 401,true,"Unauthorised" );
        }catch(error) {
            console.log(error);
            return returnStatus( res, 500, true, "Internal Server Error");
        }
    }
};


module.exports= patientsController;
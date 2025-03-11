const express = require("express");

const router = express.Router();
const patientsController = require("../controllers/patientsController");
const verifyToken = require("../middlewares/verifyToken");
const 
{ checkIDNumber,
    checkUserName,
    checkAddress,
    checkEmail,
    checkPhoneNumber,
    checkMedicalRecord,
} = require("../middlewares/checkInputs");
   router.post(
    "/registerpatient", 
    verifyToken,
    checkIDNumber,
    checkUserName,
    checkAddress,
    checkEmail,
    checkPhoneNumber,
    checkMedicalRecord,
    patientsController.registerPatient
);
router.get("/search",patientsController.searchPatient);

//only doctor can adda new medicalrecord,
//  admin can't do that because you must be a doctor to diagnose a patient
router.post(
    "/addnewmedicalrecord",
    verifyToken,checkIDNumber,checkMedicalRecord,patientsController.addNewMedicalRecord);

    router.post(
        "/updatecontact",
        verifyToken,
        checkIDNumber,
        checkPhoneNumber,
        checkEmail,
    patientsController.updateContact);

router.use((err, req, res, next)=>{
    console.log("From Patients router middleware", err.message);
});
module.exports = router;
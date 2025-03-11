const express = require("express");
const usersController = require("../controllers/usersController");
const { checkEmail, checkPassword } = require("../middlewares/checkInputs");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();
router.post("/signin", checkEmail, checkPassword, usersController.signIN);

router.get("/checkifloggedin", verifyToken, usersController.checkifLoggedIn);

router.use((err, req, res, next)=>{
    /*If there is any error thrown from any middleware such as checkEmail, CheckPassword, checkPhonenumber....
    this middleware run and we see  the error from the backend, if you just display err, we get the stack 
    trace( where the error is coming from) and if you  do err.message , we get the exact error.
    
    */
console.log("from user route middleware", err.message);
});
module.exports = router;

  require("dotenv").config();
const express = require("express");
const cors = require("cors");
const patientsRouter = require("./routers/patients");
const doctorsRouter = require("./routers/doctors");
const usersRouter =  require("./routers/users");
const returnStatus = require("./Helpers/returnStatus");
//create an instance of express
const app = express();
//middleware to pass JSON buddies
app.use(express.json());

app.use(cors());

//apply routes middleware to these routers.
app.use("/patients", patientsRouter);
app.use("/doctors", doctorsRouter);
app.use("/users", usersRouter); 

app.get("/", (req, res) => {
res.send("hy people");
});
//Error handling middleware for non existing routers
app.use((req ,res, next) => {
        return returnStatus(res, 404, true, "NOT FOUND!");
});
const port = process.env.PORT ||5000;
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});
import "./RegisterPatient.css";
import CustomForm from "../../component/CustomForm/CustomForm";
import { useSelector } from "react-redux";
import { useState } from "react";
import Button from "../../component/Button/Button";
import { makePOSTrequest } from "../../utils/api";


const RegisterPatient = ()=>{
    const [idnumber,setIDNumber] = useState("");
    const [email,setEmail] = useState("");
    const [username,setUserName] = useState("");
    const [address,setAddress] = useState("");
    const [phone,setPhone] = useState("");
    const [medicalrecord,setMedicalRecord] = useState("");
    const [message, setMessage] = useState("");
    const userSelector = useSelector((state )=> state.user);

async function registerPatient(e) {
    e.preventDefault();
    const res = await makePOSTrequest(
        "http://localhost:5000/patients/registerpatient",
        {
            idnumber:idnumber,
            username:username,
            email: email,
            phone: phone,
            address:address,
            medicalrecord:medicalrecord,
        },
        localStorage.getItem("token")
    );
    setMessage(res.message);
}


return(
    <div className="registerpatient-container">
        <h2>Register Patient</h2>
<CustomForm>
    <CustomForm.IDNumber value={idnumber} onChange={(e) =>setIDNumber(e.target.value)}/>
    <CustomForm.UserName value={username} onChange={(e) =>setUserName(e.target.value)}/>
 {/* <CustomForm.MedicalRecord value={medicalrecord} onChange={(e) =>setMedicalRecord(e.target.value)}/> */}
    <CustomForm.Phone value={phone} onChange={(e) =>setPhone(e.target.value)}/>
    <CustomForm.Address value={address} onChange={(e) =>setAddress(e.target.value)}/>
    <CustomForm.Email value={email} onChange={(e) =>setEmail(e.target.value)}/>

        {userSelector.doctor &&(
            <CustomForm.MedicalRecord  
            value = {medicalrecord}
             onChange= {(e) => setMedicalRecord(e.target.value)}
             />
        )}
        <br />
        <Button value="Register" onClick= {registerPatient} />
        </CustomForm>
    
    
    {message}
    </div>
);

    };

    export default RegisterPatient;
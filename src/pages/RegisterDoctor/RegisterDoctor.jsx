import CustomForm from "../../component/CustomForm/CustomForm";
import Button from "../../component/Button/Button";
import { makePostrequestForMultipleFormData } from "../../utils/api";
import { useState } from "react";
import "./RegisterDoctor.css";

const RegisterDoctor = () =>{
    const[image, setImage] = useState(null);
    const[idnumber,setIDNumber] = useState("");
    const[username,setUserName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[phone,setPhone] = useState("");
    const[message, setMessage] = useState("");

    const  submitDoctor = async (e) =>{
        //we want to prevent the reloading browser or web page
        e.preventDefault();
        if(!image){
            setMessage("No image selected");
            return;
        }
        const formData = new FormData();
        /*file below will then be recieved from backend using formidable,
file below is made up key name so it is a form data key. A formdata in javaScript 
is an instance of formData class , which is used to construct a key/value  pair
representing form fields and their values. It's commonly used to construct a data to be sent in https
request, particularly when dealing with forms or files uploads.
        */
        formData.append("file", image);
/* data below  will then  be recieved from  the backend using req.body.data
,data below is a form data key, a made up name.*/
        formData.append("data", 
            JSON.stringify({
            idnumber: idnumber,
            phone:phone,
            email:email,
            username,
            password,
        })
    );
        console.log(formData);
        const res =  await makePostrequestForMultipleFormData(
            "http://localhost:5000/doctors/registerdoctor",
            formData,
            localStorage.getItem("token")
        );
        setMessage(res.message);
    };
return(
    <div className="registerdoctor-container">
        <h2>Register Doctor </h2>
        <CustomForm>
            <span>Doctor Image :   </span>
            
            <CustomForm.Image onChange={(e) => setImage(e.target.files[0])} />
                <br/>
                <br/>
   
    <CustomForm.UserName value={username} onChange={(e) =>setUserName(e.target.value)}/>
<CustomForm.IDNumber value={idnumber} onChange={(e)=> setIDNumber(e.target.value)}/>
<CustomForm.Email value={email} onChange={(e) =>setEmail(e.target.value)}/>
    <CustomForm.Password value={password} onChange={(e)=>setPassword(e.target.value)}/>
 <CustomForm.Phone value={phone} onChange={(e) =>setPhone(e.target.value)}/>
   
        <Button value="Register Doctor" onClick={submitDoctor}/>
        {message}
        </CustomForm>
    </div>
)
};
export default RegisterDoctor;
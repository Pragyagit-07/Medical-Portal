import { useState } from "react";
import "./SearchDoctor.css";
import Button from "../../component/Button/Button";
import CustomForm from  "../../component/CustomForm/CustomForm";
import { makeGETrequest , makePOSTrequest} from "../../utils/api"; 
import {useSelector} from "react-redux";
import { json } from "react-router-dom";

const SearchDoctor = () => {
    const [idnumber, setIDNumber] = useState("");
   const [messageDoc, setMessageDoc] = useState("");
    const [doctor, setDoctor] = useState({});
    const[updatedEmail,setUpdatedEmail] =useState("");
    const[updatedPhone,setUpdatedPhone]=useState("");
    const[showUpdateContactFields, setShowUpdateContactFields] = useState(false);
    const userSelector = useSelector((state) => state.user);


    async function submitSearch(e){
      e.preventDefault();
     const res =  await makeGETrequest(
        `http://localhost:5000/doctors/search?idnumber=${idnumber}`
    );
setMessageDoc(res.message);
/*Don't try to access the property of external object(eg: coming from db) directly, always perform if check */
if (res.doctor){
    setDoctor(JSON.parse(res.doctor));//i use json instead of JSON
} else{
    setDoctor({});
}
}
async function updateContact(e){
    e.preventDefault()
    const res = await makePOSTrequest("http://localhost:5000/doctors/updatecontact",
        {
            idnumber: doctor.idnumber,
            email: updatedEmail,
            phone: updatedPhone,
        },
        localStorage.getItem("token")
    );
    if(res.status ===201){
        setShowUpdateContactFields(!showUpdateContactFields)
        setDoctor(JSON.parse(res.doctor));
    }
    setMessageDoc(res.message);

}
    return(
        <div className="searchdoctor-container">
            <h2>Search Doctor</h2>
        <CustomForm>
            <CustomForm.IDNumber value= {idnumber} onChange={(e)=>setIDNumber(e.target.value)} />
                <Button value = "Search" onClick = {submitSearch} />
                <br/>
        </CustomForm>
        {doctor.username && (
<div style= {{marginTop: "30px"}}> 
    <p>
        <span style= {{fontWeight: "bold"}}> Id: </span>
        {doctor.idnumber}
    </p>
    <p>
        <span style= {{fontWeight: "bold"}}> Doctor: </span>
        {doctor.username}
    </p>
    <p>
        <span style= {{fontWeight: "bold"}} > Email: </span>
        {doctor.email}
    </p>

    <p>
        <span style= {{fontWeight: "bold"}}> Phone: </span>
        {doctor.phone}
    </p>

  {  /*only admin can update doctor contact info */}
    {userSelector.admin && (
        <Button value ="update doctor contact information"
         onClick={()=>
             setShowUpdateContactFields(!showUpdateContactFields)

        }
        />

    )}
    <br />
    {showUpdateContactFields && (
<CustomForm>
    <CustomForm.Email  value={updatedEmail} onChange={(e)=>setUpdatedEmail(e.target.value)}/>
    <CustomForm.Phone  value={updatedPhone} onChange={(e)=>setUpdatedPhone(e.target.value)}/>
        <Button value="Update" onClick={updateContact}/>
</CustomForm>
    )}
    </div>
        )}
        
        {messageDoc}
        </div>
    );
};
export default SearchDoctor;
import { useState } from "react";
import Button from "../../component/Button/Button";
import { makeGETrequest,makePOSTrequest } from "../../utils/api";
import { useSelector } from "react-redux";
import CustomForm from "../../component/CustomForm/CustomForm";
import "./SearchPatient.css";

const SearchPatient = () => {
    const [ idnumber, setIdNumber ] = useState("");
    const [ message ,setMessage ] = useState("");
    const[ patient, setPatient ] = useState({});
    const[ newMedicalRecord, setNewMedicalRecord ] = useState("");
    const[showNewMedicalRecordFieldAndButton, setshowNewMedicalRecordFieldAndButton] = useState(false);
    const[updatedEmail, setUpdatedEmail]= useState("");
    const[updatedPhone, setUpdatedPhone]= useState("");
    const[showUpdateContactFields, setShowUpdateContactFields]= useState(false);
    const userSelector = useSelector((state)=> state.user);

    async function submitSearch(e){
        e.preventDefault();;
        const res = await makeGETrequest(
            `http://localhost:5000/patients/search?idnumber=${idnumber}`
            );

            setMessage(res.message);
            if(res.patient){
                setPatient(JSON.parse(res.patient));
            }else{
                setPatient({});
            }
    }
    async function submitNewMedicalRecord(e) {
        e.preventDefault();
        const res= await makePOSTrequest(
            "http://localhost:5000/patients/addnewmedicalrecord",
             {
                medicalrecord :newMedicalRecord,
                idnumber: patient.idnumber,
             },
             localStorage.getItem("token")
            );
            if(res.status=== 201){
setNewMedicalRecord("");
setshowNewMedicalRecordFieldAndButton(
    !showNewMedicalRecordFieldAndButton
);
setPatient(JSON.parse(res.patient));
            }
            setMessage(res.message);
    }

    async function updateContact(e){
        e.preventDefault();
        const res = await makePOSTrequest(
"http://localhost:5000/patients/updateContact",
 {
    idnumber : patient.idnumber,
    email : updatedEmail,
    phone : updatedPhone,
},
localStorage.getItem("token")
        );
        if(res.status === 201){
setShowUpdateContactFields(!showUpdateContactFields);
setPatient(JSON.parse(res.patient));
        }
        setMessage(res.message);
    }

    

    return(
        <div className="searchpatient-container">
            <h2>Search</h2>
            <CustomForm>
                <CustomForm.IDNumber 
                value={idnumber}  
                onChange = {(e) => setIdNumber(e.target.value)}/>
                <Button value="Search" onClick={submitSearch}/>
                <br/>
            </CustomForm>
{patient.username &&(
    <div style={{marginTop:"30px"}}>
        <p>
            <span style={{fontWeight:"bold"}}> 
                Id:
                </span>
            {patient.idnumber}
        </p>
        <p>
            <span style={{fontWeight:"bold"}}> 
                Patient:
                </span>
            {patient.username}
        </p>
        <p>
            <span style={{fontWeight:"bold"}}> 
                Email:
                </span>
            {patient.email}
        </p>
        <p>
            <span style={{fontWeight:"bold"}}> 
                Address:
                </span>
            {patient.address}
        </p>
        <p>
            <span style={{fontWeight:"bold"}}> 
                Phone:
                </span>
            {patient.phone}
        </p>
        <ul>
        <span style={{fontWeight:"bold"}}> Medical Record: </span>
        {patient.medicalrecord.map((item,index)=>(
            <li key= {index}>
                {item.date}: {item.record}
            </li>
        ))}
        </ul>
        {/*only doctor can diagnose patient so doctor can add new medical record */}
        {userSelector.doctor && (
            <Button value="Add New Record"
             onClick={() =>
                setshowNewMedicalRecordFieldAndButton(
                    !showNewMedicalRecordFieldAndButton
                 )}
            />
        )}
        {/*only admin can update patient contact Information*/}
        {userSelector.admin && (
            <Button value="Update Patient Contact Information" 
            onClick={()=>
                setShowUpdateContactFields(
                    !showUpdateContactFields
                )}
                />
        )}
        <br/>
       { showUpdateContactFields && (
        <CustomForm>
            <CustomForm.Email 
            value={updatedEmail} 
            onChange={(e)=>
            setUpdatedEmail(e.target.value) }/>

             <CustomForm.Phone 
            value={updatedPhone} 
            onChange={(e)=>
            setUpdatedPhone(e.target.value) }/>

            <Button value="Update" onClick={updateContact} />
        </CustomForm>
       )}

       {showNewMedicalRecordFieldAndButton &&(
<CustomForm>
    <CustomForm.MedicalRecord 
    value={newMedicalRecord} 
    onChange={(e)=>
    setNewMedicalRecord(e.target.value)}/>
     <Button value="Save" onClick={submitNewMedicalRecord} />
</CustomForm>
       )}
        </div>
)}
{message}
        </div>
    );
};
export default SearchPatient;
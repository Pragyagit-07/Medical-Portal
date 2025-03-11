import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeGETrequest } from "../../utils/api";
import "./AdminPanel.css";


const AdminPanel = () => {
const navigate = useNavigate();
/*Remember useEffect run everytime component updates if you don't pass a dependency array 
so add a function or properties to the dependency array if you want to run useEffect
if only that dependency changes so useEffect won't run everytime.*/

useEffect(()=> {
    async function checkIfAdmin(){
        const res = await makeGETrequest(
            "http://localhost:5000/users/checkifloggedin",
        localStorage.getItem("token")
        );
    console.log(res);
    
    //If you aren't admin redirect to home page.
    if(!res.admin){
navigate("/");
    }
}
checkIfAdmin();
},[navigate]);
return(
    < div className="adminpanel-container">
        <div className="features">
            <div className="feature">
                <h3> Register Doctor </h3>
                <p>Register new doctors into the system.</p>
                <a href="/registerdoctor">Register Doctor</a> 
            </div>
            <div className="feature">
                <h3> Search Doctor </h3>
                <p>View and manage doctors.</p>
                <a href="/searchdoctor">View Doctor</a>
            </div>
             {/* <div className="feature">
                <h3>Search Patient </h3>
                <p>View and Manage patient medical history.</p>
                <a href="/searchpatient">Search Patient </a>
            </div>  */}
        </div>

    </div>
);
};
export default AdminPanel;
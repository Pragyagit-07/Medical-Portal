import {useSelector } from "react-redux";
import "./Home.css";

const Home =() =>{
    const userSelector = useSelector((state) =>state.user);
    return(
        <div className="home-container">
            <h1>Welcome To Patient Management System</h1>
            <h3>
                {userSelector.username ? (
                    <p>
                      Welcome
                      <span style={ {color:"black",fontSize:"bold"}}>   {userSelector.username}         
                      </span>
                    </p>
                ) :(
                    <p>You are  not logged In </p>
                )}
            </h3>
            <div className="features">
                <div className="feature">
                    <h2>Patient Register </h2>
                    <p>Register New Patient System</p>
                    <a href="/registerpatient">Register Patient </a>
                </div>
                <div className="feature">
                    <h2> Search Patient </h2>
                    <p>View And Manage Patient Medical History</p>
                    <a href="/searchpatient">View Medical History </a>
                </div>
            {/* <div className="feature">
                    <h2> Search Doctor </h2>
                    <p>To Take Appointment </p>
                    <a href="/searchdoctor">Doctor Appointment </a>
                </div> */}
            </div>
        </div>
);
};
export default Home;
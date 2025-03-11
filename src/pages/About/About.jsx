import "./About.css";
import { useSelector } from "react-redux";


const About = () => {

    const userSelector = useSelector((state) => state.user);
    console.log(userSelector.username);


    return(
        <div className="about-container">
<h2>About</h2>
<p> we have best Doctors here you can book your appointment and visit</p>
<p> You can  cheackup you body in pathology .We have best machines here.Our doctors gave best advice.</p>
<p>The information contained in this website is for general information purposes only.</p>
    <p> The information and services is provided by the respective hospitals in association with NIC, DeitY, Govt.
      of India and while all stakeholders jointly endeavour to keep the information up-to-date and correct, 
      we make no representations or warranties of any kind, express or implied, about the completeness, accuracy,
       reliability, suitability or availability with respect to the website or the information, or services, or related reports, graphics contained on the website for any purpose. 
       Any reliance you place on such information or services is therefore strictly at your own risk.</p>
<p>In no event NIC will be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or services, profits arise out of or in connection with the use of this website and application software.
NIC have no control over the nature, content and availability of services mentioned in this website.
Every effort is made to keep the website up and running smoothly. However, NIC-DeitY takes no responsibility for and will not be liable for the website being temporarily unavailable due to technical issues beyond our control</p>
        </div>
    );
};
export default About;
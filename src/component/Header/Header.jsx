import { useEffect } from "react";
import { makeGETrequest } from "../../utils/api";
import "./Header.css";
import { Link } from "react-router-dom";
import { login, logout } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from  "react-redux";
import { isTokenExpired } from "../../utils/isTokenExpired.jsx";
import { jwtDecode } from "jwt-decode";
const Header = () =>{
    const dispatch= useDispatch();
    const userSelector = useSelector((state) => state.user );

    useEffect(()=>{
        if(localStorage.getItem("token")){
            const checkIfLoggedIn = async() =>{
                const res = await makeGETrequest(
                    "http://localhost:5000/users/checkifloggedin",
                    localStorage.getItem("token")

                );
                if(res.status === 200 && res.admin === true){
                    dispatch(login({
                        username : "admin",
                        admin: res.admin,
                        tokenexpiration: jwtDecode(localStorage.getItem("token")).exp,
                    })
                );
                }
                if(res.status === 200 && res.doctor === true){
                    dispatch(login({
                        idnumber: res.idnumber,
                        phone: res.phone,
                        email: res.email,
                        username: res.username,
                        doctor: res.doctor,
                        tokenexpiration: jwtDecode(localStorage.getItem("token")).
                exp,
                    })
                );
                }
                if(res.status === 200 && res.doctor === true){
                    dispatch(login({
                        idnumber: res.idnumber,
                        phone: res.phone,
                        email: res.email,
                        username: res.username,
                        doctor: res.doctor,
                        tokenexpiration: jwtDecode(localStorage.getItem("token")).
                   exp,
                    })
                );
                const dataUrl = `data:image/jpeg;base64, ${res.image}`;
                localStorage.setItem("image", dataUrl);
                }
            };
            checkIfLoggedIn();
        }
    },[dispatch, userSelector.username]);

function removeLocalStorageAndRedux(){
    //this will clea all localStorage data
    localStorage.clear();
    //We need to clear redux store too
    dispatch(logout());
}

function checkIfTokenExpired(){
if(isTokenExpired(localStorage.getItem("token"))){
    removeLocalStorageAndRedux();
}
}
return(
<header className="header">
    <navbar className="navbar">
        {/* Make sure logo.svg is inside public folder  */}
<img src="/logo.svg" className="App-logo" alt="logo" />
<ul className= "nav-menu">
    <li className= "nav-item">
        <Link to ="/" onClick= {checkIfTokenExpired} > Home  </Link>
    </li>
<li className="nav-item">  
<a href="/about" onClick= {checkIfTokenExpired}> About </a>
    </li> 
    
     <li className= "nav-item">
        <Link to="/searchpatient" onClick= {checkIfTokenExpired}> Search </Link>
    </li> 
    
    {userSelector.username && (
        <li className="nav-item">
        <Link to="/profile" onClick= {checkIfTokenExpired}>  Profile </Link>
    </li> 
    )}




{userSelector.username?(
    <li className="nav-item">
    <Link to="/" onClick= {removeLocalStorageAndRedux}>  Sign Out </Link>
</li> 
):(
    <li className="nav-item">
    <Link to="/signin">  SignIn </Link>
</li>   
)}

    </ul>
    </navbar>
</header>
);
}
export default Header;
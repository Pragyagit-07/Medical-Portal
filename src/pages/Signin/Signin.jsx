import { useState } from "react";
import CustomForm from "../../component/CustomForm/CustomForm";
import Button from "../../component/Button/Button";
import "./Signin.css";
import { makePOSTrequest } from "../../utils/api";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Signin = () => {
const[email, setEmail] = useState("");
const[password, setPassword] = useState( "");
const[message, setMessage] =  useState("");

const dispatch = useDispatch();
const navigate = useNavigate();

const submitData = async(e)=>{
    //this is a browser default when we use preventDefault in code .it stop refresh the sign in page.
    // we say don't refresh the browser page because we don't need.by using preventdefault function we don't 
   // need to refresh the page. we want the page not to refresh so that we continue processing the data such as
   //passing the data that enter that user enter to the backend so we don't want refresh the page if we do ,we really don't send the data back to 
   //backendsomething may go wrong.
e.preventDefault();
const res = await makePOSTrequest("http://localhost:5000/users/signin", {
        //if the key and value name same we can ommet the value.
email: email,
password:  password,
    });
    //save the token coming back from the backend only the status code is 200
    if(res.status === 200){
        localStorage.setItem("token", res.token);
        dispatch(login({ username: res.username }));

        setTimeout(() => {
            navigate("/");
        },2000);
    }

    setMessage(res.message);
};
return(
    <div className="signin-container">
    <CustomForm>
        <h2>Sign In</h2>
        <CustomForm.Email 
        value= {email} 
        onChange= {(e)=> setEmail(e.target.value)} />
        <CustomForm.Password 
        value= {password}
        onChange = {(e)=> setPassword(e.target.value)} />
            <Button onClick= {submitData} value= "Sign In" />
    </CustomForm>
    {  message }
    </div>
);
};
export default Signin;
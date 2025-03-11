import "./Button.css"
function  Button(props){
    return(
        <button 
        type="Submit" 
       className="custom-button" 
        onClick = {props.onClick}
        >{props.value}
         </button>
    );
}
export default Button;
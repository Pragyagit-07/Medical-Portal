import "./CustomForm.css"

export default function CustomForm(props) {
    return <form action= ""> {props.children}
    </form>;
}
CustomForm.IDNumber= function IDNumberfield(props){
    return (
    <input 
    type="number"
     name="Idnumber" 
    placeholder ="Id Number" 
    value= {props.value} 
    onChange ={props.onChange}
    />
);
};
CustomForm.Email= function Emailfield(props){
    return (
    <input 
    type="email"
     name="email" 
    placeholder ="Email Number" 
    value= {props.value} 
    onChange ={props.onChange}
    />
    );
};
CustomForm.UserName= function UserNamefield(props){
    return (
    <input 
    type="text"
     name="username" 
    placeholder ="FullName" 
    value= {props.value} 
    onChange ={props.onChange}
    />
    );
};
CustomForm.Password= function Passwordfield(props){
    return (
    <input 
    type= "Password"
     name= "password" 
    placeholder ="Password" 
    value= {props.value} 
    onChange ={props.onChange}
    />
    );
};
CustomForm.Address= function Addressfield(props){
    return (
    <input 
    type= "email"
     name= "address" 
    placeholder = "Address" 
    value= {props.value} 
    onChange = { props.onChange}
    />
    );
};
CustomForm.Phone= function Phonefield(props){
    return (
    <input 
    type="phone"
     name="contactnumber" 
    placeholder ="Phone" 
    value= {props.value} 
    onChange ={props.onChange}
    />
    );
};
CustomForm.MedicalRecord= function MedicalRecordfield(props){
    return (
    <textarea
    type= "text"
     name= "medicalrecord" 
     rows= {20}
    placeholder ="Enter a medical record" 
    style={{width: "100%"}}
    value= {props.value} 
    onChange ={props.onChange}
    />
    );
};
CustomForm.Image= function Imagefield(props){
    return (
    <input 
    type= "file"
    onChange ={props.onChange}
    />
    );
};
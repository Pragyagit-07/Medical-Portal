import { createSlice } from "@reduxjs/toolkit";


export const  userSlice = createSlice({
    name: "user",
    initialState: {
        tokenexpiration: "",
        idnumber: "",
        phone: "",
        email: "",
        username: "",
        doctor: false,
        admin: false,
    },
    /*A reducers is used to update the state.Just call its functions to update the state eg:  you want to
    update email call reducer,we can't  change redux store directly  , we need to use function defined in the reducer, call "login" 
     using "useDispatch" hook from a component when user need to update username , email .*/
    reducers: {
        login:(state, action)=>{
            console.log("from userslice", action.payload);
            const {
                idnumber, 
                phone,
                email, 
                username,
                doctor,
                admin, 
                tokenexpiration,
            } = action.payload;

            state.idnumber = idnumber;
            state.phone = phone;
            state.email = email;
            state.username = username;
            state.doctor = doctor;
            state.admin = admin;
            state.tokenexpiration = tokenexpiration;

        },
        logout:(state)=>{
            state.idnumber = "";
            state.phone = "";
            state.email = "";
            state.username = "";
            state.doctor = false;
            state.admin = false;
            state.tokenexpiration ="";
        },
    },
});

export const { login, logout } = userSlice.actions; 
export default userSlice.reducer;
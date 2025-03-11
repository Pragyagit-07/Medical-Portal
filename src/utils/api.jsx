import axios, { formToJSON } from "axios";
export const makeGETrequest = async (url, token = "" ) => {
   try{
     const response = await fetch(url, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`,
       "Content-Type": "application/json",
    },
  });
//response.json() method PARSES the JSON data from response body of a fetch API request and convert it into javascipt object.
const data = await response.json();
return data;
}catch(error){
  console.log("Error fetching Data:", error);
return error;
}
};
//async(url, data, token=" ") send some data to backend. We are talking makingPOSTrequest to backend it takes some time
export const  makePOSTrequest = async( url,  data,token = "") => {
    try{
const response = await fetch(url, {
   method: "POST",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
});
const responseData = await response.json();
console.log(responseData);
return responseData;
    }catch(error)
    {
console.log("Error posting data:", data);
return error;
    }
};
/*I use  axios instead of built-in fetch  function because, fetch has  problems
with sending  multiple form data  properly, axios works different  axios  works  different,
and the response  we get has response.data object in it which has properties like
messege,error,status. we get from the backend.
*/
export const makePostrequestForMultipleFormData = async(
    url,
    formData,
    token=""
) => {
        try{
            /* axios return a data object on the response and we extract it using destructing
            syntax below and data gives us data coming from backend. 
            */
const { data } = await axios.post( url, formData,{
headers:{
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",

},
});
console.log(data);
return data;
        }
        catch (error){
console.error("Error posting data: ", error);
//error.response.data gives us data from the backend
return error.response.data;
        }
};
import axios from "axios";

axios.defaults.withCredentials = true;

export const fetchData = async ()=>  {
    const { data } = await axios.get("https://online-shop-backend.maciejkloda.pl/api");
    return data;
}

export const getBestsellers = async ()=>  {
    const { data } = await axios.get("https://online-shop-backend.maciejkloda.pl/api/bestsellers");
    return data;
}


export const sendLoginInfo =  async ( loginData:object ) => {
    const { data } =  await axios.post("https://online-shop-backend.maciejkloda.pl/login", JSON.stringify(loginData), {headers:{"Content-Type": 'application/json'}});
    //const { data } = await axios.post("http://127.0.0.1:3001/login", JSON.stringify(loginData), {headers:{"Content-Type": 'application/json'}});
    return data;
}

 export const getNewToken = async () => {
    const { data } = await axios.get("https://online-shop-backend.maciejkloda.pl/refresh");
    return data;
 }

 export const logoutUser = async () => {
    const { data } = await axios.post("https://online-shop-backend.maciejkloda.pl/logout");
    //const data = await axios.post("http://127.0.0.1:3001/logout");
    return data;
 }

export const registerUser = async ( registerData:object) => {
    const { data } = await axios.post("https://online-shop-backend.maciejkloda.pl/register", JSON.stringify(registerData), {headers:{"Content-Type": 'application/json'}});
    return data;
}

export const getUserData = async ( id:string, token:string )=> {
    const { data } = await axios.post("https://online-shop-backend.maciejkloda.pl/user", {id}, {headers: {"Content-Type": 'application/json',Authorization: `Bearer ${token}`}});
    //const { data } = await axios.post("http://127.0.0.1:3001/user", {id},{headers:{"Content-Type": 'application/json'}});
    return data;
}
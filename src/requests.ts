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

export const getAggregatedData = async ( gender:object ) => {
    const { data } = await axios.post("https://online-shop-backend.maciejkloda.pl/api/gender", gender );
    return data;
}

export const getDataByName = async ( searchValue: string )  => {
    const { data } = await axios.post("https://online-shop-backend.maciejkloda.pl/api/search", { name:searchValue })
    return data;
}

export const getDataById = async ( id: string )  => {
    const { data } = await axios.get(`https://online-shop-backend.maciejkloda.pl/api/item/${id}`)
    return data;
}

export const sendLoginInfo =  async ( loginData:object ) => {
    const { data } =  await axios.post("https://online-shop-backend.maciejkloda.pl/login", JSON.stringify(loginData), {headers:{"Content-Type": 'application/json'}});
    return data;
}

 export const getNewToken = async () => {
    const { data } = await axios.get("https://online-shop-backend.maciejkloda.pl/refresh");
    return data;
 }

 export const logoutUser = async () => {
    const { data } = await axios.post("https://online-shop-backend.maciejkloda.pl/logout");
    return data;
 }

export const registerUser = async ( registerData:object) => {
    const { data } = await axios.post("https://online-shop-backend.maciejkloda.pl/register", JSON.stringify(registerData), {headers:{"Content-Type": 'application/json'}});
    return data;
}

export const getUserData = async ( id:string, token:string )=> {
    const { data } = await axios.post("https://online-shop-backend.maciejkloda.pl/user", { id }, {headers: {"Content-Type": 'application/json',Authorization: `Bearer ${token}`}});
    return data;
}

export const newsletterSingUp = async ( email:string )=> {
    const { data } = await axios.post("https://online-shop-backend.maciejkloda.pl/newsletter", { email }, {headers: {"Content-Type": 'application/json'}});
    return data;
}

export const updateUser = async (formData : FormData) => {
    const { data } = await axios.post("https://online-shop-backend.maciejkloda.pl/user/update", formData ,{headers: { 'Content-Type': 'multipart/form-data' }})
    return data;
}

export const resetPassword = async ( email : string) => {
    const { data } = await axios.post("https://online-shop-backend.maciejkloda.pl/api/reset-password");
    return data;
}
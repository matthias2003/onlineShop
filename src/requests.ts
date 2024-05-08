import axios from "axios";

export const fetchData = async ()=>  {
    const { data } = await axios.get("https://online-shop-backend.maciejkloda.pl/api");
    return data;
}

export const sendLoginInfo =  async ( loginData:object ) => {
     //const { data } =  await axios.post("https://online-shop-backend.maciejkloda.pl/login",JSON.stringify(loginData), {headers:{"Content-Type": 'application/json'}});
    const { data } = await axios.post("http://127.0.0.1:3001/login", JSON.stringify(loginData), {headers:{"Content-Type": 'application/json'}});
    return data;
}
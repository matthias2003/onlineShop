import axios from "axios";

export const fetchData = async ()=>  {
    const { data } = await axios.get("https://online-shop-backend.maciejkloda.pl/api");
    return data;
}

export const sendLoginInfo =  async ( data:object ) => {
    await axios.post("https://online-shop-backend.maciejkloda.pl/login", data);
    return "Data sent";
}
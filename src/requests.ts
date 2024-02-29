import axios from "axios";

export const fetchData = async ()=>  {
    const { data } = await axios.get("https://online-shop-backend.maciejkloda.pl/api");
    return data;
}

export const sendLoginInfo =  async ( data:object ) => {
    // await axios.post("https://online-shop-backend.maciejkloda.pl/login", data);
    const response = await axios.post("http://127.0.0.1:3001/login", JSON.stringify(data), {headers:{"Content-Type": 'application/json'}})
    console.log(response)
}
import axios from "axios";

export const getData = async () => {
    const  data  = axios.get("127.0.0.1:3001/api");
    console.log(data)
}

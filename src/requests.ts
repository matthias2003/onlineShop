import axios from "axios";

export const fetchData = async () =>  {
    const { data } = await axios.get("http://localhost:3001/api");
    return data;
}
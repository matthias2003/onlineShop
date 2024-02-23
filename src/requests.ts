import axios from "axios";

export const fetchData = async () =>  {
    const { data } = await axios.get("https://online-shop-backend.maciejkloda.pl/api");
    return data;
}
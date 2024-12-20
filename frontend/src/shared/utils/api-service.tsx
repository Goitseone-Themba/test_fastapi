import axios from "axios";
import { Item } from "./types";

const baseUri = "http://127.0.0.1:8000";

const fetchItems = async () => {
    const res = axios.get(`${baseUri}/items/`)
    return res;
}

const registerItem = async (newItem: Item) => {
    const res = axios.post(`${baseUri}/items/`, newItem);
    return res;
}

export { fetchItems, registerItem }

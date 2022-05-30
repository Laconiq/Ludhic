/*
*   Basé sur ce tutoriel :
*   https://www.bezkoder.com/react-crud-web-api/#Add_React_Router_to_React_CRUD_App
*/

import axios from "axios";
export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
});
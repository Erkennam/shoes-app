import React from "react";
import axios from "axios";

export const UseGetUser = ({email})=>{
    const [data,setdata] = React.useState();
    axios.get('http://localhost:4001/api/login',email)
    .then((resp)=>{
        setdata(resp.data);
    })
    .catch((err)=>{
        console.log('ошибка:',err);
    })
    return data;
}
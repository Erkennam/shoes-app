import React from "react";
import { useForm } from "react-hook-form";
import { user } from "./registrationPage.tsx";
import EastIcon from '@mui/icons-material/East';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setprofile,setauth } from "../slice.ts";

const AuthComponent:React.FC = ()=>{
    const {register,handleSubmit,reset} = useForm<user>();
    const dispatch = useDispatch();
    const submit = (data:user)=>{
        axios.post('http://localhost:4001/api/login',data)
        .then(response => {
            axios.get('http://localhost:4001/api/login', { params: { email: data.email } })
            .then(userData => {
                console.log(userData.data);
                dispatch(setprofile(userData.data));
            })
            .catch(error => {
                console.error('Ошибка при получении данных пользователя:', error);
            });
            alert(response.data.message);
            reset();
            dispatch(setauth());
        })
        .catch(error => {
            alert('Ошибка при авторизаций' + JSON.stringify(error.response.data.message));
            console.error('Ошибка при авторизаций', error.response.data);
        });
    }
    return(
        <div className="p-4 w-full border-2 border-[#ebedee] flex flex-col gap-6">
            <p className="text-3xl font-bold">ВОЙТИ</p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
                <input type="text" className="border-2 border-[#767677] w-full py-2 px-2" {...register('email',{required: 'это поле обязательно',pattern: {
                    message: 'Неверный формат email адреса',
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                }})} placeholder="Email"></input>
                <input type='text' className="border-2 border-[#767677] w-full py-2 px-2" {...register('password',{required: 'это поле обязательно', minLength:{
                    value: 4,
                    message: 'минимальное кол во символов 4',
                }})} placeholder="пароль"></input>
                <button className="w-full bg-black flex justify-between text-white p-3">
                    <p>ВОЙТИ</p>
                    <EastIcon></EastIcon>
                </button>
            </form>                       
        </div>
    )
}

export default AuthComponent;
import React from "react";
import { useForm } from "react-hook-form";
import Menu from "../mainPages/menu.tsx";
import CheckIcon from '@mui/icons-material/Check';
import EastIcon from '@mui/icons-material/East';
import { user } from "./registrationPage.tsx";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UseGetUser } from "../hooks/useGetUser.ts";
import { setauth,setprofile } from "../slice.ts";

const LoginPage:React.FC = ()=>{
    const {register,handleSubmit,reset} = useForm<user>();
    const dispatch = useDispatch();
    const nav = useNavigate();
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
            reset();
            dispatch(setauth());
            nav('/');
        })
        .catch(error => {
            alert('Ошибка при авторизаций' + JSON.stringify(error.response.data.message));
            console.error('Ошибка при авторизаций', error.response.data);
        });
    }
    return (
        <div className="flex flex-col gap-8">
            <Menu></Menu>
            <div className="w-full flex justify-center">
                <div className="w-3/4 flex justify-between">
                    <form className="w-2/4 flex flex-col gap-8" onSubmit={handleSubmit(submit)}>
                        <p className="text-3xl font-bold">ВОЙТИ</p>
                        <input type="text" {...register('email',{required: 'email пользователя обязателен', pattern: {
                            message: 'Неверный формат email адреса',
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        }})} placeholder="введите email" className="w-7/12 p-3 h-9 border-2 border-[#767677]"></input>
                        <input type="text" {...register('password',{required: 'пароль пользователя обязателен', minLength: {
                            value: 4,
                            message: 'минимальное кол во символов 4'
                        }})} placeholder="введите пароль" className="w-7/12 p-3 h-9 border-2 border-[#767677]"></input>
                        <button className="w-4/12 p-3 bg-black text-white">Войти</button>
                    </form>
                    <div className="w-2/4 flex flex-col gap-4 text-wrap">
                        <p className="text-3xl font-bold">СОЗДАТЬ АККАУНТ</p>
                        <p>Присоединяйся к программе лояльности ADIDAS UNIVERSE:</p>
                        <ul className="pl-4 flex flex-col gap-3">
                            <li><CheckIcon></CheckIcon> Собирай баллы и получай скидку до 20%, которой ты можешь воспользоваться как на сайте, так и в розничных магазина и дисконт-центрах</li>
                            <li><CheckIcon></CheckIcon> Получай специальные условия и дополнительные бонусы во время акций</li>
                            <li><CheckIcon></CheckIcon> Первым узнавай о специальных предложениях и сезонных распродажах</li>
                            <li><CheckIcon></CheckIcon> Присоединяйся к ADIDAS UNIVERSE прямо сейчас и начинай накапливать баллы и увеличивать свою персональную скидку. Открой для себя лучшее от adidas.</li>
                        </ul>
                        <button className="w-2/6 p-2 bg-black text-white flex gap-5" onClick={()=>{nav('/registration-page')}}>РЕГИСТРАЦИЯ <EastIcon></EastIcon></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
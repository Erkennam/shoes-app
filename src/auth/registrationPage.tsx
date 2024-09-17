import React from "react";
import Menu from "../mainPages/menu.tsx";
import { useForm } from "react-hook-form";
import axios from "axios";
import CheckIcon from '@mui/icons-material/Check';
export interface user {
    username: string,
    email: string,
    password: string,
}

const RegistrationPage:React.FC = ()=>{
    const {register,handleSubmit} = useForm<user>();
    const [message,setmessage] = React.useState<string>('');
    const submit = (data:user)=>{
        axios.post('http://localhost:4001/api/register', data)
        .then(response => {
            alert('Пользователь успешно зарегистрирован:' + response.data.message);
            console.log('Пользователь успешно зарегистрирован:', response.data.message);
        })
        .catch(error => {
            alert('Ошибка при регистрации пользователя:' + error.response.data.message);
            console.error('Ошибка при регистрации пользователя:', error.response.data);
        });
    }
    return(
        <div className="w-full flex flex-col gap-10">
            <Menu></Menu>
            <div className="w-full flex justify-center">
                <div className="w-3/4 flex justify-between">
                    <form onSubmit={handleSubmit(submit)} className="w-2/4 flex flex-col gap-8">
                        <p className="text-3xl font-bold">РЕГИСТРАЦИЯ</p>
                        <input type="text" {...register('username',{required: 'имя пользователя обязателен', minLength: {
                            value: 4,
                            message: 'минимальное кол во символов 4'
                        }})} placeholder="введите имя" className="w-7/12 p-3 h-9 border-2 border-[#767677]"></input>
                        <input type="text" {...register('email',{required: 'email пользователя обязателен', pattern: {
                            message: 'Неверный формат email адреса',
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        }})} placeholder="введите email" className="w-7/12 p-3 h-9 border-2 border-[#767677]"></input>
                        <input type="text" {...register('password',{required: 'пароль пользователя обязателен', minLength: {
                            value: 4,
                            message: 'минимальное кол во символов 4'
                        }})} placeholder="введите пароль" className="w-7/12 p-3 h-9 border-2 border-[#767677]"></input>
                        <button className="w-4/12 p-3 bg-black text-white">регистрация</button>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage;
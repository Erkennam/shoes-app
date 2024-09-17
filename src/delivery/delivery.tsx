import React from "react";
import Menu from "../mainPages/menu.tsx";
import { citiesKazakhstan,delivery,deliveryOptions,streetsOfCities } from "./deliveryOption.ts";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import CartResult from "../cart/cartResult.tsx";
import AuthComponent from "../auth/authComponent.tsx";
import EastIcon from '@mui/icons-material/East';
import { useNavigate } from "react-router-dom";
interface deliveryProd {
    city: string,
    name: string,
    surname: string,
    address: string,
    type: delivery,
}

const Delivery:React.FC = ()=>{
    const [num,setnum] = React.useState(0);
    const {auth} = useSelector(({slice}:any)=> slice);
    const {register,handleSubmit} = useForm<deliveryProd>();
    const nav = useNavigate();
    const submit = (data:deliveryProd)=>{
        const deliveryInfo = {...data,type: deliveryOptions[num]};
        console.log(deliveryInfo.type);
        nav('/payement');
    }
    return(
        <div className="w-full flex flex-col gap-12">
            <Menu></Menu>
            <div className="w-full flex justify-center">
                <div className="w-3/4 flex flex-col gap-8">
                    <h1 className="text-4xl font-bold">Доставка</h1>
                    <div className="w-full flex gap-14">
                        <div className="w-8/12 flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <p>город</p>
                                <select className="w-full p-2 border-2 border-[#767677]" {...register('city')}>{citiesKazakhstan.map((el:string)=>{
                                    return (
                                        <option>{el}</option>
                                    )
                                })}</select>
                            </div>
                            <p>Цена и срок доставки зависят от способа доставки. На следующем шаге ты сможешь уточнить эту информацию.</p>
                            <div className="flex flex-col gap-4">
                                {deliveryOptions.map((el:delivery,i:number)=>{
                                    return(
                                        <div onClick={()=>{setnum(i)}} className={`w-full flex justify-between border-2 ${num == i ? 'border-black' : 'border-[#ebedee]'} p-4`}>
                                            <div>
                                                <p className="font-semibold">{el.type}</p>
                                                <p>{el.freeShippingThreshold}</p>
                                            </div>
                                            <p>{el.price},00 ₸</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit(submit)}>
                                <p className="text-4xl font-bold">Адрес доставки</p>
                                <div className="w-full flex justify-between gap-6">
                                    <input className="border-2 border-[#767677] w-full py-2 px-2" {...register('name',{required: 'данное поле обязательное',minLength:{
                                        message: 'минимальное кол-во символов 3',
                                        value: 3,
                                    }})} type="text" placeholder="имя"></input>
                                    <input className="border-2 border-[#767677] w-full py-2 px-2" {...register('surname',{required: 'данное поле обязательно',minLength:{
                                        message: 'минимальное кол-во символов 3',
                                        value: 3,
                                    }})} type="text" placeholder="фамилия"></input>
                                </div>
                                <select {...register('address')} className="w-full p-2 border-2 border-[#767677]">{streetsOfCities.map((el)=>{
                                    return(
                                        <option>{el}</option>
                                    )
                                })}</select>
                                <button className="w-2/4 flex justify-between items-center p-3 bg-black text-white">
                                    <p className="text-lg">Продолжить оформление</p>
                                    <EastIcon></EastIcon>
                                </button>
                            </form>
                        </div>
                        <div className="w-4/12 flex flex-col gap-6">
                            {!auth && <AuthComponent></AuthComponent>}
                            <CartResult ></CartResult>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Delivery;
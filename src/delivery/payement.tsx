import React from "react";
import Menu from "../mainPages/menu.tsx";
import { payements } from "./deliveryOption.ts";
import { useSelector } from "react-redux";
import PaidIcon from '@mui/icons-material/Paid';
import { FinallySum } from "../cart/cartResult.tsx";
import EastIcon from '@mui/icons-material/East';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Payement:React.FC = ()=>{
    const [method,setmethod] = React.useState(1);
    const sum = FinallySum();
    const {auth,profile,cart} = useSelector(({slice}:any)=> slice);
    const nav = useNavigate();
    const submit = ()=>{
        if(!auth){
            return alert('вы не авторизованы')
        }
        const data = {
            id: 2,
            username: profile.username,
            email: profile.email,
            order: cart,
            price: sum,
        }
        axios.post('http://localhost:4001/api/Orders',data)
        .then((resp)=>{
            console.log(resp.data.message);
        }).catch((err)=>{
            console.log(err.message);
        })
        nav('/success')
    }
    return(
        <div className="w-full flex flex-col gap-12">
            <Menu></Menu>
            <div className="w-full flex flex-col items-center gap-8">
                <div className="w-3/4 flex gap-14">
                    <div className="w-8/12 flex flex-col gap-6">
                        <h1 className="text-3xl font-bold">Оплата и подтверждение заказа</h1>
                        <p>Выбери удобный способ оплаты</p>
                        <div className="w-full border-y-2 border-[#767677] py-2 flex flex-col">
                            <div onClick={()=>{setmethod(1)}}  className="w-full border-b-2 border-dotted flex flex-col gap-4 border-black py-4">
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex gap-4">
                                        <div className={`w-6 h-6 border-4 border-white outline ${method == 1 && 'bg-black'} rounded-full`}></div>
                                        <p>Оплатить картой на сайте онлайн</p>
                                    </div>
                                    <div className="flex gap-4">{payements.map((el)=>{
                                        return(
                                            <img src={el} className="h-6 w-16 object-contain"></img>
                                        )
                                    })}</div>
                                </div>
                                {method == 1 && <div className="flex flex-col gap-3 px-4">
                                    <p>Обрати внимание: не забудь проверить лимит на онлайн-покупки в мобильном приложении твоего банка</p>
                                    <button onClick={submit} className="w-1/3 bg-black text-white py-3 px-4 flex justify-between">
                                        {sum},00 ₸
                                        <EastIcon></EastIcon>
                                    </button>
                                </div>}
                            </div>
                            <div onClick={()=>{setmethod(2)}}  className="w-full border-b-2 flex flex-col gap-4 border-dotted border-black py-4">
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex gap-4">
                                        <div className={`w-6 h-6 border-4 border-white outline ${method == 2 && 'bg-black'} rounded-full`}></div>
                                        <p>Оплатить на kaspi qr</p>
                                    </div>
                                    <img src="https://avatars.mds.yandex.net/i?id=46e684d17ef00860cd9103d570d848fc0be7b40e-11446590-images-thumbs&n=13" className="h-6 w-16 object-cover"></img>
                                </div>
                                {method == 2 && <div className="flex flex-col gap-3 px-4">
                                    <p>Обрати внимание: не забудь проверить лимит на онлайн-покупки в мобильном приложении твоего банка</p>
                                    <button onClick={submit} className="w-1/3 bg-black text-white py-3 px-4 flex justify-between">
                                        {sum},00 ₸
                                        <EastIcon></EastIcon>
                                    </button>
                                </div>}
                            </div> 
                            <div onClick={()=>{setmethod(3)}}  className="w-full border-b-2 border-dotted flex flex-col gap-6 border-black py-4">
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex gap-4">
                                        <div className={`w-6 h-6 border-4 border-white outline ${method == 3 && 'bg-black'} rounded-full`}></div>
                                        <p>Оплатить рассрочкой 0-0-4</p>
                                    </div>
                                    <p className="text-lg">0-0-4</p>
                                </div>
                                {method == 3 && <div className="flex flex-col gap-6 px-4">
                                    <p>Количество платежей: 4</p>
                                    <p>Ежемесячный платеж: {sum / 4}</p>
                                    <button onClick={submit} className="w-1/3 bg-black text-white py-3 px-4 flex justify-between">
                                        <p>Купить в рассрочку</p>
                                        <EastIcon></EastIcon>
                                    </button>
                                </div>}
                            </div>
                            <div onClick={()=>{setmethod(4)}}  className="w-full py-4 flex flex-col gap-4">
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex gap-4">
                                        <div className={`w-6 h-6 border-4 border-white outline ${method == 4 && 'bg-black'} rounded-full`}></div>
                                        <p>Оплатить при получении</p>
                                    </div>
                                    <PaidIcon></PaidIcon>
                                </div>
                                {method == 4 && <div className="flex flex-col gap-3 px-4">
                                    <p>оплата производится после получения товара</p>
                                </div>}
                            </div>
                        </div>
                        {method == 4 &&  <button onClick={submit} className="bg-black w-1/2 text-white flex justify-between p-3">
                            <p>ПОДТВЕРДИТЬ ЗАКАЗ</p>
                            <EastIcon></EastIcon>
                        </button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payement;
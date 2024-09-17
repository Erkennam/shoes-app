import React from "react";
import Menu from "../mainPages/menu.tsx";
import { useSelector } from "react-redux";
import { cartProd } from "../hooks/useGetShoes.ts";
import { useNavigate } from "react-router-dom";
import EastIcon from '@mui/icons-material/East';
import CartComponent from "./cartComponent.tsx";
import CartResult from "./cartResult.tsx";
import { payements } from "../delivery/deliveryOption.ts";

const CartPage:React.FC = ()=>{
    const cart = useSelector((state:any)=> state.slice.cart);
    const nav = useNavigate();
    const sum = cart.reduce((acc:number,el:cartProd)=> acc + (el.price * el.count),0);
    const finalSum = sum > 50000 ? sum - 3750 : (sum - 3750) + 5000;
    return(
        <div className="flex flex-col w-full gap-12">
            <Menu></Menu>
            <div className="w-full flex justify-center">
                <div className="w-3/4 flex flex-col gap-6">
                    <h1 className="text-4xl font-bold">КОРЗИНА</h1>
                    <div className="w-full flex gap-14">
                        <div className="w-4/6 flex flex-col gap-6">
                            <p>ВСЕГО ({cart.length} товар {finalSum},00 ₸)</p>
                            <div className="w-full bg-[#ebedee] p-4">
                                • Бесплатная доставка заказов на сумму от 50 000 ₸ <br></br>
                                • Доставка по Республике Казахстан службами Казпочта, DPD и DHL
                            </div>
                            {cart.length > 0 ?<div className="flex flex-col gap-4">{cart.map((el:cartProd,ind:number)=>{
                                return(
                                    <CartComponent prod={el} cart={cart} index={ind}></CartComponent>
                                )
                            })}</div> : <p>ваша корзина пуста</p>}
                            
                        </div>
                        <div className="w-2/6 flex flex-col gap-6">
                            <button onClick={()=>{cart.length > 0 ? nav('/delivery') : alert('ваша корзина пуста')}} className="w-full flex justify-between bg-black text-white p-4 uppercase font-semibold duration-300 transition hover:text-gray-500">
                                <p>Оформить</p>
                                <EastIcon></EastIcon>
                            </button>
                            <CartResult></CartResult>
                            <div className="w-full flex flex-col gap-4">
                                <p className="font-semibold">МЕТОДЫ ОПЛАТЫ</p>
                                <div className="w-full flex justify-between gap-3">
                                    {payements.map((el)=>{
                                        return (
                                            <img src={el} className="w-1/5 h-9 object-contain"></img>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage;
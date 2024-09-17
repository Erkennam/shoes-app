import React from "react";
import { useSelector } from "react-redux";
import { cartProd } from "../hooks/useGetShoes";

const CartResult:React.FC = ()=>{
    const cart = useSelector((state:any)=> state.slice.cart);
    const sum = cart.reduce((acc:number,el:cartProd)=> acc + (el.price * el.count),0);
    const finalSum = sum > 50000 ? sum - 3750 : (sum - 3750) + 5000;
    return(
        <div className="w-full p-3 border-2 flex flex-col gap-2 border-[#ebedee]">
            <p className="text-lg font-bold">ТВОЙ ЗАКАЗ</p>
            <div className="w-full flex justify-between text-sm">
                <p>{cart.length} ТОВАР</p>
                <p>{sum},00 ₸</p>
            </div>
            <div className="w-full flex justify-between text-sm">
                <p>ДОСТАВКА</p>
                <p>{sum > 50000 ? 'БЕСПЛАТНО' : '-5 000,00 ₸'}</p>
            </div>
            <div className="w-full flex justify-between text-sm">
                <p>PAYMENT ONLINE</p>
                <p>-3 750,00 ₸</p>
            </div>
            <div className="w-full flex justify-between text-sm">
                <p className="font-semibold">ИТОГО</p>
                <p>{finalSum},00 ₸</p>
            </div>
        </div>
    )
}

export const FinallySum = ()=>{
    const cart = useSelector((state: any) => state.slice.cart);
    const sum = cart.reduce((acc: number, el: cartProd) => acc + (el.price * el.count), 0);
    const finalSum = sum > 50000 ? sum - 3750 : (sum - 3750) + 5000;
    return finalSum;
}
export default CartResult;
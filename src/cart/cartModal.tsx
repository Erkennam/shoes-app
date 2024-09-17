import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartProd } from "../hooks/useGetShoes.ts";
import { changeCartModal } from "../slice.ts";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CartModal:React.FC = ()=>{
    const dispatch = useDispatch();
    const {added,cart} = useSelector(({slice}:any)=> slice);
    const sum = cart.reduce((acc:number,el:cartProd)=> acc + el.price,0);
    const nav = useNavigate();
    const openCart = ()=>{
        dispatch(changeCartModal(false));
        nav('/cart');
    }
    return(
        <div className="w-6/12 h-3/6 p-4 bg-white flex flex-col gap-8">
            <div className="w-full flex justify-between items-center">
                <p className="text-2xl font-bold">ДОБАВЛЕНО В КОРЗИНУ</p>
                <button onClick={()=>{dispatch(changeCartModal(false))}}><CloseIcon></CloseIcon></button>
            </div>
            <div className="flex w-full gap-6">
                <div className="w-1/2 flex gap-4">
                    <img className="w-3/5 h-4/5" src={added.images[0]}></img>
                    <div className="flex flex-col gap-4">
                        <p>{added.name}</p>
                        <div className="">
                            <p className="font-semibold">{added.price},00 ₸</p>
                            <p className="text-sm">Размер: {added.size}</p>
                            <p className="text-sm">Кол-во: {added.count}</p>
                            <p className="text-sm">коллекция: {added.category}</p>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-full border-l-2 border-black flex flex-col gap-2 pl-4">
                    <p className="font-semibold text-xl">КОРЗИНА</p>
                    <div className="flex flex-col text-sm">
                        <p>Всего товаров: {cart.length}</p>
                        <div className="w-full flex justify-between pb-2 border-b-2 border-black">
                            <p>Стоимость товаров: </p>
                            <p>{sum},00 ₸</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="w-full flex justify-between pt-1 font-semibold">
                                <p className="text-lg">Общая сумма:</p>
                                <p className="text-lg">{sum},00 ₸</p>
                            </div>
                            <button onClick={openCart} className="bg-black w-full text-white flex justify-between items-center p-2 pr-6 pl-6 duration-300 transition hover:text-gray-400">
                                <p className="text-lg">Смотреть корзину</p>
                                <ArrowForwardIcon className="w-18"></ArrowForwardIcon>
                            </button>
                            <button className="bg-white w-full text-black flex justify-between items-center p-2 border-2 border-black pr-6 pl-6 duration-300 transition hover:text-gray-400">
                                <p className="text-lg">Оформить заказ</p>
                                <ArrowForwardIcon className="w-18"></ArrowForwardIcon>
                            </button>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartModal;
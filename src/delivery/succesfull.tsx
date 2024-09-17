import React from "react";
import Menu from "../mainPages/menu.tsx";
import { useNavigate } from "react-router-dom";

const Succesfull:React.FC = ()=>{
    const nav = useNavigate();
    return(
        <div className="flex flex-col w-full gap-12">
            <Menu></Menu>
            <div className="w-full flex justify-center">
                <div className="w-3/4 flex flex-col gap-4">
                    <p className="text-4xl font-bold">Заказ оформлен</p>
                    <p>заказ оформлен и придет через какое то время</p>
                    <button className="bg-black text-xl text-white py-3 px-4 w-1/4" onClick={()=>{nav('/')}}>завершить</button>
                </div>
            </div>
        </div>
    )
}

export default Succesfull;
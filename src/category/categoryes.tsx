import React from "react";
import { useNavigate } from "react-router-dom";

const Categoryes:React.FC = ()=>{
    const nav = useNavigate();
    return (
        <div className="w-3/4 flex flex-col gap-6">
            <p className="text-2xl font-bold">ДЛЯ КОГО ВЫБИРАЕШЬ?</p>
            <div className="w-full flex gap-4">
                <div onClick={()=>{nav('/collection-page/zhenshhiny')}} style={{height: '50vh'}} className="w-1/2 bg-cover bg-[url(https://media.adidas.kz/e494e73dbcfe36349c510368d5df7639/12/9a85c12a21b76392747906fc7b2aff92/65004457590cc/90d1.jpg)]">
                    <div className="w-full h-full bg-black bg-opacity-40 text-white flex justify-center items-center">
                        <p className="text-xl font-semibold">ЖЕНЩИНЫ</p>
                    </div>
                </div>
                <div onClick={()=>{nav('/collection-page/muzhchiny')}} style={{height: '50vh'}} className="w-1/2 bg-cover bg-[url(https://media.adidas.kz/e494e73dbcfe36349c510368d5df7639/15/84d2004bf28a2095230e8e14993d398d/6503f6e5a4ebb/4ebe.jpg)]">
                    <div className="w-full h-full bg-black bg-opacity-40 text-white flex justify-center items-center">
                        <p className="text-xl font-semibold">МУЖЧИНЫ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categoryes;
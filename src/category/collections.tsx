import React from "react";
import { useNavigate } from "react-router-dom";
export const shoeModels = [
    "SAMBA",
    "GAZELLE",
    "SUPERSTAR",
    "STAN SMITH",
    "OZWEEGO",
    "FORUM"
];

const Collections:React.FC = ()=>{
    const nav = useNavigate();
    return(
        <div className="flex flex-col items-center gap-6">
            <p className="text-2xl font-bold">ПОПУЛЯРНО СЕЙЧАС</p>
            <div className="flex gap-3">
                {shoeModels.map((el)=>{
                    return(
                        <div className="py-2 px-4 border-2 border-black hover:opacity-70" onClick={()=>{nav(`/collection-page/${el}`)}}>{el}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default Collections;

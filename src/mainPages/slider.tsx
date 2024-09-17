import React from "react";
import { Shoe, useGetShoes } from "../hooks/useGetShoes.ts";
import ProductCard from "./product-card.tsx";

const Slider:React.FC = ()=>{
    const shoes = useGetShoes();
    const [num,setnum] = React.useState(1);
    const slice = (x:number)=>{
        return shoes.slice((x-1) * 4, x * 4);
    }
    const current = slice(num);
    return(
        <div className="w-4/5 flex flex-col gap-8">
            <div className="w-full flex justify-between gap-8 flex-wrap">
                {current.map((el:Shoe)=>{
                    return (
                        <ProductCard product={el}></ProductCard>
                    )
                })}
            </div>
            <div className="w-full flex justify-center gap-5">
                {Array.from({length: shoes.length / 4},(_,i)=> i + 1).map((el)=>{
                    return (
                        <div onClick={()=>{setnum(el)}} className={`${el === num ? 'border-b-4 border-black' : 'border-b-2 border-black'} px-3`}></div>
                    )
                })}
            </div>
        </div>
    )
}

export default Slider;
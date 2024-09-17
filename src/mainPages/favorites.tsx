import React from "react";
import Menu from "./menu.tsx";
import { useSelector } from "react-redux";
import { Shoe } from "../hooks/useGetShoes.ts";
import ProductCard from "./product-card.tsx";

const Favorites:React.FC = ()=>{
    const favorites = useSelector((state:any)=> state.slice.favorites);
    return (
        <div className="flex flex-col w-full gap-12">
            <Menu></Menu>
            <div className="w-full flex justify-center">
                <div className="w-4/5 flex flex-col gap-6">
                    <p className="text-2xl font-bold uppercase">избранные товары</p>
                    {favorites.length > 0 && <p className="text-xl">{favorites.length} Понравившиеся модели</p>}
                    {favorites.length > 0 ? <div className="w-full flex justify-between gap-8 flex-wrap">{favorites.map((el:Shoe)=>{
                        return (
                            <ProductCard product={el}></ProductCard>
                        )
                    })}</div> : <p className="text-xl">у вас нету избранных товаров</p>}
                </div>
            </div>
        </div>
    )
}

export default Favorites;
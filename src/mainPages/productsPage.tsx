import React, { useState } from "react";
import Menu from "./menu.tsx";
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import TuneIcon from '@mui/icons-material/Tune';
import { useDispatch,useSelector } from "react-redux";
import { useDebounce } from "../hooks/useDebaunce.ts";
import { useNavigate } from "react-router-dom";
import { Shoe, useGetShoes } from "../hooks/useGetShoes.ts";
import { setfiltermodal } from "../slice.ts";
import { useFilters } from "../hooks/useFilters.ts";
import ProductCard from "./product-card.tsx";

const ProductsPage:React.FC = ()=>{
    const products = useGetShoes();
    const shoes = useFilters(products);
    const dispatch = useDispatch();
    const searchValue = useSelector((state:any)=> state.slice.searchValue);
    const [search,setsearch] = useState(searchValue);
    const nav = useNavigate();
    const filter = shoes.filter((el:Shoe)=> el.name.toLowerCase().includes(search.toLocaleLowerCase()));
    const setDebounce = useDebounce((val:string)=>{setsearch(val)},100);
    return(
        <div className="flex flex-col gap-6">
            <Menu></Menu>
            <div className="w-full flex flex-col gap-8 items-center">
                <div className="w-4/5 flex flex-col gap-10">
                    <div className="w-full flex justify-between">
                        <button className="flex gap-2 items-center" onClick={()=>{nav('/')}}>
                            <TurnLeftIcon></TurnLeftIcon> 
                            <p className="border-b-2 border-black">назад</p>
                        </button>
                        <p className="text-3xl">ВСЕ ТОВАРЫ</p>
                    </div>
                    <div className="w-full flex justify-between">
                        <input type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setDebounce(e.target.value)}} value={search} className="p-2 h-9 bg-[#ebedee]" placeholder="поиск товаров"></input>
                        <button className="py-2 px-4 border-2 border-black flex gap-4" onClick={()=>{dispatch(setfiltermodal())}}>ФИЛЬТР <TuneIcon></TuneIcon></button>
                    </div>
                    <div className="w-full flex gap-105 flex-wrap">
                        {filter.map((el)=>{
                            return(
                                <ProductCard product={el}></ProductCard>              
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsPage;
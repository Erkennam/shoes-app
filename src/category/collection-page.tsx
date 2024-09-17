import React from "react";
import { useParams } from "react-router-dom";
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import { useDebounce } from '../hooks/useDebaunce.ts';
import Menu from "../mainPages/menu.tsx";
import { useDispatch } from "react-redux";
import TuneIcon from '@mui/icons-material/Tune';
import { useNavigate } from "react-router-dom";
import { Shoe, useGetShoes } from "../hooks/useGetShoes.ts";
import { setfiltermodal } from "../slice.ts";
import ProductCard from "../mainPages/product-card.tsx";
import { useFilters } from "../hooks/useFilters.ts";
export let typeObject = {
    zhenshhiny: 'Женщины',
    muzhchiny: 'Мужчины',
}

const CollectionPage = ()=>{
    const {collection}:{[key:string]:string | any} = useParams();
    const nav = useNavigate();
    const dispatch = useDispatch();
    const products = useGetShoes();
    const shoes = useFilters(products)
    const [search,setsearch] = React.useState('');
    const parametrFilter = (prod:Shoe,filt:string)=>{
        if(typeObject[collection]){
            return prod.type == typeObject[collection]; 
        } else {
            return prod.name.toLocaleLowerCase().includes(filt?.toLocaleLowerCase());
        }
    }
    const collectionsShoes = shoes.filter((el:Shoe)=> parametrFilter(el,collection));
    const filter = collectionsShoes.filter((el:Shoe)=> parametrFilter(el,search));
    const setDebounce = useDebounce((val:string)=>{setsearch(val)},100);
    return(
        <div className="flex flex-col gap-8">
            <Menu></Menu>
            <div className="flex justify-center">
                <div className="w-4/5 flex flex-col gap-10">
                    <div className="w-full flex justify-between">
                        <button className="flex gap-2 items-center" onClick={()=>{nav('/')}}>
                                <TurnLeftIcon></TurnLeftIcon> 
                                <p className="border-b-2 border-black">назад</p>
                        </button>
                        <p className="text-3xl">Обувь {typeObject[collection] ? typeObject[collection] : collection}</p>
                    </div>
                    <div className="w-full flex justify-between">
                        <input type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setDebounce(e.target.value)}} value={search} className="p-2 h-9 bg-[#ebedee]" placeholder="поиск товаров"></input>
                        <button onClick={()=>{dispatch(setfiltermodal())}} className="py-2 px-4 border-2 border-black flex gap-4">ФИЛЬТР <TuneIcon></TuneIcon></button>
                    </div>
                    {filter.length !=0 ? <div className="w-full flex gap-105 flex-wrap">{filter.map((el:Shoe)=>{
                        return(
                            <ProductCard product={el}></ProductCard>
                        )
                    })}</div> : <p>ничего не найдено</p>}
                </div>
            </div>
        </div>
    )
}

export default CollectionPage;
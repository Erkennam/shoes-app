import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import EastIcon from '@mui/icons-material/East';
import FilterComponent from "./filtercomponent.tsx";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setfiltermodal } from "../slice.ts";
import { shoeModels } from "../category/collections.tsx";
import { typeObject } from "../category/collection-page.tsx";
export interface filters {
    name:string,
    options: string[],
    key: string
}
export interface filter {
    brand: string;
    price: string;
    sort: string;
    type: string;
}

const FilterModal:React.FC = ()=>{
    const dispatch = useDispatch();
    const location = useLocation().pathname;
    let collection = location.split('/')[2];;
    const filterproperty:filters[] | any = [
        { name: "СОРТИРОВАТЬ", options: ["ЦЕНА ПО УМОЛЧАНИЮ","ЦЕНА ПО ВОЗРАСТАНИЮ", "ЦЕНА ПО УБЫВАНИЮ"] , key: 'sort'},
        { name: "ЦЕНА", options: ['Все',"50000 - 79999", "80000 - 99999", "от 100000"] , key: 'price'},
        { name: "ПОЛ", options: ["Все", "Женщины", "Мужчины"] , key: 'type'},
        { name: "БРЕНД", options: ["SAMBA","GAZELLE","SUPERSTAR","STAN SMITH","OZWEEGO","FORUM",'DROP STEP','STREETBALL III'] , key: 'brand'},
    ];
    const filters: filters[] = filterproperty.filter((el)=>{
        if(el.options.includes(collection) || el.options.includes(typeObject[collection])){
            return false;
        } 
        return true;
    });

    return(
        <div className="h-full w-30 bg-white absolute right-0 overflow-auto scrollbar-hide">
            <div className="text-lg w-full p-4 flex justify-between border-b-2 border-[#ebedee] bg-white sticky top-0">
                <p>ФИЛЬТР</p>
                <button onClick={()=>{dispatch(setfiltermodal())}}><CloseIcon></CloseIcon></button>
            </div>
            <div>{filters.map((el)=>{
                return(
                    <FilterComponent filters={el}></FilterComponent>
                )
            })}
            </div>
        </div>
    )
}

export default FilterModal;
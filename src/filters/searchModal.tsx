import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch,useSelector } from "react-redux";
import { useDebounce } from "../hooks/useDebaunce.ts";
import { setSearchModal,setSearch } from "../slice.ts";
import { Shoe, useGetShoes } from "../hooks/useGetShoes.ts";
import SearchProduct from "./searchProduct.tsx";
import { useNavigate } from "react-router-dom";

const SearchModal:React.FC = ()=>{
    const dispatch = useDispatch();
    const shoes:Shoe[] = useGetShoes();
    const nav = useNavigate();
    const [search,setsearch] = React.useState<string>('');
    const searchedProducts = shoes.filter((el:Shoe)=> el.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).slice(0,4);
    const searchDebouncing = useDebounce((val:string) => setsearch(val),100);
    const openProductsPage = ()=>{
        dispatch(setSearch(search));
        dispatch(setSearchModal());
        nav('/products-page');
    }
    return(
        <div className="w-3/6 h-3/5 bg-white p-5 flex flex-col gap-6 absolute top-0 overflow-auto">
            <div className="w-full flex justify-between">
                <p className="text-2xl font-semibold">поиск товаров</p>
                <button onClick={()=>{dispatch(setSearchModal())}}><CloseIcon></CloseIcon></button>
            </div>
            <div className="w-full flex justify-between">
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{searchDebouncing(e.target.value)}} value={search} className="w-4/12 bg-[#ebedee] p-2 outline-none" type="text" placeholder="поиск товаров"></input>
                {search && <p>найдено товаров: {searchedProducts.length}</p>}
            </div>
            {searchedProducts.length > 0 ? <div className="w-full flex justify-between flex-wrap">{searchedProducts.map((el)=>{
                return(
                    <SearchProduct product={el}></SearchProduct>
                )
            })}</div> : <p>ничего не найдено</p>}
            {search && <p className="underline" onClick={openProductsPage}>смотреть все '{search}'</p>}
        </div>
    )
}

export default SearchModal;
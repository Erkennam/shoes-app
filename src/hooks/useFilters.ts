import { useSelector } from "react-redux";
import { Shoe } from "./useGetShoes";

export const useFilters = (products:Shoe[])=>{
    const {filterParams} = useSelector(({slice}:any)=> slice);
    let copy = [...products];
    let sort = copy.sort((a:any,b:any)=>{
        if(filterParams.sort == "ЦЕНА ПО ВОЗРАСТАНИЮ"){
            return a.price - b.price;
        } else if (filterParams.sort == "ЦЕНА ПО УБЫВАНИЮ"){
            return b.price - a.price;
        } else {
            return 0;
        }
    });
    let priceFilt = sort.filter((el:Shoe)=>{
        if(filterParams.price === 'Все'){
            return true;
        } else if(filterParams.price == '50000 - 79999'){
            return el.price > 50000 && el.price < 79999;
        } else if(filterParams.price == '80000 - 99999'){
            return el.price > 80000 && el.price < 99999;
        } else if(filterParams.price == "от 100000") {
            return el.price > 100000;
        }  else {
            return false;
        }
    });
    let typeFilt = priceFilt.filter((el:Shoe)=>{
        if(filterParams.type == 'Все'){
            return true;
        }
        return el.type == filterParams.type;
    });
    let brandFilters = typeFilt.filter((el)=>{
        let {brand} = filterParams;
        if(brand.length == 0){
            return true;
        }
        return brand.some(item => el.name.toLowerCase().includes(item.toLowerCase()));
    })
    return brandFilters;
}
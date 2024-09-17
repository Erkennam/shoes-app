import { Shoe } from "./useGetShoes.ts";
import { useSelector,useDispatch } from "react-redux";
import { setFavorites,deleteFromFavorites } from "../slice.ts";

export const useSetFavorites = (product:Shoe | undefined | null)=>{
    const favorites = useSelector((state:any)=> state.slice.favorites);
    const dispatch = useDispatch();
    const find = favorites.find((el)=> el._id == product?._id);
    const changeFavrites = ()=>{
        if(!find){
            dispatch(setFavorites(product));
        } else {
            dispatch(deleteFromFavorites(product));
        }
    }
    return {find,changeFavrites};
}
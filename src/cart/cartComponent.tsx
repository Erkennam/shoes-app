import React from "react";
import { Shoe, cartProd } from "../hooks/useGetShoes.ts";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch,useSelector } from "react-redux";
import { deleteFromCart, setcart,setFavorites,deleteFromFavorites } from "../slice.ts";
import { useDebounce } from "../hooks/useDebaunce.ts";
import { useSetFavorites } from "../hooks/useSetFavorites.ts";
interface props {
    prod: cartProd,
    cart: cartProd[],
    index: number,
}

const CartComponent:React.FC<props> = ({prod,cart,index}:props)=>{
    const [count,setcount] = React.useState(prod.count);
    const dispatch = useDispatch();
    const favorites = useSelector((state:any)=> state.slice.favorites);
    const {find,changeFavrites} = useSetFavorites(prod);
    const sum = prod.price * prod.count;
    const debounce = useDebounce(()=>{
        let copyCart = [...cart];
        copyCart[index] = {...prod,count: count};
        dispatch(setcart(copyCart));
    },200);
    React.useEffect(()=>{
        debounce();
    },[count]);
    const decrement = ()=>{
        if(count == 1){
            dispatch(deleteFromCart(prod));
        } else {
            setcount((count)=> count - 1);
        }
    }
    const increment = ()=>{
        if(count >= 5){
            alert('count cant be more then 5')
        } else {
            setcount((count)=> count + 1);
        }
    }
    return (
        <div className="w-full h-60 border-2 border-gray-600 flex">
            <img className="w-2/6 h-full" src={prod.images[0]}></img>
            <div className="w-4/6 p-4 px-5 flex">
                <div className="h-full w-full flex flex-col justify-between">
                    <div>
                        <p>{prod.name}</p>
                        <p>IVORY / COLLEGIATE GREEN / CORE BLACK</p>
                        <p>РАЗМЕР: {prod.size}</p>
                        <p>ЦЕНА: {sum} ₸</p>
                    </div>
                    <div className="w-1/4 flex justify-between gap-2 p-2 px-3 border-2 border-gray-600 text-xl">
                        <button onClick={decrement}>-</button>
                        {count}
                        <button onClick={increment}>+</button>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <button onClick={()=>{dispatch(deleteFromCart(prod))}}><CloseIcon></CloseIcon></button>
                    <button onClick={changeFavrites}>{!find ? <FavoriteBorderIcon></FavoriteBorderIcon> : <FavoriteIcon></FavoriteIcon>}</button>
                </div>
            </div>
        </div>
    )
}

export default CartComponent;
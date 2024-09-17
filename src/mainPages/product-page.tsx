import React from "react";
import Menu from "./menu.tsx";
import { Shoe, cartProd, useGetShoes } from "../hooks/useGetShoes.ts";
import { useParams,useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSetFavorites } from "../hooks/useSetFavorites.ts";
import { useDispatch,useSelector } from "react-redux"
import { addToCart,changeCartModal,deleteFromFavorites,setFavorites } from "../slice.ts";

const ProductPage:React.FC = ()=>{
    const shoes:Shoe[] = useGetShoes();
    const sizes:number[] = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5];
    const [size,setsize] = React.useState<number | boolean>(false);
    const params = useParams();
    const dispatch = useDispatch();
    const [data,setdata] = React.useState<Shoe | undefined | null>();
    React.useEffect(()=>{
        try {
            const find = shoes.find((el:Shoe)=> el._id === params.product_id);
            setdata(find);
        } catch {
            alert('error')
        } 
    },[shoes, params.product_id])
    const priceString = String(data?.price).slice(0,2) + ' ' + String(data?.price).slice(2);
    const [num,setnum] = React.useState<number>(0);
    const current = data?.images[num];
    let length: number = data?.images.length ?? 0;
    let installments: number = data?.price !== undefined && data?.price !== null ? data.price / 4 : 0;
    let nav = useNavigate(); 
    const increment = ()=>{
        if(num == length - 1){
            setnum(0);
        } else {
            setnum((prev) => prev + 1);
        }
    }
    const decrement = ()=>{
        if(num == 0){
            setnum(length - 1);
        } else {
            setnum((prev) => prev - 1);
        }
    }
    const {cart} = useSelector(({slice}:any)=> slice);
    const {find,changeFavrites} = useSetFavorites(data);
    const addingToCart = () => {
        if (!size) {
            alert('выберите размер обуви')
        } else {
            let find:cartProd | any = cart.find((el)=> el._id == data?._id);
            if(find?.count >= 5){
                alert('count cant be more then 5');
            } else {
                let cartobj = {...data,count: 1, size};
                dispatch(addToCart(cartobj));
                dispatch(changeCartModal(cartobj));
            }
        }
    }
    return(
        <div>
            <Menu></Menu>
            <div className="w-full flex" style={{width:'100vw', height: '85vh'}}>
                <div className="w-7/10 h-full bg-cover bg-no-repeat bg-center flex flex-col justify-between flex-shrink-0 p-6" style={{backgroundImage:`url(${current})`}}>
                    <div>
                        <button onClick={()=>{nav('/')}} className="flex gap-2">
                            <TurnLeftIcon></TurnLeftIcon>
                            <p className="text-xl underline">назад</p>
                        </button>
                    </div>
                    <div className="w-full flex justify-between">
                        <button onClick={decrement} className="text-2xl p-2 pr-3 pl-3 flex items-center bg-white border-2 border-black"><WestIcon></WestIcon></button>
                        <button onClick={increment} className="text-2xl p-2 pr-3 pl-3 flex items-center bg-white border-2 border-black"><EastIcon></EastIcon></button>
                    </div>
                    <div className="w-full flex justify-center gap-4">
                        {data?.images.map((el:string,i:number)=>{
                            return (
                                <img onClick={()=>{setnum(i)}} src={el} key={el} className={`w-8 h-8 border-2 border-black ${num == i ? 'border-b-4' : ''}`}></img>
                            )
                        })}
                    </div>
                </div>
                <div className="w-30 p-6 flex flex-col gap-5 text-wrap overflow-y-auto">
                    <p>{data?.type} - {data?.category}</p>
                    <p className="text-3xl text-bold">{data?.name}</p>
                    <p className="text-2xl">{priceString},00 ₸</p>
                    <p className="text-sm">Grey Three / Grey Three / Stone</p>
                    <p className="text-sm">ВНИМАНИЕ! ДОСТУПНЫЕ РАЗМЕРЫ УКАЗАНЫ ПО ШКАЛЕ UK👟⬇️</p>
                    <div className="w-full flex flex-col flex-wrap gap-4">
                        <p>Выбрать размер</p>
                        <div className="flex flex-wrap max-w-sm">{sizes.map((el:number)=>{
                            return(
                                <div onClick={()=>{setsize(el)}} className={`pb-2 pt-2 w-20 flex justify-center text-xs border-2 border-gray-500 border-opacity-50 hover:bg-black hover:text-white ${size == el && 'bg-black text-white'}`}>
                                    {el}
                                </div>
                            )
                        })}</div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={addingToCart} className="bg-black w-3/4 text-white flex justify-between items-center p-3 pr-6 pl-6 duration-300 transition hover:text-gray-400">
                            <p className="text-xl">Добавить в корзину</p>
                            <ArrowForwardIcon className="w-18"></ArrowForwardIcon>
                        </button>
                        <button className="p-1 border-2 border-black" onClick={changeFavrites}>
                            {!find ? <FavoriteBorderIcon></FavoriteBorderIcon> : <FavoriteIcon></FavoriteIcon>}
                        </button>
                    </div>
                    <button className="w-3/4 flex justify-between items-center p-2 text-xs font-bold text-white bg-gradient-to-b from-purple-400 to-cyan-500">
                        <div className="flex flex-col items-start">
                            <p>Рассрочка 0-0-4</p>
                            <p>{installments.toFixed(1)} x Мec</p>
                        </div>
                        <p>Подробнее</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;
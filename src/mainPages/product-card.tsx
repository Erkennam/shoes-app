import React from "react";
import { Shoe } from "../hooks/useGetShoes.ts";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setFavorites,deleteFromFavorites } from "../slice.ts";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSetFavorites } from "../hooks/useSetFavorites.ts";
interface props{
    product: Shoe
}

const ProductCard:React.FC<props> = ({product}:props)=>{
    const nav = useNavigate();
    const dispatch = useDispatch();
    const {find,changeFavrites} = useSetFavorites(product);
    return (
        <div className='w-1/5 flex flex-col gap-1 border-2 pb-2 border-white hover:border-black' key={product._id}>
                <div className='w-full bg-cover h-56 flex flex-col pl-3 pr-3 justify-between' style={{backgroundImage: `url(${product.images[0]})`}}>
                    <div className='flex justify-between pt-3'>
                        <p className="p-1 text-xs text-white bg-gradient-to-b from-purple-400 to-cyan-500">0-0-4</p>
                        <button className="z-100" onClick={changeFavrites}>{!find ? <FavoriteBorderIcon></FavoriteBorderIcon> : <FavoriteIcon></FavoriteIcon>}</button>
                    </div>
                <div className='p-1 w-2/6 text-1xl flex justify-center bg-white'>{product.price} ₸</div>
            </div>
            <div className='flex flex-col p-1' onClick={()=>{nav(`/product-page/${product._id}`)}}>
                <p>{product.name}</p>
                <p>{product.category}</p>
            </div>
        </div>
    )
}

export default ProductCard
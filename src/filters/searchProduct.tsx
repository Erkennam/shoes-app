import React from "react";
import { Shoe } from "../hooks/useGetShoes";
import { useNavigate } from "react-router-dom";
interface props {
    product: Shoe;
}

const SearchProduct:React.FC<props> = ({product}:props)=>{
    const nav = useNavigate();
    return (
        <div className='w-5/12 h-32 flex gap-4 justify-between mb-4 border-2 border-white hover:border-black' key={product._id} onClick={()=>{nav(`/product-page/${product._id}`)}}>
           <img className="w-2/5 h-full" src={product.images[0]}></img>
           <div>
                <p>{product.name}</p>
                <p>{product.price},00 ₸</p>
           </div>
        </div>
    )
}

export default SearchProduct;
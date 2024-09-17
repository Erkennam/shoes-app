import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from "react-redux";
import { setSearchModal,setfilterparams } from "../slice.ts";
import { useNavigate } from "react-router-dom";
import { shoeModels } from "../category/collections.tsx";

const Menu:React.FC = ()=>{
    const {cart,favorites,auth} = useSelector(({slice}:any)=> slice);
    const nav = useNavigate();
    const dispatch = useDispatch();
    const menuList = [
        {
            name: 'МУЖЧИНЫ',
            function: ()=>{
                nav('/collection-page/muzhchiny')
            }
        },
        {
            name: 'ЖЕНЩИНЫ',
            function: ()=>{
                nav('/collection-page/zhenshhiny')
            }
        },
        {
            name: 'ВСЕ',
            function: ()=>{
                nav('/products-page')
            }
        },
        {
            name: 'СПОРТ',
            function: ()=>{
                nav('/products-page');
            }
        },
        {
            name: 'БРЕНДЫ',
            function: ()=>{ 
                dispatch(setfilterparams(['brand',[...shoeModels]]))
                nav('/products-page');
            }
        },
    ]
    return (
        <nav className="w-full p-6 pl-8 pr-8 border-b-2 bg-white border-black flex justify-between items-center">
            <div className="flex gap-6 items-center" onClick={()=>{nav('/')}}>
                <img src="https://www.thenextsole.com/storage/Te1NiAMbrfBsG8Os6Q3RButTETOLXI18YsnkUMNJ.png" className="w-16"></img>
                <h1>Adidas e-commerce</h1>
            </div>
            <ul className="flex gap-5">{menuList.map((el)=>{
                return (
                    <li className="p-2 bg-transparent transition duration-300 hover:bg-black hover:text-white" onClick={el.function}>{el.name}</li>
                )
            })}</ul>
            <div className="flex gap-3 items-center">
                <button onClick={()=>{dispatch(setSearchModal())}} className="w-28 p-1 border-2 border-black bg-black text-white transition duration-300 hover:bg-white hover:text-black">ПОИСК</button>
                <button onClick={()=>{!auth ? nav('/login-page') : nav('/profile-page')}}>
                    <PersonIcon></PersonIcon>
                </button>
                <button className="flex items-end" onClick={()=>{nav('/favorites')}}>
                    <FavoriteBorderIcon></FavoriteBorderIcon>
                    {favorites.length > 0 && <p className="text-xs w-4 h-4 flex items-center justify-center bg-black text-white rounded-full">{favorites.length}</p>}
                </button>
                <button className="flex items-end" onClick={()=>{nav('/cart')}}>
                    <ShoppingCartIcon></ShoppingCartIcon>
                    {cart.length > 0 && <p className="text-xs w-4 h-4 flex items-center justify-center bg-black text-white rounded-full">{cart.length}</p>}
                </button>
            </div>
        </nav>
    )
}

export default Menu;
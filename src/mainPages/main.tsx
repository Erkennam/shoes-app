import React from 'react';
import Menu from './menu.tsx';
import EastIcon from '@mui/icons-material/East';
import { useSelector,useDispatch } from 'react-redux';
import Collections from '../category/collections.tsx';
import Slider from './slider.tsx';
import { setSearch } from '../slice.ts';
import { useNavigate } from 'react-router-dom';
import Categoryes from '../category/categoryes.tsx';

const Main:React.FC = ()=>{
    const dispatch = useDispatch();
    const nav = useNavigate();
    const showAll = ()=>{
        dispatch(setSearch(''));
        nav('/products-page');
    }
    return (
        <div>
            <Menu></Menu>
            <header className='bg-cover bg-no-repeat bg-center p-14 pr-24 pl-24 flex flex-col justify-end' style={{backgroundImage: 'url(https://media.adidas.kz/8a35d12609da78b0a6c0e159eec3e97c/4/7f53f8c6c730af6aeb52e66eb74d8507/66d86d4f24288/428d.jpg:imgpbdl)', width:'100vw', height: '90vh'}}>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-white text-6xl font-bold'>культовые <br></br> коллекций <br></br> originals</h1>
                    <p className='text-white text-xl'>мы дали миру originals, ты делаешь его <br></br> уникальным</p>
                    <button onClick={()=>{nav('/products-page');}} className='w-48 text-2xl p-2 bg-white border-2 flex gap-4 items-end border-black'>к покупкам <EastIcon></EastIcon></button>
                </div>
            </header>
            <div className='flex flex-col items-center gap-14'>
                <div className='flex mt-10 justify-between w-4/5'>
                    <h1 className='text-3xl font-bold'>Обувь Originals</h1>
                    <h1 onClick={()=>{showAll()}} className='text-2xl font-semibold text-decoration'>Смотреть все</h1>
                </div>
                <Slider></Slider>
                <Collections></Collections>
                <Categoryes></Categoryes>
            </div>

        </div>
    )
}

export default Main;
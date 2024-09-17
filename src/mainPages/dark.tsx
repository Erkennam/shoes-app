import React from "react";
import CartModal from "../cart/cartModal.tsx";
import SearchModal from "../filters/searchModal.tsx";
import { useSelector } from "react-redux";
import FilterModal from '../filters/filtermodal.tsx';

const Dark:React.FC = ()=>{
    const {added,searchModal,filter} = useSelector(({slice}:any)=> slice); 
    return(
        <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-70 fixed z-30">
            {added && <CartModal></CartModal>}
            {searchModal && <SearchModal></SearchModal>}
            {filter && <FilterModal></FilterModal>}
        </div>
    )
}

export default Dark
import React from "react";
import { filters,filter } from "../filters/filtermodal.tsx";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch,useSelector } from "react-redux";
import { setfilterparams } from "../slice.ts";
interface props {
    filters: filters,
}

const FilterComponent:React.FC<props> = ({filters}:props)=>{
    const {options} = filters;
    const dispatch = useDispatch();
    const {filterParams}:{[key:string]: filter} = useSelector(({slice}:any)=> slice);
    const [open,setopen] = React.useState<boolean>(false);
    const [brands,setbrands] = React.useState<string []>([]);
    const setFilterparametrs = (el:string)=>{
        if(filters.name == 'БРЕНД'){
            if(brands.includes(el)){
                setbrands((brands) => brands.filter((le)=> le != el));
                dispatch(setfilterparams(['brand', [...brands.filter((le) => le !== el)]]));
            } else{
                setbrands((brands)=> [...brands,el]);
                dispatch(setfilterparams(['brand', [...brands, el]]));
            }
        } else {
            dispatch(setfilterparams([filters.key,el]))
        }
    }
    return(
        <div className="w-full border-b-2 border-b-[#ebedee] my-1">
            <div className="p-4 w-full flex justify-between" onClick={()=>{setopen((open)=> !open)}}>
                <p className="text-sm font-medium">{filters.name}</p>
                <button><KeyboardArrowDownIcon></KeyboardArrowDownIcon></button>
            </div>
            {open && <ul>{options.map((el,i)=>{
                return (
                    <div>
                        <li onClick={()=>{setFilterparametrs(el)}} className={`p-4 flex gap-3 items-center ${options.length !== i + 1 && 'border-b-2 border-b-[#ebedee]'}`}>
                            {filterParams[filters.key] == el && <div className="w-2 h-2 rounded-full bg-black"></div> || filterParams.brand.includes(el) && <div className="w-2 h-2 rounded-full bg-black"></div>}
                            <p>{el}</p>
                        </li>
                    </div>
                )
            })}</ul>}
        </div>
    )
}

export default FilterComponent;
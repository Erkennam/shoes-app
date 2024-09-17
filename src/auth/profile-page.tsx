import React from "react";
import Menu from "../mainPages/menu.tsx";
import { useSelector } from "react-redux";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ProfilePage:React.FC = ()=>{
    const {profile:{username, email },favorites} = useSelector(({slice}:any)=> slice);
    const [open,setopen] = React.useState<boolean>(false);
    return(
        <div className="flex flex-col gap-8">
            <Menu></Menu>
            <div className="w-full flex justify-center">
                <div className="w-3/4 flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <p className="text-3xl font-bold">Личные Данные</p>
                        <div className="flex flex-col gap-2">
                            <p>{username}</p>
                            <p>{email}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-3xl font-bold">Избранное</p>
                        <div className="flex flex-col gap-2">
                            <p>кол-во: {favorites.length}</p>
                            <p onClick={()=>{setopen((open)=> !open)}}>избранное {!open ? <KeyboardArrowDownIcon></KeyboardArrowDownIcon> : <KeyboardArrowUpIcon></KeyboardArrowUpIcon>}</p>
                            {open && <div className="ml-4">{favorites.map((el)=>{
                                return(
                                    <p>{el.name}</p>
                                )
                            })}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;
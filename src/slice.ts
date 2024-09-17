import { createSlice } from "@reduxjs/toolkit";
import { Shoe,cartProd } from "./hooks/useGetShoes";
import { user } from "./auth/registrationPage";
interface initialState {
    cart: cartProd[],
    dark: boolean,
    added: cartProd | boolean,
    favorites: Shoe[],
    searchModal: boolean,
    searchValue: string,
    auth: boolean,
    profile: user | boolean,
    filter: boolean,
    filterParams: any,
}
const initialState:initialState = {
    cart: [],
    dark: false,
    added: false,
    favorites: [],
    searchModal: false,
    searchValue: '',
    auth: false,
    profile: false,
    filter: false,
    filterParams: {
        brand: [],
        price: "Все",
        sort:  "ЦЕНА ПО УМОЛЧАНИЮ",
        type:  "Все",
    },
}

const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: { 
        addToCart: (state,action)=>{
            const find = state.cart.find((el)=> el._id == action.payload._id);
            if(find){
                const updatedCart = state.cart.map((el) => {
                    if (el._id === action.payload._id) {
                        return { ...el, count: el.count + 1 };
                    }
                    return el;
                });
                return {
                    ...state,
                    cart: updatedCart
                };
            } else {
                state.cart = [...state.cart,action.payload];
            }
        },
        deleteFromCart: (state,action)=>{
            state.cart = state.cart.filter((el)=> el._id !== action.payload._id)
        },
        changeCartModal: (state,action)=>{
            state.dark = !state.dark;
            state.added = action.payload;
        },
        setcart: (state,action)=>{
            state.cart = action.payload;
        },
        setFavorites: (state,action)=>{
            state.favorites = [...state.favorites,action.payload];
        },
        deleteFromFavorites: (state,action)=>{
            state.favorites = state.favorites.filter((el)=> el._id !== action.payload._id)
        },
        setSearchModal: (state)=>{
            state.searchModal = !state.searchModal;
            state.dark = !state.dark;
        },
        setSearch: (state,action)=>{
            state.searchValue = action.payload;
        },
        setauth: (state)=>{
            state.auth = !state.auth;
        },
        setprofile: (state,action)=>{
            state.profile = action.payload;
        },
        setfiltermodal: (state) => {
            state.dark = !state.dark;
            state.filter = !state.filter;
        },
        setfilterparams: (state,{payload})=>{
            const params = state.filterParams;
            params[payload[0]] = payload[1];
            state.filterParams = params;
        }
    }
})

export const {addToCart,setfilterparams,changeCartModal,setcart,deleteFromCart,setFavorites,deleteFromFavorites,setSearchModal,setSearch,setauth,setprofile,setfiltermodal} = slice.actions;
export default slice.reducer;
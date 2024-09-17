import React from 'react';
import { cartProd } from './useGetShoes';
import { addtocart } from '../serve';
import { useDispatch } from 'react-redux';

function useAddToCart() {
  const dispatch = useDispatch();
  const addToCart = React.useCallback(async (cartProd: cartProd | any) => {
    try {
      await addtocart(cartProd);
      console.log('Данные успешно добавлены в корзину:');
    } catch (error) {
      console.error('Ошибка при добавлении элемента в корзину:', error);
    }
  }, []);  

  return addToCart;
}

export default useAddToCart;
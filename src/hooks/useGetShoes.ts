import React from "react"
import { useDispatch } from "react-redux";
export interface Shoe {
    _id: string;
    name: string;
    category: string;
    type: string;
    price: number;
    images: string[];
}
export interface cartProd extends Shoe{
  count: number;
  size: number | boolean;
}

export const useGetShoes = ()=>{
    const [shoes, setShoes] = React.useState([]);
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:4001');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setShoes(data.shoes);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
    return shoes;
}
import { createSlice } from "@reduxjs/toolkit";
import jacket from '../../assets/jacket.png'
import ACDC from '../../assets/ACDC.png'
import AbsoluteCinema from '../../assets/AbsoluteCinema.png'
import Nirvana from '../../assets/Nirvana.png'
import king from '../../assets/king.png'
import Slipknot from '../../assets/Slipknot.png'
import gaza from '../../assets/gaza.png'
const initialProducts = [
  {
    id: 1,
    name: 'Футболка AC/DC',
    price: 1200,
    image: ACDC,
    description: "Хлопковая футболка с принтом легендарной группы",
    isNew: true,
    type: "tshirt",
    size: "M"
  },
  {
    id: 2,
    name: "Косуха кожаная",
    price: 5500,
    image: jacket,
    description: "Настоящая кожаная куртка-косуха с металлической фурнитурой",
    isNew: false,
    type: "jacket",
    size: "L"
  },
  {
    id: 3,
    name: "Медиатор Nirvana",
    price: 2800,
    image: Nirvana,
    description: "Коллекционный медиатор с логотипом культовой группы",
    isNew: true,
    type: "accessory",
    size: "32"
  },
  {
    id: 4,
    name: "Футболка Король и Шут",
    price: 600,
    image: king,
    description: "Хлопковая футболка с принтом группы Король и Шут",
    isNew: false,
    type: "tshirt",
    size: "универсальный"
  },
  {
    id: 5,
    name: "Футболка Кино",
    price: 1500,
    image: AbsoluteCinema,
    description: "Классическая футболка с логотипом группы Кино",
    isNew: true,
    type: "tshirt",
    size: "L"
  },
  {
    id: 6,
    name: "Толстовка Slipknot",
    price: 4200,
    image: Slipknot,
    description: "Теплая толстовка с капюшоном и принтом Slipknot",
    isNew: false,
    type: "other",
    size: "M"
  },
  {
    id: 8,
    name: "Носки Сектор Газа",
    price: 3800,
    image: gaza,
    description: "Носки с тематическим принтом Сектор Газа",
    isNew: false,
    type: "accessory",
    size: "42"
  }
];

let productsStore = JSON.parse(localStorage.getItem("products")) || initialProducts;

let ProductsSlice = createSlice({
  name: "products",
  initialState: productsStore,
  reducers: {
    add: (state, action) => {
      let newItems = action.payload;
      state.push(...newItems);
      localStorage.setItem("products", JSON.stringify(state));
    },
  },
});

export let { add } = ProductsSlice.actions;
export default ProductsSlice.reducer;
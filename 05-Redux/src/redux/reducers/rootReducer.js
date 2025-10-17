import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";

// TÓPICO: UTILIZANDO MAIS DE UM REDUCER
// combineReducers junta todos os reducers em um só.
// As chaves ('carrinho', 'produtos') definem como o estado global será estruturado.
const rootReducer = combineReducers({
  carrinho: cartReducer,
  produtos: productReducer,
});

export default rootReducer;

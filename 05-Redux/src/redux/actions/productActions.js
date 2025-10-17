import { getProducts } from "../../services/product.service";
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "../actionTypes";

// Este é um "Thunk Action Creator". Ele retorna uma função que recebe 'dispatch'.
// O middleware redux-thunk permite que façamos isso para lidar com lógica assíncrona.
export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST }); // Avisa que a busca começou
  try {
    const produtos = await getProducts();
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: produtos }); // Envia os dados em caso de sucesso
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message }); // Envia o erro em caso de falha
  }
};

// Action Creators são funções que criam e retornam os objetos de ação.
import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from "../actionTypes";

export const adicionarItem = (produto) => ({
  type: ADD_ITEM_TO_CART,
  payload: produto,
});

export const removerItem = (produtoId) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: produtoId,
});

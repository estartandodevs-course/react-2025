import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from "../actionTypes";

const initialState = {
  items: [],
};

// Um Reducer é uma função pura que calcula o próximo estado. (state, action) => newState.
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      // REGRA DA IMUTABILIDADE: Nunca modifique o 'state' diretamente.
      // Sempre retorne uma cópia nova do estado com as alterações.
      const produto = action.payload;
      const produtoExistente = state.items.find(
        (item) => item.id === produto.id
      );

      if (produtoExistente) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === produto.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...produto, quantity: 1 }],
        };
      }

    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        // Usamos o método filter() para criar um NOVO array
        // contendo todos os itens, EXCETO aquele cujo ID corresponde ao payload.
        // Isso garante a imutabilidade do estado.
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;

import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

// TÓPICO: REDUX DEVTOOLS
// Esta linha habilita a integração com a extensão do navegador Redux DevTools.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// createStore cria a store global.
// 1º argumento: O reducer principal da aplicação.
// 2º argumento: Enhancers, como o middleware.
// applyMiddleware(thunk) ensina o Redux a lidar com actions que são funções (para requisições de API).
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

# Projeto Prático: Catálogo de Produtos com Redux Clássico

Este projeto é uma aplicação de e-commerce simples, construída para demonstrar e ensinar os conceitos fundamentais do gerenciamento de estado global em React utilizando a abordagem "clássica" do Redux. A aplicação busca produtos de uma API real e permite que o usuário adicione itens a um carrinho de compras, cujo estado é gerenciado globalmente.

## 🎯 Objetivos de Aprendizagem

Este `README` serve como um guia de estudo para o código-fonte, explicando os seguintes conceitos:

- **Introdução ao Redux:** A razão pela qual um gerenciador de estado global é necessário em aplicações complexas.
- **As Peças do Redux:** O papel de cada parte do ecossistema: `Actions`, `Reducers`, a `Store` e o `Dispatch`.
- **Redux com React:** A integração entre as duas bibliotecas usando o `react-redux` e seus hooks (`useSelector`, `useDispatch`).
- **Imutabilidade:** A regra fundamental de nunca modificar o estado diretamente, mas sim retornar cópias atualizadas.
- **Ações Assíncronas:** Como lidar com chamadas de API dentro do fluxo do Redux usando o middleware `redux-thunk`.
- **Múltiplos Reducers:** A organização do estado em "fatias" (`slices`) e como combiná-las com `combineReducers`.
- **Redux DevTools:** Como usar a extensão do navegador para inspecionar, depurar e viajar no tempo pelo estado da sua aplicação.

---

## 🚀 Como Executar o Projeto

1.  **Clone o repositório** (ou use os arquivos já criados).

2.  **Instale as dependências** no terminal:

    ```bash
    npm install
    ```

3.  **Instale a Extensão Redux DevTools** no seu navegador (essencial para a experiência de aprendizado):

    - [Para Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
    - [Para Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

Abra o navegador, acesse o endereço local e abra o Redux DevTools para acompanhar as mudanças de estado em tempo real.

---

## 🏛️ Arquitetura e Fluxo de Dados do Redux Clássico

O Redux opera sob um princípio de **fluxo de dados unidirecional**, que pode ser resumido da seguinte forma:

**UI (Componente) ➔ `dispatch(action)` ➔ Reducer ➔ Store (Estado Atualizado) ➔ UI (Re-renderiza)**

Vamos analisar como cada parte deste fluxo foi implementada no projeto.

### 1. Actions e Action Types (`src/redux/actionTypes.js`, `src/redux/actions/`)

Uma **Action** é um objeto que descreve uma intenção de mudança no estado.

- `actionTypes.js`: Centralizamos os nomes das ações como constantes para evitar erros de digitação.
  ```javascript
  export const ADD_ITEM_TO_CART = "cart/addItem";
  export const FETCH_PRODUCTS_SUCCESS = "products/fetchSuccess";
  ```
- `actions/cartActions.js`: Contém **Action Creators**, que são funções que simplesmente retornam um objeto de ação. Isso mantém o código organizado.
  ```javascript
  export const adicionarItem = (produto) => ({
    type: ADD_ITEM_TO_CART,
    payload: produto,
  });
  ```
- `actions/productActions.js`: Demonstra uma **ação assíncrona** com `redux-thunk`. A função `fetchProducts` retorna outra função que recebe `dispatch` como argumento. Isso nos permite executar a chamada de API e despachar diferentes ações (`REQUEST`, `SUCCESS`, `FAILURE`) com base no resultado.

### 2. Reducers (`src/redux/reducers/`)

Um **Reducer** é uma função pura que recebe o estado atual e uma ação, e retorna o **novo estado**.

- `reducers/cartReducer.js`: Este arquivo é um exemplo perfeito da **regra da imutabilidade**. Observe que nunca fazemos `state.items.push(...)`. Em vez disso, usamos o spread operator (`...`) para criar cópias do estado e do array, garantindo que o estado original nunca seja modificado.
- `reducers/productReducer.js`: Gerencia o estado relacionado aos produtos, incluindo o status da chamada de API (`loading`, `succeeded`, `failed`).
- `reducers/index.js`: Usa a função `combineReducers` para juntar nossos dois reducers em um único "reducer raiz". As chaves usadas (`carrinho`, `produtos`) definem a estrutura do nosso estado global.

### 3. A Store (`src/redux/index.js`)

A **Store** é o objeto que une tudo. Ela armazena o estado global, permite que o estado seja lido e atualizado, e gerencia os listeners.

- `createStore`: A função do Redux que cria a store.
- `applyMiddleware(thunk)`: "Ensina" a nossa store a lidar com ações que são funções (nossas actions assíncronas).
- `composeEnhancers`: Habilita a conexão com a extensão **Redux DevTools** do navegador, uma ferramenta indispensável para depuração.

### 4. Conectando Redux ao React (`src/main.jsx` e Componentes)

A biblioteca `react-redux` fornece as ferramentas para conectar nossos componentes React à store.

- **`<Provider>` (em `src/main.jsx`):** Este componente envolve toda a nossa aplicação e recebe a `store` como prop. É ele que torna o estado global acessível a qualquer componente.

- **`useSelector` (em `Header.jsx` e `ProductList.jsx`):** Este hook permite que um componente **leia** dados da store. Ele recebe uma função que seleciona uma "fatia" do estado. O componente irá re-renderizar automaticamente sempre que essa fatia do estado for alterada.

  ```jsx
  const cartItems = useSelector((state) => state.carrinho.items);
  ```

- **`useDispatch` (em `ProductItem.jsx` e `ProductList.jsx`):** Este hook nos dá acesso à função `dispatch` da store. Usamos `dispatch` para **enviar ações** que irão, por sua vez, acionar os reducers para atualizar o estado.
  ```jsx
  const dispatch = useDispatch();
  // ...
  dispatch(adicionarItem(produto));
  ```

## 📂 Estrutura de Arquivos

A estrutura de pastas foi organizada para separar as responsabilidades, uma prática comum em projetos Redux:

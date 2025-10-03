# Navegação e Rotas em React com React Router

Este documento serve como um guia de estudo para o projeto "Blog Simples", que demonstra a implementação de um sistema de navegação de múltiplas páginas em uma Single Page Application (SPA) usando a biblioteca **React Router**.

O objetivo é analisar o código-fonte para explicar como as rotas são criadas, como a navegação entre páginas é gerenciada e como os Hooks do React Router (`useParams` e `useLocation`) são utilizados para criar interfaces dinâmicas e contextuais.

## 🎯 Conceitos Demonstrados no Código

Este projeto é uma demonstração prática dos seguintes pilares do roteamento em React:

- **Configuração do React Router:** A instalação e a configuração inicial com o `<BrowserRouter>`.
- **Criação de Rotas Estáticas:** Mapeamento de caminhos de URL (ex: `/`, `/sobre`) para componentes de página específicos usando `<Routes>` e `<Route>`.
- **Navegação Client-Side:** Uso do componente `<Link>` para criar um menu de navegação que altera a URL sem recarregar a página.
- **Rotas Dinâmicas:** Definição de rotas com parâmetros (ex: `/posts/:id`) para exibir conteúdo específico com base na URL.
- **Hook `useParams`:** Captura de parâmetros de rotas dinâmicas para buscar e exibir os dados corretos (ex: o `id` de um post).
- **Rota Inexistente (404):** Implementação de uma rota "catch-all" (`path="*"`) para lidar com URLs não encontradas.
- **Hook `useLocation`:** Obtenção de informações sobre a URL atual para fornecer contexto adicional na UI.

---

## 🔬 Análise do Código e dos Conceitos Aplicados

A seguir, uma análise de como cada funcionalidade foi implementada nos arquivos do projeto.

### 1. Configuração Principal (`src/main.jsx`)

A base de todo o sistema de roteamento é o componente `BrowserRouter`.

```jsx
// src/main.jsx
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### 2. Estrutura de Rotas (`src/App.jsx`)

```jsx
// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
// ... importações das páginas ...

function App() {
  return (
    <div>
      <Menu />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="*" element={<PaginaNaoEncontrada />} />
        </Routes>
      </main>
    </div>
  );
}

<Routes>: Funciona como um switch. Ele inspeciona a URL atual e renderiza o primeiro <Route> cujo path corresponde.

<Route>: Define a regra de mapeamento. A prop path especifica o caminho da URL, e a prop element especifica o componente React que deve ser renderizado para esse caminho.

Componentes Persistentes: Note que o componente <Menu /> está posicionado fora do <Routes>. Isso garante que o menu de navegação seja exibido em todas as páginas, pois ele não faz parte da lógica de troca de rotas.
```

### 3. Navegação com o Componente <Link> (src/components/Header.jsx)

Para a navegação entre as páginas, o React Router fornece o componente <Link>.

```jsx
// src/components/Header.jsx
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/sobre">Sobre</Link>
      <Link to="/posts">Posts</Link>
    </nav>
  );
}

A principal vantagem do <Link> sobre a tag <a> tradicional é que ele previne o comportamento padrão do navegador de fazer uma requisição e recarregar a página inteira. Em vez disso, ele atualiza a URL programaticamente e permite que o <Routes> renderize o novo componente, mantendo a fluidez de uma SPA.
```

### 4. Rotas Dinâmicas e o Hook useParams

Este é o conceito central para exibir páginas de detalhes, como um post de blog específico.

```jsx
Definição da Rota (App.jsx):

<Route path="/posts/:id" element={<Post />} />

O trecho :id é um parâmetro de URL dinâmico. Ele diz ao React Router para corresponder a qualquer valor nesta posição (ex: /posts/1, /posts/2, etc.).

Captura do Parâmetro (Post.jsx):

import { useParams } from 'react-router-dom';

function Post() {
  const { id } = useParams(); // Ex: { id: '1' }
  // ... usa o 'id' para buscar os dados do post
  return <h1>Exibindo o Post de ID: {id}</h1>;
}

O Hook useParams retorna um objeto contendo os parâmetros da URL. No nosso caso, ele retorna { id: 'valor_da_url' }. Usamos esse id para encontrar o post correto em nossa base de dados (postsData.js) e exibir suas informações.

```

### 5. Rota 404 e o Hook useLocation

Para lidar com URLs que não correspondem a nenhuma rota definida, usamos uma rota "catch-all".

```jsx
Definição da Rota (App.jsx):

<Route path="*" element={<PaginaNaoEncontrada />} />

O path="*" funciona como um curinga que corresponde a qualquer URL. É crucial que esta rota seja a última dentro do <Routes>, pois as rotas são avaliadas na ordem em que são definidas.

Contextualizando o Erro (PaginaNaoEncontrada.jsx):

import { useLocation } from 'react-router-dom';

function PaginaNaoEncontrada() {
  const location = useLocation();
  // location.pathname contém a URL que o usuário tentou acessar
  return <p>O caminho <code>{location.pathname}</code> não foi encontrado.</p>;
}

O Hook useLocation fornece informações sobre a URL atual. No componente da página 404, nós o utilizamos para exibir uma mensagem de erro mais informativa para o usuário, mostrando qual caminho específico ele tentou acessar sem sucesso.
```

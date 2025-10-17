import UserList from "./components/UserList";
import PostList from "./components/PostList";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Painel de Dados com Custom Hook</h1>
      <div className="dashboard">
        <UserList />
        <PostList />
      </div>
    </div>
  );
}

export default App;

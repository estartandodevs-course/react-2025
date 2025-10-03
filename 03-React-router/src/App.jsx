import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Sobre from "./pages/Sobre";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <Header />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="*" element={<PaginaNaoEncontrada />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

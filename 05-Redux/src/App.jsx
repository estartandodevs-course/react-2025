import Header from "./components/Header";
import ProductList from "./pages/ProductList";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Header />
      <Cart />
      <hr style={{ margin: "30px 0" }} />
      <ProductList />
    </div>
  );
}

export default App;

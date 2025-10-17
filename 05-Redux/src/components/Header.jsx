// src/components/Header.jsx
import { useSelector } from "react-redux";

function Header() {
  // MODIFICADO: Usamos reduce para somar a 'quantity' de cada item.
  const totalItems = useSelector((state) =>
    state.carrinho.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="header">
      <h1>Redux Classic Store</h1>
      <span>
        Carrinho: {totalItems} {totalItems === 1 ? "item" : "itens"}
      </span>
    </header>
  );
}

export default Header;

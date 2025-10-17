import { useSelector, useDispatch } from "react-redux";
import { removerItem } from "../redux/actions/cartActions"; // Importa a nova ação

function Carrinho() {
  // Lê os itens do carrinho do estado global
  const cartItems = useSelector((state) => state.carrinho.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (produtoId) => {
    // Despacha a ação de remoção, passando o ID do produto
    dispatch(removerItem(produtoId));
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>Meu Carrinho</h2>
        <p>Seu carrinho está vazio.</p>
      </div>
    );
  }

  // Calcula o valor total do carrinho
  const totalValue = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Meu Carrinho</h2>
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <span className="cart-item-title">
              {item.title} (x{item.quantity})
            </span>
            <div className="cart-item-details">
              <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => handleRemoveItem(item.id)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="cart-total">Total: R$ {totalValue.toFixed(2)}</h3>
    </div>
  );
}

export default Carrinho;

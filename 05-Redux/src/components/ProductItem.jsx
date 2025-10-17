import { useDispatch } from "react-redux";
import { adicionarItem } from "../redux/actions/cartActions";

function ProductItem({ produto }) {
  // TÓPICO: ESCREVENDO NO ESTADO GLOBAL
  // O hook 'useDispatch' nos dá a função 'dispatch' da store.
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Para alterar o estado, despachamos uma ação.
    // A função 'adicionarItem(produto)' retorna o objeto de ação
    // que será enviado para todos os reducers.
    dispatch(adicionarItem(produto));
  };

  return (
    <div className="product-item">
      <img src={produto.image} alt={produto.title} />
      <h3>{produto.title}</h3>
      <p>R$ {produto.price.toFixed(2)}</p>
      <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
    </div>
  );
}

export default ProductItem;

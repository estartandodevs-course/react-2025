import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";
import ProductItem from "../components/ProductItem";

function ProductList() {
  const dispatch = useDispatch();

  // Lendo dados do slice 'produtos' da store.
  const { items, status, error } = useSelector((state) => state.produtos);

  // useEffect dispara a busca de produtos quando o componente é montado.
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading")
    return <p className="status-message">Carregando produtos...</p>;
  if (status === "failed")
    return <p className="status-message">Erro ao buscar produtos: {error}</p>;

  return (
    <div className="product-grid">
      {items.map((produto) => (
        <ProductItem key={produto.id} produto={produto} />
      ))}
    </div>
  );
}

export default ProductList;

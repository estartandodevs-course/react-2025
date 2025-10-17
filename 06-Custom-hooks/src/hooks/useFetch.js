import { useState, useEffect } from "react";
import axios from "axios";

// =================================================================================
// TÓPICO: CRIANDO UM CUSTOM HOOK
// =================================================================================
// 1. Um custom hook é uma função que começa com "use".
// 2. Ele pode usar outros hooks (useState, useEffect, etc.).
// 3. Ele encapsula uma lógica de estado que queremos reutilizar.

function useFetch(url) {
  // 4. Copiamos toda a lógica de estado que estava repetida nos componentes.
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 5. O useEffect também é movido para cá. Ele agora depende da 'url'
  //    que recebemos como argumento. Se a URL mudar, o hook fará uma nova busca.
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError("Ocorreu um erro ao buscar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // A dependência agora é a URL

  // 6. O hook retorna os estados para que o componente que o usa possa reagir a eles.
  //    Retornamos um objeto para que o componente possa desestruturar apenas o que precisar.
  return { data, loading, error };
}

export default useFetch;

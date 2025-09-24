import "./App.css";
import CardUsuario from "./components/Usuario/CardUsuario";
import { usuarios } from "./dados";
import Header from "./components/Header/Header";

function App() {
  return (
    <main className="app">
      <Header />

      <div className="cards-container">
        {/* <CardUsuario
          nome="Ana Silva"
          cargo="Desenvolvedora Frontend"
          urlImagem="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpx_ptSCe076V6D73fR4jiRbO8DwjMiajmog&s"
        />

        <CardUsuario
          nome="Bruno Costa"
          cargo="Designer UI/UX"
          urlImagem="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpx_ptSCe076V6D73fR4jiRbO8DwjMiajmog&s"
        /> */}
        {/* Usando .map() para renderizar a lista */}
        {usuarios.map((usuario) => (
          <CardUsuario
            key={usuario.id} // A prop 'key' é ESSENCIAL para o React otimizar a lista
            nome={usuario.nome}
            cargo={usuario.cargo}
            urlImagem={usuario.urlImagem}
            online={usuario.online}
          />
        ))}
      </div>
    </main>
  );
}
export default App;

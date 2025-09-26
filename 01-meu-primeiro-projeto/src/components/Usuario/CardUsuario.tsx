interface IUsuario {
  nome: string;
  urlImagem: string;
  cargo: string;
  online: boolean;
}

function CardUsuario(props: IUsuario) {
  return (
    <div className="card">
      <img src={props.urlImagem} alt={`Foto de ${props.nome}`} />
      <h2>{props.nome}</h2>
      <p>{props.cargo}</p>
      {/* Renderização Condicional com Operador Ternário */}
      {props.online ? (
        <p className="status online">Online</p>
      ) : (
        <p className="status offline">Offline</p>
      )}
    </div>
  );
}

export default CardUsuario;

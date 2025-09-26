import { useState } from "react";
import "./App.css";
import Contador from "./components/Contador";
import { ToastContainer, toast } from "react-toastify";

function App() {
  // =================================================================================
  // TÓPICO: HOOKS (useState)
  // =================================================================================
  // Hooks são funções especiais que nos permitem "enganchar" funcionalidades do React,
  // como o gerenciamento de estado, em componentes de função.
  //
  // REGRAS DOS HOOKS:
  // 1. Sempre começam com a palavra "use" (ex: useState, useEffect).
  // 2. Só podem ser chamados no nível mais alto (top-level) de um componente de função.
  //    (NUNCA dentro de ifs, loops ou funções aninhadas).

  // Aqui, usamos um único objeto de estado para guardar todos os dados do formulário.
  // Isso mantém o código organizado.
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  // Estado para armazenar as mensagens de erro de validação.
  const [erros, setErros] = useState({});

  // Estado para controlar a exibição do tooltip de ajuda da senha.
  const [mostrarTooltipSenha, setmostrarTooltipSenha] = useState(false);

  // Estado para mostrar a mensagem de sucesso após o envio.
  const [isSubmitted, setIsSubmitted] = useState(false);

  // =================================================================================
  // TÓPICO: EVENT HANDLERS (Manipuladores de Eventos)
  // =================================================================================

  // --- onChange ---
  // Esta função é chamada TODA VEZ que o usuário digita algo nos inputs.
  // É a base para criar "componentes controlados", onde o estado do React
  // é a única fonte da verdade para o valor do input.
  const handleChange = (event) => {
    const { name, value } = event.target; // Desestruturamos 'name' e 'value' do input
    // Atualizamos o estado. Usamos o spread operator (...) para manter os
    // outros valores do objeto e atualizamos apenas a chave correspondente ao 'name' do input.
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // --- onBlur ---
  // Esta função é chamada quando o usuário clica FORA de um input (o elemento perde o foco).
  // É o momento ideal para validar o campo que ele acabou de preencher.
  const handleBlur = (event) => {
    const { name, value } = event.target;
    validarCampo(name, value);
  };

  // --- onMouseOver / onMouseLeave ---
  // Usados para interatividade da UI. Aqui, mostramos/escondemos uma dica
  // quando o mouse passa por cima do campo de senha.
  const handleMouseOverSenha = () => setmostrarTooltipSenha(true);
  const handleMouseLeaveSenha = () => setmostrarTooltipSenha(false);

  // --- onSubmit (associado ao onClick do botão de submit) ---
  const handleSubmit = (event) => {
    event.preventDefault(); // Impede que o formulário recarregue a página

    // Realiza uma validação final em todos os campos antes de enviar.
    const errosEncontrados = {};
    const chavesForm = Object.keys(formData);

    chavesForm.forEach((fieldName) => {
      const erro = validarCampo(fieldName, formData[fieldName]);
      if (erro) {
        errosEncontrados[fieldName] = erro;
      }
    });

    setErros(errosEncontrados);

    // Se não houver erros (o objeto de erros está vazio), o formulário é válido.
    if (Object.keys(errosEncontrados).length === 0) {
      console.log("Formulário enviado com sucesso!", formData);
      toast("Formulário enviado com sucesso!");
      setIsSubmitted(true);
      // Aqui você enviaria os dados para um servidor (API).
    } else {
      console.log("Formulário contém erros. Não enviado.");
      // toast("Formulário contém erros. Não enviado.");
      toast("Formulário contém erros. Não enviado.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsSubmitted(false);
    }
  };

  // =================================================================================
  // TÓPICO: FORMULÁRIOS - Validando Campos
  // =================================================================================
  const validarCampo = (name, value) => {
    let errorMessage = "";
    switch (name) {
      case "nome":
        if (!value) errorMessage = "O nome é obrigatório.";
        break;
      case "email":
        if (!value) errorMessage = "O e-mail é obrigatório.";
        else if (!/\S+@\S+\.\S+/.test(value))
          errorMessage = "O e-mail é inválido.";
        break;
      case "senha":
        if (!value) errorMessage = "A senha é obrigatória.";
        else if (value.length < 8)
          errorMessage = "A senha deve ter no mínimo 8 caracteres.";
        break;
      default:
        break;
    }

    // Atualiza o estado de erros para o campo específico
    setErros((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    return errorMessage; // Retorna a mensagem para a validação final no handleSubmit
  };

  // O JSX que será renderizado na tela

  return (
    <div className="form-container">
      <h1>Formulário de Inscrição</h1>

      {isSubmitted ? (
        <p className="success-message">Inscrição realizada com sucesso!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Atenção ⚠️: Passando a função handle para o evento */}
          {/* A função deve ser passada (handleBlur) e nunca invocada (handleBlur()). */}
          {/* Isso garante que a função só será executada QUANDO o evento ocorrer. */}
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
            />
            {erros.nome && <p className="error-message">{erros.nome}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              id="email"
              name="email"
              value={formData.email}
            />
            {erros.email && <p className="error-message">{erros.email}</p>}
          </div>

          <div
            className="form-group"
            onMouseOver={handleMouseOverSenha}
            onMouseLeave={handleMouseLeaveSenha}
          >
            <label htmlFor="senha">Senha:</label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
            />

            {erros.senha && <p className="error-message">{erros.senha}</p>}
            {mostrarTooltipSenha && (
              <p className="help-tooltip">
                A senha deve ter no mínimo 8 caracteres.
              </p>
            )}
          </div>

          {/* Observação 🔎: Como passar a função de evento */}
          {/* Para um botão simples de clique (onClick), passamos a referência da função: */}
          {/* <button type="button" onClick={algumaFuncao}>Ação</button> */}
          {/* */}
          {/* Se precisarmos passar um argumento, usamos uma arrow function: */}
          {/* <button type="button" onClick={() => algumaFuncao('argumento')}>Ação com Arg</button> */}
          {/* Assim, garantimos que uma FUNÇÃO está sendo passada ao onClick, e não o RETORNO de uma função. */}
          <button type="submit">Inscrever-se</button>
        </form>
      )}
      <Contador />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;

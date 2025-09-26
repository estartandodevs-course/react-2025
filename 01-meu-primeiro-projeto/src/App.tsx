import { useState } from "react";
import "./App.css";

// =================================================================================
// TÓPICO: Tipagem com Interfaces
// =================================================================================
// Com TypeScript, definimos a "forma" (shape) dos nossos objetos.
// Isso garante que nunca tentaremos acessar uma propriedade que não existe.

// Define a estrutura dos dados do nosso formulário.
interface FormData {
  nome: string;
  email: string;
  senha: string;
}

// Define a estrutura do nosso objeto de erros.
// As propriedades são opcionais (?) porque um campo pode não ter um erro.
interface FormErrors {
  nome?: string;
  email?: string;
  senha?: string;
}

function App() {
  // =================================================================================
  // TÓPICO: HOOKS (useState com Tipagem)
  // =================================================================================
  // Ao usar useState, podemos passar o tipo de dado que ele vai gerenciar
  // entre colchetes angulares (<>). Isso é chamado de "Generic".

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    senha: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPasswordHelp, setShowPasswordHelp] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // =================================================================================
  // TÓPICO: EVENT HANDLERS com Tipos do React
  // =================================================================================
  // O React exporta tipos para todos os seus eventos. Ao tipar o parâmetro 'event',
  // ganhamos segurança e autocompletar para propriedades como 'event.target'.

  // --- onChange ---
  // O evento de mudança em um input HTML tem o tipo React.ChangeEvent<HTMLInputElement>
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      // Graças à tipagem, o TS sabe que 'name' só pode ser "nome", "email" ou "senha".
      [name]: value,
    }));
  };

  // --- onBlur ---
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name as keyof FormData, value);
  };

  // --- onMouseOver / onMouseLeave ---
  // Não precisamos do objeto de evento aqui, então não precisamos tipá-lo.
  const handleMouseOverPassword = () => setShowPasswordHelp(true);
  const handleMouseLeavePassword = () => setShowPasswordHelp(false);

  // --- onSubmit ---
  // O evento de submissão de um formulário tem o tipo React.FormEvent<HTMLFormElement>
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const finalErrors: FormErrors = {};
    let formIsValid = true;

    // Validação final antes do envio
    (Object.keys(formData) as Array<keyof FormData>).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        finalErrors[fieldName] = error;
        formIsValid = false;
      }
    });

    setErrors(finalErrors);

    if (formIsValid) {
      console.log("Formulário enviado com sucesso!", formData);
      setIsSubmitted(true);
    } else {
      console.log("Formulário contém erros. Não enviado.");
      setIsSubmitted(false);
    }
  };

  // =================================================================================
  // TÓPICO: FORMULÁRIOS - Validando com Tipos
  // =================================================================================
  // Tipar os parâmetros da função de validação garante que só vamos tentar
  // validar campos que realmente existem no nosso formulário.
  const validateField = (name: keyof FormData, value: string): string => {
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

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    return errorMessage;
  };

  return (
    <div className="form-container">
      <h1>Formulário de Inscrição (TypeScript)</h1>

      {isSubmitted ? (
        <p className="success-message">Inscrição realizada com sucesso!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.nome && <p className="error-message">{errors.nome}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div
            className="form-group"
            onMouseOver={handleMouseOverPassword}
            onMouseLeave={handleMouseLeavePassword}
          >
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.senha && <p className="error-message">{errors.senha}</p>}
            {showPasswordHelp && (
              <p className="help-tooltip">
                A senha deve ter no mínimo 8 caracteres.
              </p>
            )}
          </div>

          <button type="submit">Inscrever-se</button>
        </form>
      )}
    </div>
  );
}

export default App;

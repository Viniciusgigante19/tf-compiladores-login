import React, { FC } from "react";
import "./styles.css";

interface LoginProps {
  onLogin: () => void;
}

const Login: FC<LoginProps> = ({ onLogin }) => {

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const senha = formData.get("password"); 


    const body = new URLSearchParams();
    body.append("email", email as string);
    body.append("password", senha as string);

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        onLogin();
      } else {
        const err = await res.json();
        console.error("Erro ao logar:", err.error);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-fields">
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu email"
              />
            </div>

            <div>
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          <div className="login-actions">
            <button type="submit" className="login-button">
              Entrar
            </button>
          </div>

          <div className="register-link">
            <button type="button">Não tem conta? Criar agora</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

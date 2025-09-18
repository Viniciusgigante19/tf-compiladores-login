import React, { FC, useEffect, useState } from "react";
import "./styles.css";

interface User {
  id: number;
  name: string;
  email: string;
}

interface HomeProps {
  onLogout: () => void;
}

interface ApiResponse {
  rows: User[];
  count: number;
  limit: number;
  next: number | null;
}

const Home: FC<HomeProps> = ({ onLogout }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [offset, setOffset] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  const fetchUsers = async (currentOffset = 0) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/api/users?offset=${currentOffset}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Erro ao buscar usuários");

      const data: ApiResponse = await res.json();
      setUsers(data.rows);
      setOffset(currentOffset);
      setNext(data.next);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleNextPage = () => {
    if (next !== null) fetchUsers(next);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-box">
          <h2 className="login-title">Lista de Usuários</h2>

          {loading ? (
            <p className="empty-message">Carregando...</p>
          ) : users.length === 0 ? (
            <p className="empty-message">Nenhum usuário encontrado.</p>
          ) : (
            <div className="user-list">
              {users.map((user) => (
                <div key={user.id} className="user-card">
                  <p className="user-name">{user.name}</p>
                  <p className="user-email">{user.email}</p>
                </div>
              ))}
            </div>
          )}

          {next !== null && (
            <button className="logout-button" onClick={handleNextPage}>
              Próxima Página
            </button>
          )}

          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem("token");
              onLogout();
            }}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

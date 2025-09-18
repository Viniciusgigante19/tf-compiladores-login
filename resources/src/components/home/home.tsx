import React, { FC, useEffect, useState, ChangeEvent } from "react";
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [loggedUserId, setLoggedUserId] = useState<number | null>(null);

  const limit = 10;

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch {
      return null;
    }
  };

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
    const id = getUserIdFromToken();
    if (id) setLoggedUserId(id);
    fetchUsers();
  }, []);

  const handleNextPage = () => {
    if (next !== null) fetchUsers(next);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await fetch("http://localhost:3000/api/users/image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Erro no upload");

      const data = await res.json();
      setUploadMessage("Upload concluído: " + data.imagem);
    } catch (err) {
      console.error(err);
      setUploadMessage("Erro ao enviar arquivo.");
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="upload-box">
          <h3 className="upload-title">Upload de Imagem</h3>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && (
            <div className="preview-wrap">
  <img
    src={previewUrl}
    alt="Pré-visualização"
    className="preview-img"
    style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
  />
</div>

          )}
          <button
            className="upload-button"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Enviar
          </button>
          {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
        </div>

        <div className="user-list-box">
          <h2 className="login-title">Lista de Usuários</h2>
          {loading ? (
            <p className="empty-message">Carregando...</p>
          ) : users.length === 0 ? (
            <p className="empty-message">Nenhum usuário encontrado.</p>
          ) : (
            <div className="user-list">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="user-card"
                  style={{
                    background: user.id === loggedUserId ? "#7e22ce" : undefined,
                    color: user.id === loggedUserId ? "#fff" : undefined,
                  }}
                >
                  <p className="user-name">{user.name}</p>
                  <p className="user-email">{user.email}</p>
                </div>
              ))}
            </div>
          )}
          {next !== null && (
            <button className="next-button" onClick={handleNextPage}>
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

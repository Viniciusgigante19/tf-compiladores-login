import React, { FC, useEffect, useState, ChangeEvent } from "react";
import "./styles.css";

interface User {
  id: number;
  name: string;
  email: string;
  photo?: string | null;
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
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [offset, setOffset] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>("");

  let pathImage: string | null | undefined = null;

  const limit = 10;

  // Pega o ID do usuário do token
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
  // Busca usuários paginados
  const fetchUsers = async (currentOffset = 0) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/api/users?offset=${currentOffset}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
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

  // Busca dados do usuário logado
  const fetchLoggedUser = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) throw new Error("Erro ao buscar usuário logado");

      const data: User = await res.json();
      setLoggedUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Busca imagem do usuário logado
  const fetchLoggedUserImage = async () => {
    
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const id = getUserIdFromToken();
    console.log(id)
    if (!id) return;

    try{

      const res = await fetch(`http://localhost:3000/api/users/image/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) pathImage='/public/images/default_icon.jpg';

       const data = await res.json();
       console.log("Resposta da API:", data);

       pathImage = data.path || null;
      console.log(pathImage)
    }catch(error){}

  }
fetchLoggedUserImage();
if(pathImage){
      console.log("Imagem carregada:"+pathImage)
    }
  useEffect(() => {
    const id = getUserIdFromToken();
    if (id) {
    fetchLoggedUser(id)};
    fetchUsers();
  }, []);

  const handleNextPage = () => {
    if (next !== null) fetchUsers(next);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !loggedUser) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await fetch(`http://localhost:3000/api/users/image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Erro no upload");

      const data = await res.json();
      setUploadMessage("Upload concluído: " + data.imagem);

      // Atualiza o usuário logado com a nova foto
      fetchLoggedUser(loggedUser.id);
      setPreviewUrl(null); // limpa preview
    } catch (err) {
      console.error(err);
      setUploadMessage("Erro ao enviar arquivo.");
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">

        {/* Upload box */}
        <div className="upload-box">
          <h3>Upload de Imagem</h3>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Pré-visualização"
              style={{ width: 150, height: 150, objectFit: "cover", borderRadius: 8 }}
            />
          )}
          <button onClick={handleUpload} disabled={!selectedFile}>
            Enviar
          </button>
          {uploadMessage && <p>{uploadMessage}</p>}
        </div>

        {/* Lista de usuários */}
        <div className="user-list-box">
          <h2>Lista de Usuários</h2>
          {loading ? <p>Carregando...</p> : (
            <div className="user-list">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="user-card"
                  style={{
                    background: user.id === loggedUser?.id ? "#7e22ce" : undefined,
                    color: user.id === loggedUser?.id ? "#fff" : undefined,
                    display: "flex",
                    alignItems: "center",
                    gap: 10
                  }}
                >
                  {/* Imagem do usuário logado */}
                  {user.id === loggedUser?.id && pathImage && (
                    <img
                      src={pathImage}
                      alt="Foto do usuário"
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                  )}
                  
        



                  <div>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {next !== null && (
            <button onClick={handleNextPage}>Próxima Página</button>
          )}
          <button onClick={() => { localStorage.removeItem("token"); onLogout(); }}>
            Sair
          </button>
        </div>

      </div>
    </div>
  );
};

export default Home;

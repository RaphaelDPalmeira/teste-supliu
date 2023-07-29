import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const url = "https://tiao.supliu.com.br/api";
  const apiKey = process.env.REACT_APP_API_KEY;

  const [albumList, setAlbumList] = useState([]);

  const [nomeAlbum, setNomeAlbum] = useState("");
  const [anoAlbum, setAnoAlbum] = useState("");
  const [addIdAlbum, setAddIdAlbum] = useState("");
  const [addNumeroFaixa, setAddNumeroFaixa] = useState("");
  const [nomeFaixa, setNomeFaixa] = useState("");
  const [duracaoFaixa, setDuracaoFaixa] = useState("");
  const [idAlbum, setIdAlbum] = useState("");
  const [idFaixa, setIdFaixa] = useState("");

  const getTrackDurationInMinutes = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;
    return `${minutes}:${seconds}`;
  };

  const getAlbumList = async (search) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: apiKey,
    };

    const params = {
      keyword: search,
      limit: 20,
    };

    try {
      const res = await axios.get(`${url}/album`, {
        headers: headers,
        params: params,
      });
      console.log(res);
      setAlbumList(res.data.data);
    } catch (err) {
      alert(err);
    }
  };

  const addAlbum = async (nome, ano) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: apiKey,
    };

    const options = {
      name: nome,
      year: ano,
    };

    try {
      const res = await axios.post(`${url}/album`, options, {
        headers: headers,
      });
      console.log(res);
    } catch (err) {
      alert(err);
    }
  };

  const addFaixa = async (album_id, number, title, duration) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: apiKey,
    };

    const options = {
      album_id: album_id,
      number: number,
      title: title,
      duration: duration,
    };

    try {
      const res = await axios.post(`${url}/track`, options, {
        headers: headers,
      });
      console.log(res);
    } catch (err) {
      alert(err);
    }
  };

  const removerFaixa = async (idFaixa) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: apiKey,
    };

    try {
      const res = await axios.delete(`${url}/track/${idFaixa}`, {
        headers: headers,
      });
      console.log(res);
    } catch (err) {
      alert(err);
    }
  };

  const removerAlbum = async (idAlbum) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: apiKey,
    };

    try {
      const res = await axios.delete(`${url}/album/${idAlbum}`, {
        headers: headers,
      });
      console.log(res);
    } catch (err) {
      alert(err);
    }
  };

  const handleAdicionarAlbum = (e) => {
    e.preventDefault();
    addAlbum(nomeAlbum, anoAlbum);

  };

  const handleAdicionarFaixa = (e) => {
    e.preventDefault();
    addFaixa(addIdAlbum, addNumeroFaixa, nomeFaixa, duracaoFaixa);
  };

  const handleRemoverFaixa = (e) => {
    e.preventDefault();
    removerFaixa(idFaixa);
  };

  const handleRemoverAlbum = (e) => {
    e.preventDefault();
    removerAlbum(idAlbum);
  };

  return (
    <section className="home">
      <div className="home-wrapper">
        <div className="home-header">
          <img src={"./images/logo.png"} className="home-logo" alt="logo" />
          <h1>Discografia</h1>
        </div>
        <div className="home-list">
          <input
            debounce={1000}
            type="text"
            onChange={(e) => getAlbumList(e.target.value)}
          />
          <div className="album-list">
            {albumList.length === 0 && (
              <div className="album-item">
                <h3>Nenhum álbum encontrado</h3>
              </div>
            )}
            {albumList.map((album) => (
              <div className="album-item" key={album.id}>
                {/* O id foi adicionado aqui para que possamos adicionar e remover facilmente na API a partir do id gerado*/}
                <h3>
                  Album: {album.name}, {album.year} - ID: {album.id}
                </h3>
                <div className="home-table">
                  <div className="home-table-row is-title">
                    <div className="home-table-row_left">
                      <p style={{ marginRight: "20px" }}>N°</p>
                      <p>Faixa</p>
                    </div>
                    <div className="home-table-row_right">
                      <p>Duração</p>
                    </div>
                  </div>
                  {album.tracks.map((track) => (
                    <div key={track.id} className="home-table-row">
                      <div className="home-table-row_left">
                        <p style={{ marginRight: "20px" }}>{track.number}</p>
                        {/* O id foi adicionado aqui para que possamos adicionar e remover facilmente na API a partir do id gerado*/}
                        <p>
                          {track.title} - ID: {track.id}
                        </p>
                      </div>
                      <div className="home-table-row_right">
                        <p>{getTrackDurationInMinutes(track.duration)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="add-wrapper">
        <div className="home-header">
          <h2>Opções</h2>
        </div>
        <div className="home-list">
          <div className="option-block">
            <form onSubmit={handleAdicionarAlbum}>
              <div className="form-group">
                <label htmlFor="album">Nome do Album</label>
                <input
                  type="text"
                  id="nomeAlbum"
                  onChange={(e) => setNomeAlbum(e.target.value)}
                  value={nomeAlbum}
                />
              </div>
              <div className="form-group">
                <label htmlFor="album">Ano do Album</label>
                <input
                  type="number"
                  id="anoAlbum"
                  onChange={(e) => setAnoAlbum(e.target.value)}
                  value={anoAlbum}
                />
              </div>
              <button type="submit">Adicionar Album</button>
            </form>
          </div>
          <div className="option-block">
            <form onSubmit={handleAdicionarFaixa}>
              <div className="form-group">
                <label htmlFor="album">ID do Album</label>
                <input
                  type="number"
                  id="albumId"
                  value={addIdAlbum}
                  onChange={(e) => setAddIdAlbum(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="album">Numero da Faixa</label>
                <input
                  type="number"
                  id="duracaoFaixa"
                  value={addNumeroFaixa}
                  onChange={(e) => setAddNumeroFaixa(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="album">Nome da Faixa</label>
                <input
                  type="text"
                  id="nomeFaixa"
                  value={nomeFaixa}
                  onChange={(e) => setNomeFaixa(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="album">Duração da Faixa</label>
                <input
                  type="number"
                  id="duracaoFaixa"
                  value={duracaoFaixa}
                  onChange={(e) => setDuracaoFaixa(e.target.value)}
                />
              </div>
              <button type="submit">Adicionar Faixa</button>
            </form>
          </div>
          <div className="option-block">
            <form onSubmit={handleRemoverFaixa}>
              <div className="form-group">
                <label htmlFor="album">ID da Faixa</label>
                <input
                  type="number"
                  id="idFaixa"
                  value={idFaixa}
                  onChange={(e) => setIdFaixa(e.target.value)}
                />
              </div>
              <button type="submit">Deletar Faixa</button>
            </form>
          </div>
          <div className="option-block">
            <form onSubmit={handleRemoverAlbum}>
              <div className="form-group">
                <label htmlFor="album">ID do Album</label>
                <input
                  type="number"
                  id="deletarAlbum"
                  value={idAlbum}
                  onChange={(e) => setIdAlbum(e.target.value)}
                />
              </div>
              <button type="submit">Deletar Album</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;

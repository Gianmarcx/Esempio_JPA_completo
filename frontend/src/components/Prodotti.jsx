import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Prodotti() {
  const [prodotti, setProdotti] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stati per form
  const [titolo, setTitolo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [prezzo, setPrezzo] = useState("");
  const [prezzoScontato, setPrezzoScontato] = useState("");
  const [quantita, setQuantita] = useState("");
  const [visibile, setVisibile] = useState(true);

  // Per modifica
  const [editId, setEditId] = useState(null);

  // Carica prodotti
  const caricaProdotti = async () => {
    const res = await axios.get("http://localhost:8081/api/prodotti");
    setProdotti(res.data);
    setLoading(false);
  };

  useEffect(() => {
    caricaProdotti();
  }, []);

  // CREA PRODOTTO
  const creaProdotto = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8081/api/prodotti", {
      titolo,
      descrizione,
      prezzo: parseFloat(prezzo),
      prezzoScontato: prezzoScontato ? parseFloat(prezzoScontato) : null,
      quantita: parseInt(quantita),
      visibile: Boolean(visibile),
    });

    caricaProdotti();
    resetForm();
    window.bootstrap.Modal.getInstance(
      document.getElementById("modalAggiungi")
    ).hide();
  };

  // PREPARA MODIFICA
  const apriModifica = (prodotto) => {
    setEditId(prodotto.id);
    setTitolo(prodotto.titolo);
    setDescrizione(prodotto.descrizione);
    setPrezzo(prodotto.prezzo);
    setPrezzoScontato(prodotto.prezzoScontato || "");
    setQuantita(prodotto.quantita);
    setVisibile(prodotto.visibile);

    new window.bootstrap.Modal(
      document.getElementById("modalModifica")
    ).show();
  };

  // SALVA MODIFICA
  const salvaModifica = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:8081/api/prodotti/${editId}`, {
      titolo,
      descrizione,
      prezzo: parseFloat(prezzo),
      prezzoScontato: prezzoScontato ? parseFloat(prezzoScontato) : null,
      quantita: parseInt(quantita),
      visibile: Boolean(visibile),
    });

    caricaProdotti();
    resetForm();
    window.bootstrap.Modal.getInstance(
      document.getElementById("modalModifica")
    ).hide();
  };

  // ELIMINA
  const eliminaProdotto = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo prodotto?")) return;

    await axios.delete(`http://localhost:8081/api/prodotti/${id}`);
    caricaProdotti();
  };

  // RESET FORM
  const resetForm = () => {
    setTitolo("");
    setDescrizione("");
    setPrezzo("");
    setPrezzoScontato("");
    setQuantita("");
    setVisibile(true);
    setEditId(null);
  };

  if (loading) return <h3 className="text-center mt-5">Caricamento...</h3>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Gestione Prodotti</h2>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalAggiungi"
        >
          + Aggiungi Prodotto
        </button>
      </div>

      {/* TABELLA */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Titolo</th>
                <th>Prezzo</th>
                <th>Prezzo Scontato</th>
                <th>Quantità</th>
                <th>Visibile</th>
                <th className="text-end">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {prodotti.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.titolo}</td>
                  <td>{p.prezzo} €</td>
                  <td>{p.prezzoScontato ? p.prezzoScontato + ' €' : '-'}</td>
                  <td>{p.quantita}</td>
                  <td>{p.visibile ? "Sì" : "No"}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => apriModifica(p)}
                    >
                      Modifica
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminaProdotto(p.id)}
                    >
                      Elimina
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALE AGGIUNGI */}
      <div className="modal fade" id="modalAggiungi" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={creaProdotto}>
              <div className="modal-header">
                <h5 className="modal-title">Aggiungi Prodotto</h5>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Titolo"
                  value={titolo}
                  onChange={(e) => setTitolo(e.target.value)}
                  required
                />

                <textarea
                  className="form-control mb-2"
                  placeholder="Descrizione"
                  value={descrizione}
                  onChange={(e) => setDescrizione(e.target.value)}
                />

                <input
                  className="form-control mb-2"
                  type="number"
                  placeholder="Prezzo"
                  value={prezzo}
                  onChange={(e) => setPrezzo(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-2"
                  type="number"
                  placeholder="Prezzo Scontato (opzionale)"
                  value={prezzoScontato}
                  onChange={(e) => setPrezzoScontato(e.target.value)}
                />

                <input
                  className="form-control mb-2"
                  type="number"
                  placeholder="Quantità"
                  value={quantita}
                  onChange={(e) => setQuantita(e.target.value)}
                  required
                />

                <select
                  className="form-control"
                  value={visibile ? "true" : "false"}
                  onChange={(e) => setVisibile(e.target.value === "true")}
                >
                  <option value="true">Visibile</option>
                  <option value="false">Nascosto</option>
                </select>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Annulla
                </button>
                <button className="btn btn-primary" type="submit">
                  Salva
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* MODALE MODIFICA */}
      <div className="modal fade" id="modalModifica" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={salvaModifica}>
              <div className="modal-header">
                <h5 className="modal-title">Modifica Prodotto</h5>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Titolo"
                  value={titolo}
                  onChange={(e) => setTitolo(e.target.value)}
                  required
                />

                <textarea
                  className="form-control mb-2"
                  placeholder="Descrizione"
                  value={descrizione}
                  onChange={(e) => setDescrizione(e.target.value)}
                />

                <input
                  className="form-control mb-2"
                  type="number"
                  placeholder="Prezzo"
                  value={prezzo}
                  onChange={(e) => setPrezzo(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-2"
                  type="number"
                  placeholder="Prezzo Scontato (opzionale)"
                  value={prezzoScontato}
                  onChange={(e) => setPrezzoScontato(e.target.value)}
                />

                <input
                  className="form-control mb-2"
                  type="number"
                  placeholder="Quantità"
                  value={quantita}
                  onChange={(e) => setQuantita(e.target.value)}
                  required
                />

                <select
                  className="form-control"
                  value={visibile ? "true" : "false"}
                  onChange={(e) => setVisibile(e.target.value === "true")}
                >
                  <option value="true">Visibile</option>
                  <option value="false">Nascosto</option>
                </select>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Annulla
                </button>
                <button className="btn btn-primary" type="submit">
                  Salva Modifiche
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prodotti;

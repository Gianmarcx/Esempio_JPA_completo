
import axios from "axios";
import { useEffect, useState } from "react";

function Esempi() {
    const [esempi, setEsempi] = useState([]);
    const [esempioForm, setEsempioForm] = useState({
        id:"",
        testo:""
    });
    const [modificaEsempioForm, setModificaEsempioForm] = useState({
        id:"",
        testo:""
    });
    function salvaEsempio(e){
        e.preventDefault();
        console.log(esempioForm);
        axios.post("http://localhost:8081/api/esempio", esempioForm)
        .then((response)=>{
            console.log(response.data);
                setEsempi([...esempi, response.data]);
        })
    }

    function gestisciInput(e) {
        setEsempioForm({
            ...esempioForm,
            [e.target.name]: e.target.value
        })
    }
    function gestisciInputModifica(e) {
        setModificaEsempioForm({
            ...modificaEsempioForm,
            [e.target.name]: e.target.value
        })
    }
    function eliminaEsempio(id){
        axios.delete("http://localhost:8081/api/esempio/"+id)
        .then((response)=>{
            console.log(response.data);
            setEsempi(esempi.filter((esempio)=> esempio.id !== id));
        })
    }
    function modificaEsempio(id){
        setModificaEsempioForm({id: id, testo: modificaEsempioForm.testo});
        console.log(modificaEsempioForm);
        axios.put("http://localhost:8081/api/esempio/"+id, modificaEsempioForm)
        .then((response)=>{
            if(response.data === null){
                alert("Modifica fallita!");
                return;
            }
            console.log(response.data);
            setEsempi(esempi.map((esempio)=> esempio.id === id ? response.data : esempio));
            setModificaEsempioForm({id:"", testo:""});
            alert("Aggiornamento completato!");
        })
    }
    useEffect(
        () => {
            console.log("componente avviato");
            axios
                .get("http://localhost:8081/api/esempio")
                .then((response) => {
                    console.log(response.data);
                    setEsempi(response.data);
                })
        },
        []
    );

    return (<>
            <h1>Questa è la pagina esempi</h1>
            <form className="mb-[20px] p-4 border rounded" onSubmit={salvaEsempio}>
        <div className="mb-[10px]">
          <label>Testo</label>
          <input name="testo" type="text" placeholder="Inserisci il testo..." className="w-full p-2 border rounded" value={esempioForm.testo} onChange={gestisciInput}/>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" >Crea</button>
      </form>

            <div>
                {
                    esempi.map((esempio,index)=> {
                        return (
                            <><div key={esempio.id} className="mb-[20px] border rounded-md p-4">
                                <p className="font-medium">Testo : {esempio.testo}</p>
                                
                            <div className="space-x-3 mt-[15px]">
                                    <button className="bg-red-500 text-white px-2 py-1 rounded mt-2" onClick={() => eliminaEsempio(esempio.id)}>Elimina</button>

                                        {modificaEsempioForm.id === esempio.id && (
                                          <div className="mt-4 p-3 border rounded bg-gray-50">
                                            <input 
                                            type="hidden" 
                                            value={esempio.id} 
                                            />
                                            <input 
                                            type="text" 
                                            name="testo"
                                            placeholder="Modifica testo..." 
                                            value={modificaEsempioForm.testo} 
                                            onChange={gestisciInputModifica}
                                            className="w-full p-2 border rounded mb-2"
                                            />
                                            <button 
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            onClick={() => {
                                              modificaEsempio(esempio.id);
                                            }}
                                            >
                                            Salva
                                            </button>
                                          </div>
                                        )}
                                        <button 
                                          className="bg-blue-500 text-white px-2 py-1 rounded mt-2 ml-2"
                                          onClick={() => setModificaEsempioForm({id: esempio.id, testo: esempio.testo})}
                                        >
                                          Modifica
                                        </button></div>
                                </div></>
                        )
                    })
                }
            </div>
</>
    )
}

export default Esempi;
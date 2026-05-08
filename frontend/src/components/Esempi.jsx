
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
        <button  type="button" class="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-full" >Crea</button>
      </form>

            <div>
                {
                    esempi.map((esempio,index)=> {
                        return (
                            <><div key={esempio.id} className="mb-[20px] border rounded-md p-4">
                                <p className="font-medium">Testo : {esempio.testo}</p>
                                
                            <div className="space-x-3 mt-[15px]">
                                    <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-full" onClick={() => eliminaEsempio(esempio.id)}>Elimina</button>

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
                                            type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-full"
                                            onClick={() => {
                                              modificaEsempio(esempio.id);
                                            }}
                                            >
                                            Salva
                                            </button>
                                          </div>
                                        )}
                                        <button 
                                          type="button" class="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-full"
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
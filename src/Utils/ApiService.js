const ApiServices = {

    ListaAutores: () => {
        return fetch('http://localhost:8000/api/autor').then(res => ApiServices.TrataErros(res)).then(res => res.json());
    },

    CriaAutor: autor => {
        return fetch('http://localhost:8000/api/autor', { method: 'POST', headers: { 'content-type': 'application/json' }, body: autor }).then(res => ApiServices.TrataErros(res)).then(res => res.json());
    },

    ListaNomes: () => {
        return fetch('http://localhost:8000/api/autor/nome').then(res => ApiServices.TrataErros(res)).then(res => res.json());
    },

    ListaLivros: () => {
        return fetch('http://localhost:8000/api/autor/livro').then(res => ApiServices.TrataErros(res)).then(res => res.json());
    },

    RemoveAutor: id => {
        return fetch(`http://localhost:8000/api/autor/${id}`, { method: 'DELETE', headers: { 'content-type': 'application/json' }}).then(res => ApiServices.TrataErros(res)).then(res => res.json());
    },

    TrataErros: res => {
        if(!res.ok){
            throw new Error(res.responseText);
        } else {
            return res;
        }
    }
}

export default ApiServices;
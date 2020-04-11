const urlBase = 'http://localhost:8000/api/autor';

const consomeApi = (parametro = '', method = 'GET', body) => {
    return fetch(urlBase + parametro, {
        method,
        headers: { 'content-type': 'application/json' },
        body
    })
        .then(res => ApiServices.TrataErros(res))
        .then(res => res.json());
}

const ApiServices = {

    ListaAutores: () => consomeApi(),

    CriaAutor: autor => consomeApi('', 'Post', autor),

    ListaNomes: () => consomeApi('/nome'),

    ListaLivros: () => consomeApi('/livro'),

    RemoveAutor: id => consomeApi('/'+id, 'DELETE'),

    TrataErros: res => {
        if(!res.ok){
            throw new Error(res.responseText);
        } else {
            return res;
        }
    }
}

export default ApiServices;
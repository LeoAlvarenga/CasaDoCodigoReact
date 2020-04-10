import React, { Fragment, Component } from 'react';
import Header from '../../Components/Header/Header';
import DataTable from '../../Components/DataTable/DataTable';
import ApiServices from '../../Utils/ApiService';
import PopUp from '../../Utils/PopUp';

class Autores extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nomes: [],
            titulo: 'Autores'
        };
    }

    componentDidMount() {
        ApiServices.ListaNomes()
        .then(res => {
            if(res.message === 'success'){
            PopUp.exibeMensagem('success', 'Autores listados com sucesso')
            this.setState({nomes: [...this.state.nomes, ...res.data]})
            } 
        })
        .catch(err => PopUp.exibeMensagem('error', 'Falha na comunicação com a API ao listar os autores'));
    }


    render() {
        return(

        <Fragment>
            <Header></Header>
            <div className='container'>
                    <h1>Página de Autores</h1>
                    <DataTable dados={this.state.nomes} titulo={this.state.titulo} colunas={['nome']}/>
                </div>
        </Fragment>
        )
    }
}

export default Autores;
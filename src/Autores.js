import React, { Fragment, Component } from 'react';
import Header from './Header';
import DataTable from './DataTable';
import ApiServices from './ApiService';

class Autores extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nomes: [],
            titulo: 'Autores'
        };
    }

    componentDidMount() {
        ApiServices.ListaAutores().then(res => {
            this.setState({
                nomes: [...this.state.nomes, ...res.data]
            });
        });
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
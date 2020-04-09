import React, { Component, Fragment } from 'react';
import Header from './Header';
import DataTable from './DataTable';
import ApiServices from './ApiService';


class Livros extends Component {
    constructor(props) {
        super(props);

        this.state = {
            livros: [],
              titulo: 'Livros'
        };
    }

    componentDidMount() {
        ApiServices.ListaLivros().then(res => {
            this.setState({
                livros: [...this.state.livros, ...res.data]
            })
        })
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className='container'>
                    <h1>Página de Livros</h1>
                    <DataTable dados={this.state.livros} titulo={this.state.titulo} colunas={['livro']}/>
                </div>
            </Fragment>
        );
    }
}

export default Livros;
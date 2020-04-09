import React, { Fragment, Component } from 'react';
import Header from './Header';
import DataTable from './DataTable';

class Autores extends Component {

    constructor(props) {
        super(props);

        this.state = {
            autores: [
                {
                    nome: 'Paulo',
                    livro: 'React',
                    preco: '1000'
                },
                {
                    nome: 'Daniel',
                    livro: 'Java',
                    preco: '99'
                },
                {
                    nome: 'Marcos',
                    livro: 'Design',
                    preco: '150'
                },
                {
                    nome: 'Bruno',
                    livro: 'DevOps',
                    preco: '100'
                },
                {
                    nome: 'Nico',
                    livro: 'Java',
                    preco: '9999'
                }
            ],
            titulo: 'Autores'
        };
    }


    render() {
        return(

        <Fragment>
            <Header></Header>
            <div className='container'>
                    <h1>Página de Autores</h1>
                    <DataTable dados={this.state.autores} titulo={this.state.titulo} colunas={['nome']}/>
                </div>
        </Fragment>
        )
    }
}

export default Autores;
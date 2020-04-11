import React, { Component, Fragment } from 'react';
import Header from '../../Components/Header/Header';
import Tabela from '../../Components/Tabela/Tabela';
import ApiServices from '../../Utils/ApiService';
import Toast from '../../Components/Toast/Toast';


class Livros extends Component {
    constructor(props) {
        super(props);

        this.state = {
            livros: [],
            open: false,
            severity: '',
            toastMessage: ''
        };
    }

    componentDidMount() {
        ApiServices.ListaLivros()
            .then(res => {
                if (res.message === 'success') {
                    this.setState({
                        open: true,
                        severity: 'success',
                        toastMessage: 'Livros Listados com Sucesso'
                    });
                    this.setState({ livros: [...this.state.livros, ...res.data] });
                }
            })
            .catch(err => {
                this.setState({
                    open: true,
                    severity: 'error',
                    toastMessage: 'Falha na comunicação com a API ao listar os livros'
                });
                console.log(err);
            });

    }

    render() {
        const campos = [{ titulo: 'Livros', dado: 'livro' }]
        return (
            <Fragment>
                <Header />
                <Toast open={this.state.open} severity={this.state.severity} handleClose={() => this.setState({ open: false })}>
                    {this.state.toastMessage}
                </Toast>
                <div className='container'>
                    <h1>Página de Livros</h1>
                    <Tabela dados={this.state.livros} campos={campos} />
                </div>
            </Fragment>
        );
    }
}

export default Livros;
import React, { Fragment, Component } from 'react';
import Header from '../../Components/Header/Header';
import Tabela from '../../Components/Tabela/Tabela';
import ApiServices from '../../Utils/ApiService';
import Toast from '../../Components/Toast/Toast'

class Autores extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nomes: [],
            open: false,
            severity: '',
            toastMessage: ''
        };
    }
    
    componentDidMount() {
        ApiServices.ListaNomes()
        .then(res => {
            if(res.message === 'success'){
                this.setState({
                    open: true,
                    severity: 'success',
                    toastMessage: 'Autores Listados com Sucesso'
                });
                this.setState({nomes: [...this.state.nomes, ...res.data]})
            } 
        })
        .catch(err => {
            console.log(err);
            this.setState({
            open: true,
            severity: 'error',
            toastMessage: 'Falha na Conexão com o Servidor'
        })});
    }
    
    
    render() {
        const campos = [{titulo: 'Autores', dado: 'nome'}]
        console.log(this.state.nomes)
        return(

        <Fragment>
            <Header></Header>
            <Toast open={this.state.open} severity={this.state.severity} handleClose={() => this.setState({ open: false })}>
                {this.state.toastMessage}
            </Toast>
            <div className='container'>
                    <h1>Página de Autores</h1>
                    <Tabela dados={this.state.nomes} campos={campos}/>
                </div>
        </Fragment>
        )
    }
}

export default Autores;
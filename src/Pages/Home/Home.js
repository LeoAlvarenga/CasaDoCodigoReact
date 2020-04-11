import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './Home.css';
import Header from "../../Components/Header/Header";
import Tabela from "../../Components/Tabela/Tabela";
import Form from "../../Components/Formulario/Fomulario";
import ApiServices from '../../Utils/ApiService';
import Toast from '../../Components/Toast/Toast';

class Home extends Component {

  constructor(props) {
    super(props);


    this.state = {
      autores: [],
      open: false,
      severity: '',
      toastMessage: ''
    };
  }


  removeAutor = index => {

    const { autores } = this.state;

    const autoresAtualizados = autores.filter(autor => {
      return autor.id !== index;
    });


    ApiServices.RemoveAutor(index).then(
      res => {
        if (res.message === 'deleted') {
          this.setState({
            autores: [...autoresAtualizados]
          });

          this.setState({
            open: true,
            severity: 'success',
            toastMessage: 'Autor removido com Sucesso'
          });
        }
      }
    ).catch(err => {
      this.setState({
        open: true,
        severity: 'error',
        toastMessage: 'Não foi possível remover o Autor'
      });
      console.log(err);
    });

  }

  escutadorDeSubmit = dados => {

    const autor = {
      nome: dados.nome,
      livro: dados.livro,
      preco: dados.preco
    }

    ApiServices.CriaAutor(JSON.stringify(autor)).then(res => {
      if (res.message === 'success') {

        this.setState({ autores: [...this.state.autores, res.data] })
        this.setState({
          open: true,
          severity: 'success',
          toastMessage: 'Autor adicionado com Sucesso'
        });
      }
    }).catch(err => {
      this.setState({
        open: true,
        severity: 'error',
        toastMessage: 'Não foi possível adicionar o Autor'
      });
      console.log(err);
    });

  }

  componentDidMount() {

    ApiServices.ListaAutores()
      .then(res => {
        if (res.message === 'success') {
          this.setState({ autores: [...this.state.autores, ...res.data] })
        }
      })
      .catch(err => {
        this.setState({
          open: true,
          severity: 'error',
          toastMessage: 'Erro na comunicação com a API ao tentar listar os autores'
        });
        console.log(err);
      });
  }

  render() {

    ApiServices.ListaNomes().then(res => console.log(res.data));

    const campos = [
      { titulo: 'Autores', dado: 'nome' },
      { titulo: 'Livros', dado: 'livro' },
      { titulo: 'Preço', dado: 'preco' },
    ];


    return (
      <Fragment>
        <Header />
        <Toast open={this.state.open} severity={this.state.severity} handleClose={() => this.setState({ open: false })}>
          {this.state.toastMessage}
        </Toast>
        <div className="container mb-10">
          <h1>Casa do Código</h1>
          <Form escutadorDeSubmit={this.escutadorDeSubmit} />
          <Tabela campos={campos} dados={this.state.autores} removeDados={this.removeAutor} />
        </div>
      </Fragment>
    );

  }

}

export default Home;

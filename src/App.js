import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import Header from "./Header";
import Tabela from "./Tabela";
import Form from "./Fomulario";
import PopUp from './PopUp';
import ApiServices from './ApiService';

class App extends Component {

  constructor(props) {
    super(props);


    this.state = {
      autores: []
    };
  }


  removeAutor = index => {

    const { autores } = this.state;

    this.setState(
      {
        autores: autores.filter((autor) => {
          return autor.id !== index;
        }),
      }
    )
    ApiServices.RemoveAutor(index);
    PopUp.exibeMensagem("success", "Autor Removido com Sucesso!");

  }

  escutadorDeSubmit = autor => {

    ApiServices.CriaAutor(JSON.stringify(autor)).then(res => res.data).then(autor => {

      this.setState({ autores: [...this.state.autores, autor] })
      PopUp.exibeMensagem("success", "Autor adicionado com sucesso!");
    });

  }

  componentDidMount() {

    ApiServices.ListaAutores().then(res => {
      this.setState({
        autores: [...this.state.autores, ...res.data]
      });
    });
  }

  render() {

    ApiServices.ListaNomes().then(res => console.log(res.data));


    return (
      <Fragment>
        <Header />
        <div className="container mb-10">
        <h1>Casa do Código</h1>
        <Tabela autores={this.state.autores} removeAutor={this.removeAutor} />
        <Form escutadorDeSubmit={this.escutadorDeSubmit} />
        </div>
      </Fragment>
    );

  }

}

export default App;

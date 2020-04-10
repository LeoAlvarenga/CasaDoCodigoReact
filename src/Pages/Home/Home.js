import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './Home.css';
import Header from "../../Components/Header/Header";
import Tabela from "../../Components/Tabela/Tabela";
import Form from "../../Components/Formulario/Fomulario";
import PopUp from '../../Utils/PopUp';
import ApiServices from '../../Utils/ApiService';

class Home extends Component {

  constructor(props) {
    super(props);


    this.state = {
      autores: []
    };
  }


  removeAutor = index => {

    const { autores } = this.state;

    const autoresAtualizados = autores.filter(autor => {
      return autor.id !== index;
    });

    
    ApiServices.RemoveAutor(index).then(
      res => {
        if(res.message === 'deleted'){
          this.setState({
            autores: [...autoresAtualizados]
          });
          
          PopUp.exibeMensagem("success", "Autor Removido com Sucesso!");
        }
      }
    ).catch(err => {
      PopUp.exibeMensagem("error", "Erro na comunicação com o Servidor")
      console.log(err);
    });

  }

  escutadorDeSubmit = autor => {

    ApiServices.CriaAutor(JSON.stringify(autor)).then(res => {
      if(res.message === 'success'){

        this.setState({ autores: [...this.state.autores, res.data] })
        PopUp.exibeMensagem("success", "Autor adicionado com sucesso!");
      }
    }).catch(err => {
      PopUp.exibeMensagem("error", "Erro na comunicação com o Servidor")
      console.log(err);
    });

  }

  componentDidMount() {

    ApiServices.ListaAutores()
    .then(res => {
      if(res.message === 'success'){
        this.setState({autores: [...this.state.autores, ...res.data]})
      } 
    })
    .catch(err =>{
      PopUp.exibeMensagem('error', "Erro na comunicação com a API ao tentar listar os autores")
      console.log(err);
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

export default Home;

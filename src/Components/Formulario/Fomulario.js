import React, { Component } from 'react'
import FormValidator from '../../Utils/FormValidator';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Toast from '../Toast/Toast'

class Formulario extends Component {

    constructor(props) {
        super(props);

        this.validador = new FormValidator([
            {
                campo: 'nome',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: 'Entre com um Nome'
            },
            {
                campo: 'livro',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: 'Entre com um Livro'
            },
            {
                campo: 'preco',
                metodo: 'isInt',
                args: [{ min: 0, max: 999999 }],
                validoQuando: true,
                mensagem: 'Entre com um Valor Numérico'
            }
        ]);

        this.stateInicial = {
            nome: '',
            livro: '',
            preco: '',
            validacao: this.validador.valido(),
            open: false,
            severity: '',
            toastMessage: ''
        }
        this.state = this.stateInicial;
    }

    escutadorDeInput = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    submit = () => {

        const validacao = this.validador.valida(this.state);

        if (validacao.isValid) {

            this.props.escutadorDeSubmit(this.state);
            this.setState(this.stateInicial);
        } else {
            const { nome, livro, preco } = validacao;
            const campos = [nome, livro, preco];

            const camposInvalidos = campos.filter(elem => elem.isInvalid);
            camposInvalidos.forEach(campo => this.setState({
                open: true,
                severity: 'error',
                toastMessage: campo.message
            }));
        }
    }

    render() {

        const { nome, livro, preco } = this.state;

        return (
            <>
            <Toast open={this.state.open} severity={this.state.severity} handleClose={() => this.setState({ open: false })}>
                {this.state.toastMessage}
            </Toast>
            <form>

                <Grid container spacing={2} alignItems={"center"}>

                    <Grid item>
                        <TextField id="nome" name="nome" label="nome" variant="outlined" value={nome} onChange={this.escutadorDeInput} ></TextField>
                    </Grid>

                    <Grid item>

                        <TextField id="livro" name="livro" label="Livro" value={livro} onChange={this.escutadorDeInput} variant="outlined" ></TextField>

                    </Grid>

                    <Grid item>

                        <TextField id="preco" name="preco" label="Preço" value={preco} onChange={this.escutadorDeInput} variant="outlined" ></TextField>

                    </Grid>

                    <Grid item>
                        <Button variant='contained' color='primary' type="button" onClick={this.submit} >Salvar</Button>
                    </Grid>

                </Grid>

            </form>
            </>
        )
    }
}

export default Formulario;
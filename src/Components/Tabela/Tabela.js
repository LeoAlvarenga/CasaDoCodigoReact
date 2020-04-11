import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button'
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



const CellDeleta = ({removeDados, id}) => {
    if (!removeDados) {
        return null;
    }
        return (
            <TableCell>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        removeDados(id)
                    }
                    } >
                    Remover
                </Button>
            </TableCell>)
}

const TituloDeleta = ({removeDados}) => {
    if (!removeDados) {
        return null;
    }
    return(
        <TableCell>Remover</TableCell>
    )
}

const Tabela = props => {

    const { campos, dados, removeDados } = props;

    console.log('campos: ' + campos)
    console.log('Dados: ' + dados)

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {
                        campos.map(campo =>
                            <TableCell>{campo.titulo}</TableCell>
                        )
                    }
                    <TituloDeleta removeDados={removeDados} />
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    dados.map(dados => (
                        <TableRow key={dados.id}>
                            {
                                campos.map(campo => (
                                    <TableCell>{dados[campo.dado]}</TableCell>
                                ))
                            }
                            <CellDeleta removeDados={removeDados} id={dados.id} />
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}



export default Tabela
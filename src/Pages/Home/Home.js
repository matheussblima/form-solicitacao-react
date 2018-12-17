import React, { Component } from 'react';
import { Container } from 'reactstrap'; 
import { Menu } from '../../components';
import { FormCadastroSolicitacao } from '../../containers';
import styles from './Home.module.css';




class Home extends Component {
    render() {
        return(
            <div>
                 { /* Menu */ }
                <Menu />

                { /* Tela Principal */ }
                <Container className={styles.container}>
                    <h2 className={styles.title}>Cadastro de solicitação de item PV10</h2>
                    <FormCadastroSolicitacao />
                </Container>
            </div>
        );
    }
}

export default Home;